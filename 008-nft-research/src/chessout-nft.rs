#![no_std]

use elrond_wasm::elrond_codec::TopEncode;

elrond_wasm::imports!();
elrond_wasm::derive_imports!();

const NFT_AMOUNT: u32 = 1;
const ROYALTIES_MAX: u32 = 10_000;

#[derive(TypeAbi, TopEncode, TopDecode)]
pub struct PriceTag<M: ManagedTypeApi> {
    pub token: TokenIdentifier<M>,
    pub nonce: u64,
    pub amount: BigUint<M>,
}

#[derive(TypeAbi, TopEncode, TopDecode)]
pub struct ExampleAttributes {
    pub creation_timestamp: u64,
}

#[elrond_wasm::derive::contract]
pub trait ChessoutNft {
    #[init]
    fn init(&self,
            global_price: BigUint) {
        require!(global_price > 0, "Global price must be positive value");
        self.global_price().set(global_price);
    }


    #[only_owner]
    #[payable("EGLD")]
    #[endpoint(issueToken)]
    fn issue_token(
        &self,
        #[payment] issue_cost: BigUint,
        token_name: ManagedBuffer,
        token_ticker: ManagedBuffer,
    ) {
        require!(self.nft_token_id().is_empty(), "Token already issued");

        self
            .send()
            .esdt_system_sc_proxy()
            .issue_non_fungible(
                issue_cost,
                &token_name,
                &token_ticker,
                NonFungibleTokenProperties {
                    can_freeze: true,
                    can_wipe: true,
                    can_pause: true,
                    can_change_owner: false,
                    can_upgrade: false,
                    can_add_special_roles: true,
                },
            )
            .async_call()
            .with_callback(self.callbacks().issue_callback()).call_and_exit();
    }

    #[callback]
    fn issue_callback(&self, #[call_result] result: ManagedAsyncCallResult<TokenIdentifier>) {
        match result {
            ManagedAsyncCallResult::Ok(token_id) => {
                self.nft_token_id().set(&token_id);
            }
            ManagedAsyncCallResult::Err(_) => {
                let caller = self.blockchain().get_owner_address();
                let (returned_tokens, token_id) = self.call_value().payment_token_pair();
                if token_id.is_egld() && returned_tokens > 0 {
                    self.send()
                        .direct(&caller, &token_id, 0, &returned_tokens, &[]);
                }
            }
        }
    }


    #[only_owner]
    #[endpoint(setLocalRoles)]
    fn set_local_roles(&self) {
        require!(!self.nft_token_id().is_empty(), "Token not issued");

        self.send()
            .esdt_system_sc_proxy()
            .set_special_roles(
                &self.blockchain().get_sc_address(),
                &self.nft_token_id().get(),
                [EsdtLocalRole::NftCreate][..].iter().cloned(),
            )
            .async_call()
            .call_and_exit()
    }

    #[allow(clippy::too_many_arguments)]
    #[allow(clippy::redundant_closure)]
    #[only_owner]
    #[endpoint(createNft)]
    fn create_nft(
        &self,
        name: ManagedBuffer,
        royalties: BigUint,
        uri: ManagedBuffer,
        selling_price: BigUint,
        #[var_args] opt_token_used_as_payment: OptionalValue<TokenIdentifier>,
        #[var_args] opt_token_used_as_payment_nonce: OptionalValue<u64>,
    ) {
        let token_used_as_payment = match opt_token_used_as_payment {
            OptionalValue::Some(token) => token,
            OptionalValue::None => TokenIdentifier::egld(),
        };
        require!(
            token_used_as_payment.is_egld() || token_used_as_payment.is_valid_esdt_identifier(),
            "Invalid token_used_as_payment arg, not a valid token ID"
        );

        let token_used_as_payment_nonce = if token_used_as_payment.is_egld() {
            0
        } else {
            match opt_token_used_as_payment_nonce {
                OptionalValue::Some(nonce) => nonce,
                OptionalValue::None => 0,
            }
        };

        let attributes = ExampleAttributes {
            creation_timestamp: self.blockchain().get_block_timestamp(),
        };
        self.create_nft_with_attributes(
            name,
            royalties,
            attributes,
            uri,
            selling_price,
            token_used_as_payment,
            token_used_as_payment_nonce,
        );
    }

