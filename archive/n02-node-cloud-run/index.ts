const express = require("express");

import path = require("path");
import fs = require("fs");
import {
  Account,
  Address,
  UserSigner,
  SmartContractAbi,
  Balance,
  Code,
  ContractFunction,
  GasLimit,
  NetworkConfig,
  ProxyProvider,
  SmartContract,
} from "@elrondnetwork/erdjs";
import {
  AbiRegistry,
  AddressValue,
  BytesValue,
  U32Value,
} from "@elrondnetwork/erdjs/out/smartcontracts/typesystem";
import { BinaryCodec } from "@elrondnetwork/erdjs/out/smartcontracts/codec";
import BigNumber from "bignumber.js";
import { readFileSync, accessSync, constants, writeFileSync } from "fs";

const app = express();

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Hello world listening on port", port);
  queryCrowdFund();
});

app.get("/", (req, res) => {
  console.log("Hello world received a request.");

  const target = process.env.TARGET || "World";
  res.send(`Hello ${target}!`);
});

app.get("/tournament/:tournamentId/", getTournament);

function getTournament(request, response) {
  let tournamentId = request.params.tournamentId;
  console.log("tournamentId=" + tournamentId);

  let reply = {
    success: true,
    message: "getTournament successfully called",
    tournamentId: tournamentId,
  };

  runInteractions();

  response.send(reply);
}

async function runInteractions() {
  let codec = new BinaryCodec();
  let provider = new ProxyProvider("http://localhost:7950");
  let keyFilePath = path.resolve(__dirname, "wallets/users/alice.json");
  let keyFileJson = fs.readFileSync(keyFilePath, { encoding: "utf8" });
  let keyFileObject = JSON.parse(keyFileJson);
  let password = "password";
  let signer = UserSigner.fromWallet(keyFileObject, password);
  let user = new Account(signer.getAddress());

  let abiPath = path.resolve(__dirname, "abi.json");
  let abiJson = fs.readFileSync(abiPath, { encoding: "utf8" });
  let abiObject = JSON.parse(abiJson);
  let abi = new AbiRegistry();
  abi.extend(abiObject);
  //let namespace = abi.findNamespace("lottery-egld");

  console.log("End of runInteractions");
}

export const createSmartContractInstance = (
  abi?: AbiRegistry,
  address?: string
) => {
  const contract = new SmartContract({
    address: address ? new Address(address) : undefined,
    abi:
      abi &&
      new SmartContractAbi(
        abi,
        abi.interfaces.map((iface) => iface.name)
      ),
  });
  return contract;
};

async function getAbi(filePath: string) {
  try {
    console.log("File path: " + filePath)
    let registry = await AbiRegistry.load({ files: [filePath] });
    return registry;
  }catch(e){
    console.log("We had an error AbiRegistry.load", e.message)
  }
}

async function queryCrowdFund() {
  let address = new Address(
    "erd1qqqqqqqqqqqqqpgq6p6mr5hc3ksl0t6u72454hg6l7qnteyrd8sslxsa3d"
  );
  let proxy: ProxyProvider = new ProxyProvider(
    "https://devnet-gateway.elrond.com"
  );

  // const contract: SmartContract = new SmartContract({ address });
  // const func: ContractFunction = new ContractFunction("currentFunds");
  // const qResponse = await contract.runQuery(proxy, { func });
  // qResponse.assertSuccess();
  // const returnData = qResponse.returnData;
  // let values = returnData.values();

  // console.log(returnData);
  let abiFile =  getAbi("./crowdfunding-esdt.abi.json");

  // End of queryCrowdFund()
  let stamp = Date();
  console.log("End of query crowdfund " + stamp);

  
}

async function queryChessout() {
  let contract = new SmartContract({
    address: new Address(
      "erd1qqqqqqqqqqqqqpgqxwakt2g7u9atsnr03gqcgmhcv38pt7mkd94q6shuwt"
    ),
  });
  let addressOfAlice = new Address(
    "erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th"
  );
}
