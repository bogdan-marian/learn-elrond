import React from "react";
import { Button } from "@chakra-ui/button";
import { Heading } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";

import { useElrondContext } from "../context";
import { deployContract } from "../contracts/DeployUtil";

function Deploy() {
  const { dapp } = useElrondContext();
  const navigate = useNavigate();

  const handleDeployContract = () => {
    deployContract(dapp.proxy, dapp.provider).then((reult) => {
      console.log("result = ", reult);
      navigate("/");
    });
  };

  let pathToFile = process.env.PUBLIC_URL + '/img/logo.png'
  console.log("pathToFIle", pathToFile)
  

  return (
    <div style={{ padding: 20 }}>
      <Heading>Hello deploy</Heading>
      <p>Are you ready to deploy a new instance of a smart contract?</p>
      <Button onClick={() => handleDeployContract()}>Deploy contract</Button>

      <Button onClick={() => navigate("/")} ml="2">
        Cancel
      </Button>
    </div>
  );
}

export default Deploy;
