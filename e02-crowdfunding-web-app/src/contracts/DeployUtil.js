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
  Code,
} from "@elrondnetwork/erdjs";
// import * as fs from "fs-web";
import BigNumber from "bignumber.js";
import Deploy from "../components/Deploy";
import { setItem } from "../storage/session";

async function loadContractCode() {
  const fileName = process.env.PUBLIC_URL + "/e05-crowdfunding.wasm";
  console.log(fileName);

  //let buffer = await fs.readFile(fileName);
  console.log("fileName", fileName);
  //return Code.fromFile("./e05-crowdfunding.wasm");
  //return Code.fromUrl("http://localhost:3000/e05-crowdfunding.wasm");
  return Code.fromUrl("http://localhost:3000/e01-adder.wasm");
}

export async function deployContract(proxyProvider, signerProvider) {
  let contract = new SmartContract({});

  let transactionDeploy = contract.deploy({
    code: await loadContractCode(),
    gasLimit: new GasLimit(3000000),
  });

  console.log(transactionDeploy);
  setItem("transaction_identifier", true, 120);
  let result = await signerProvider.sendTransaction(transactionDeploy);
  console.log(result);
  return result;
}
