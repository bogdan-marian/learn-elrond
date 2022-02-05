#![no_std]

elrond_wasm::imports!();

mod nft_module;

#[elrond_wasm::derive::contract]
pub trait MyContract :nft_module::NftModule {
    #[init]
    fn init(&self) {
    }

}