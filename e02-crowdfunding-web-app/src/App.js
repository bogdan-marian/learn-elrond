import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import { ElrondProvider } from "./context";

function App() {
  return (
    <Router>
      <ElrondProvider>
        <Layout>
          <PrivateRoute />
        </Layout>
      </ElrondProvider>
    </Router>
  );
}

export default App;