    #[allow(clippy::too_many_arguments)]
    fn create_nft_with_attributes<T: TopEncode>(
        &self,
        name: ManagedBuffer,
        royalties: BigUint,
        attributes: T,
        uri: ManagedBuffer,
        selling_price: BigUint,
        token_used_as_payment: TokenIdentifier,
        token_used_as_payment_nonce: u64,
    ) -> u64 {
        require!(!self.nft_token_id().is_empty(), "Token not issued");
        require!(royalties <= ROYALTIES_MAX, "Royalties cannot exceed 100%");

        let nft_token_id = self.nft_token_id().get();

        let mut serialized_attributes = ManagedBuffer::new();
        if let core::result::Result::Err(err) = attributes.top_encode(&mut serialized_attributes) {
            sc_panic!("Attributes encode error: {}", err.message_bytes());
        }

        let attributes_sha256 = self
            .crypto()
            .sha256_legacy_managed::<1000>(&serialized_attributes);
        let attributes_hash = attributes_sha256.as_managed_buffer();
        let uris = ManagedVec::from_single_item(uri);
        let nft_nonce = self.send().esdt_nft_create(
            &nft_token_id,
            &BigUint::from(NFT_AMOUNT),
            &name,
            &royalties,
            attributes_hash,
            &attributes,
            &uris,
        );

        self.price_tag(nft_nonce).set(&PriceTag {
            token: token_used_as_payment,
            nonce: token_used_as_payment_nonce,
            amount: selling_price,
        });

        nft_nonce
    }

    #[payable("*")]
    #[endpoint(buyNft)]
    fn buy_nft(&self, nft_nonce: u64) {
        let payment: EsdtTokenPayment<Self::Api> = self.call_value().payment();

        require!(!self.nft_token_id().is_empty(), "Token not issued");
        require!(
            !self.price_tag(nft_nonce).is_empty(),
            "Invalid nonce or NFT was already sold"
        );
        require!(payment.token_identifier.is_egld(),"Only EGLD");
        let price_tag = self.price_tag(nft_nonce).get();
        require!(
            payment.token_identifier == price_tag.token,
            "Invalid token used as payment"
        );
        require!(
            payment.token_nonce == price_tag.nonce,
            "Invalid nonce for payment token"
        );
        let g_price = self.global_price().get();
        require!(
            payment.amount == g_price,
            "Invalid amount as payment"
        );
        /*require!(
            payment.amount == price_tag.amount,
            "Invalid amount as payment"
        );*/

        self.price_tag(nft_nonce).clear();

        let nft_token_id = self.nft_token_id().get();
        let caller = self.blockchain().get_caller();
        self.send().direct(
            &caller,
            &nft_token_id,
            nft_nonce,
            &BigUint::from(NFT_AMOUNT),
            &[],
        );

        let owner = self.blockchain().get_owner_address();
        self.send().direct(
            &owner,
            &payment.token_identifier,
            payment.token_nonce,
            &payment.amount,
            &[],
        );
    }


    // storage
    #[view(getTokenId)]
    #[storage_mapper("nftTokenId")]
    fn nft_token_id(&self) -> SingleValueMapper<TokenIdentifier>;

    #[storage_mapper("priceTag")]
    fn price_tag(&self, nft_nonce: u64) -> SingleValueMapper<PriceTag<Self::Api>>;

    #[view(getGlobalPrice)]
    #[storage_mapper("globalPrice")]
    fn global_price(&self) -> SingleValueMapper<BigUint>;
}