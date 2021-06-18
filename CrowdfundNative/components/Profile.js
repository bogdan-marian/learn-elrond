import React from "react";
import { View, Text, Button } from "react-native";
import { ScreenContainer } from "./ScreenContainer";
import { AuthContext } from "../context";

export const Profile = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);
  return (
    <ScreenContainer>
      <Text>Prifile Screen</Text>
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
      <Button title="Sign Out" onPress={() => signOut()} />
    </ScreenContainer>
  );
};
