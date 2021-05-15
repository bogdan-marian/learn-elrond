import React, { useEffect } from "react";
import { Button } from "@chakra-ui/button";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/editable";
import { Stack } from "@chakra-ui/layout";
import { NumberInput, NumberInputField } from "@chakra-ui/number-input";
import { Crowdfund } from "../contracts";
import { addresses } from "../contracts";
import { useElrondContext } from "../context";

import { useNavigate } from "react-router-dom";

const precision = 4;
const elrondPrecision = 18;
const remainingPrecision = elrondPrecision - precision;
const trailingZeros = "0".repeat(remainingPrecision);

function decidedToSendFunds(nominatedValue) {
  let intValue = BigInt(nominatedValue);
  let zero = BigInt(0);

  if (zero !== intValue) {
    return true;
  } else {
    return false;
  }
}

function SendFunds() {
  const [value, setValue] = React.useState("0.0000");
  const [nominatedValue, setNominatedValue] = React.useState("");

  //update the nominate value
  useEffect(() => {
    let stringValue = value.toString();
    let parts = stringValue.split(".");
    let intPart = "0";
    if (parts[0] !== undefined) {
      intPart = parts[0].toString();
    }
    console.log("intPart", intPart);

    let decPart = "0000";
    if (parts[1] === undefined) {
      decPart = "0".repeat(precision);
    } else {
      decPart = parts[1].toString();
    }
    decPart = decPart.substr(0, 4);
    console.log("dec part", decPart);

    let vNominated = intPart.concat(decPart).concat(trailingZeros);
    console.log("nominated", vNominated);
    setNominatedValue(vNominated);
  }, [value]);

  const { dapp } = useElrondContext();

  const handleChange = (value) => setValue(value);

  const navigate = useNavigate();

  const handleSendFunds = () => {
    if (decidedToSendFunds(nominatedValue)) {
      const contractAddress = addresses.crowdfunding_testnet;
      const crowdFundContract = new Crowdfund(
        contractAddress,
        dapp.proxy,
        dapp.provider,
        nominatedValue
      );
      crowdFundContract.sendFunds().then(navigate("/"));
    }
  };

  console.log(value);
  //console.log(nominateValue);

  return (
    <div style={{ padding: 20 }}>
      <h2>Send funds</h2>
      <Stack direction={"row"}>
        <Stack direction={"column"}>
          <NumberInput
            defaultValue={value}
            precision={4}
            onChange={(val) => handleChange(val)}
          >
            <NumberInputField />
          </NumberInput>
        </Stack>
        <Button
          onClick={() => handleSendFunds()}
          isDisabled={!decidedToSendFunds(nominatedValue)}
        >
          Send funds
        </Button>
        <Button onClick={() => navigate("/")}>Cancel</Button>
      </Stack>
      <div>value = {value}</div>
      <div>nominatedValue = {nominatedValue}</div>
    </div>
  );
}

export default SendFunds;
