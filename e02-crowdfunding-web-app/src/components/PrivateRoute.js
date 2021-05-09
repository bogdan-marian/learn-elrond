import React from "react";
import { Redirect, Route, Routes } from "react-router-dom";
import Login from "./Login";

import Home from "./Home";

import { useElrondContext } from "../context";

const PrivateRoute = () => {
  const { loggedIn } = useElrondContext();

  if (!loggedIn) {
    return <Login />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default PrivateRoute;
