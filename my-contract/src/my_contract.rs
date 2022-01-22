#![no_std]

elrond_wasm::imports!();

#[elrond_wasm::derive::contract]
pub trait MyContract {

    #[init]
    fn init(&self) {
    }

}