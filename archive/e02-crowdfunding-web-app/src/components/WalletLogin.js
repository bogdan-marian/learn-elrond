import { Button } from "@chakra-ui/button";
import React, { useEffect } from "react";
import { useElrondContext, useElrondDispatch } from "../context";
import { getItem, removeItem, setItem } from "../storage/session";

const WalletLogin = () => {
  const dispatch = useElrondDispatch();
  const { dapp } = useElrondContext();
  const handleOnClick = () => {
    dispatch({ type: "loading", loading: true });
    dapp.provider
      .init()
      .then((initialised) => {
        if (initialised) {
          // Wallet provider will redirect, we can set a session information so we know when we are getting back
          //  that we initiated a wallet provider login
          setItem("wallet_login", {}, 60); // Set a 60s session only
          dapp.provider.login();
        } else {
          dispatch({ type: "loading", loading: true });
          console.warn(
            "Something went wrong trying to redirect to wallet login.."
          );
        }
      })
      .catch((err) => {
        dispatch({ type: "loading", loading: false });
        console.warn(err);
      });
  };

  // The wallet login component can check for the session and the address get param
  useEffect(() => {
    if (getItem("wallet_login")) {
      dispatch({ type: "loading", loading: true });
      dapp.provider.init().then((initialised) => {
        if (!initialised) {
          dispatch({ type: "loading", loading: false });
          return;
        }

        dapp.provider
          .getAddress()
          .then((address) => {
            removeItem("wallet_login");
            dispatch({ type: "login", address });
          })
          .catch((err) => {
            dispatch({ type: "loading", loading: false });
          });
      });
    }
  }, [dapp.provider, dispatch]);

  return (
    <div className="col-12 col-md-8 col-lg-5 mx-auto login-card__container">
      <div className="card shadow-sm rounded p-4 border-0">
        <div className="card-body text-center">

          

          <Button onClick={() => handleOnClick()}> Open Test-Net Wallet</Button>
          
        </div>
      </div>
    </div>
  );
};

export default WalletLogin;
