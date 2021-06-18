import React from "react";
import { View, Text, Button } from "react-native";
import { ScreenContainer } from "./ScreenContainer";

export const CreateAccount = () => {
  return (
    <ScreenContainer>
      <Text>Create Account Screen</Text>
      <Button title="Sign Up" onPress={() => alert("todo!")} />
    </ScreenContainer>
  );
};
