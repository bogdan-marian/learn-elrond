import React from "react";
import { View, Text, Button } from "react-native";
import { ScreenContainer } from "./ScreenContainer";
import { Details } from "./Details";

export const Home = ({ navigation }) => {
  return (
    <ScreenContainer>
      <Text>Home Screen</Text>
      <Button
        title="React Native by Example"
        onPress={() =>
          navigation.push("Details", { name: "React Native by Example" })
        }
      />
      <Button
        title="React Native School"
        onPress={() =>
          navigation.push("Details", { name: "React Native School" })
        }
      />
      <Button title="Drawr" onPress={() => alert("todo")} />
    </ScreenContainer>
  );
};
