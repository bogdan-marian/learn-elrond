import React from "react";
import { View, Text, Button } from "react-native";
import {ScreenContainer} from "./ScreenContainer"

export const SignIn = ({ navigation }) => {
  return (
    <ScreenContainer>
      <Text>Sign in Screen</Text>
      <Button title="Sign In" />
      <Button title="Home" onPress={() => navigation.push("Home")} />
    </ScreenContainer>
  );
};
