import React from "react";
import { View, Text, Button } from "react-native";
import {ScreenContainer} from "./ScreenContainer"
import {Search2} from "./Search2"

export const Search = ({ navigation }) => {
  return (
    <ScreenContainer>
      <Text>Search Screen</Text>
      <Button title="Search 2" onPress={()=> navigation.push("Search2")}/>
      <Button title="React Native School" onPress={()=> 
      navigation.navigate('Home',{
        screen: 'Details',
        params:{name: "React Native School navigate"}
      })}/>
    </ScreenContainer>
  );
};
