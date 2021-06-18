import React from "react";
import { View, Text, Button } from "react-native";
import { ScreenContainer } from "./ScreenContainer";

export const Details = ({ route }) => {
  return (
    <ScreenContainer>
      <Text>details</Text>
      {route.params.name && <Text>{route.params.name}</Text>}
    </ScreenContainer>
  );
};
