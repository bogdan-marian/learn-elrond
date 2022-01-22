import React from "react";
import { Redirect, Route, Routes } from "react-router-dom";
import Login from "./Login";

import Home from "./Home";

import { useElrondContext } from "../context";
import SendFunds from "./SendFunds";
import Deploy from "./Deploy";

const PrivateRoute = () => {
  const { loggedIn } = useElrondContext();

  if (!loggedIn) {
    return <Login />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sendfunds" element={<SendFunds />} />
      <Route path="/deploy" element={<Deploy />} />
    </Routes>
  );
};

export default PrivateRoute;
