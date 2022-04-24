#![no_std]

elrond_wasm::imports!();

#[elrond_wasm::derive::contract]
pub trait ChessoutNft  {
    #[init]
    fn init(&self) {
    }

    // storage
    #[view(getTokenId)]
    #[storage_mapper("nftTokenId")]
    fn nft_token_id(&self) -> SingleValueMapper<TokenIdentifier>;

}