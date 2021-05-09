import React from "react";
import { Redirect, Route, Routes } from "react-router-dom";

import Home from "./Home";

const PrivateRoute = ({ component, ...rest }) => {


  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default PrivateRoute;