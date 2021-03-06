import {
  SmartContract,
  Address,
  ProxyProvider,
  ContractFunction,
  Transaction,
  TransactionPayload,
  Balance,
  GasLimit,
  IDappProvider,
  WalletProvider,
  HWProvider,
} from "@elrondnetwork/erdjs";
import BigNumber from "bignumber.js";
import { setItem } from "../storage/session";

export default class Crowdfund {
  /* contract: SmartContract;
  proxyProvider: ProxyProvider;
  signerProvider?: IDappProvider; */

  constructor(contractAddress = "", provider, signer, nominatedValue) {
    const address = new Address(contractAddress);
    this.contract = new SmartContract({ address });
    this.proxyProvider = provider;
    this.signerProvider = signer;
    this.nominatedValue = nominatedValue;
  }

  async currentFunds() {
    const func = new ContractFunction("currentFunds");
    const qResponse = await this.contract.runQuery(this.proxyProvider, {
      func,
    });
    qResponse.assertSuccess();

    return new BigNumber(qResponse.firstResult()?.asBigInt.toString() || 0);
  }

  async sendFunds() {
    if (!this.signerProvider) {
      throw new Error(
        "You need a singer to send a transaction, use either WalletProvider or LedgerProvider"
      );
    }

    switch (this.signerProvider.constructor) {
      case WalletProvider:
        return this.sendFundsWalletProvider();
      case HWProvider:
        return this.sendFundsHWProvider();
      default:
        console.warn("invalid signerProvider");
    }

    return true;
  }

  async sendFundsWalletProvider() {
    const func = new ContractFunction("fund");
    let payload = TransactionPayload.contractCall()
      .setFunction(func)
      .build();

    let transaction = new Transaction({
      receiver: this.contract.getAddress(),
      value: new Balance(BigInt(this.nominatedValue)),
      gasLimit: new GasLimit(10000000),
      data: payload,
    });

    // Can use something like this to handle callback redirect
    setItem("transaction_identifier", true, 120);
    // @ts-ignore
    await this.signerProvider.sendTransaction(transaction);

    return true;
  }
  async sendFundsHWProvider() {
    const func = new ContractFunction("fund");
    let payload = TransactionPayload.contractCall()
      .setFunction(func)
      .build();

    let transaction = new Transaction({
      receiver: this.contract.getAddress(),
      value: new Balance(BigInt(3)),
      gasLimit: new GasLimit(10000000),
      data: payload,
    });

    // @ts-ignore
    await this.signerProvider.sendTransaction(transaction);

    return true;
  }
}
