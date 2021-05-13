import React, { useEffect, useState } from "react";
import WalletLogin from "./WalletLogin";
import { Heading } from "@chakra-ui/layout";

import { useElrondContext, useElrondDispatch } from "../context";
import axios from "axios";
import { Button } from "@chakra-ui/button";

const Home = () => {
  const { address } = useElrondContext();
  const [myFunds, setMyFunds] = useState("---");

  useEffect(async () => {
    const baseUrl = "https://testnet-api.elrond.com/accounts/";
    const fullUrl = baseUrl.concat(address);
    const account = await axios(fullUrl);
    const { balance } = account.data;
    setMyFunds(balance);
  }, []);

  function logOut() {
    console.log("Time to logout");
    useElrondDispatch({ type: "logout" });
  }

  return (
    <div style={{ padding: 20 }}>
      <Heading>Hello home</Heading>
      <div>You are now connected to your wallet</div>
      <div>Elrond address: {address}</div>
      <div>Balance: {myFunds}</div>
      <div style={{ padding: 20 }}>
        <Button onClick={() => logOut()}>Close Wallet</Button>
      </div>
    </div>
  );
};

export default Home;
