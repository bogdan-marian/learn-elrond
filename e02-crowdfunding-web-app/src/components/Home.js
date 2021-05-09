import React, { useEffect, useState } from "react";
import WalletLogin from "./WalletLogin";
import { Heading } from "@chakra-ui/layout";

import { useElrondContext } from "../context";
import axios from "axios";

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

  return (
    <div style={{ padding: 20 }}>
      <Heading>Hello home</Heading>
      <div>You are now connected to your wallet</div>
      <div>Elrond address: {address}</div>
      <div>Balance: {myFunds}</div>
    </div>
  );
};

export default Home;
