#![no_std]

elrond_wasm::imports!();

#[elrond_wasm::derive::contract]
pub trait MyContract {

    #[init]
    fn init(&self) {
        let _my_address: ManagedAddress = self.blockchain().get_caller();
        self.set_owner(&_my_address);
    }

    #[storage_set("owner")]
    fn set_owner(&self, address: &ManagedAddress);

}