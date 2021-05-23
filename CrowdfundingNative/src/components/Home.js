import React from 'react';
import {View, Text, Button} from 'react-native';
import {ScreenContainer} from './ScreenContainer';

export const Home = ({navigation}) => {
  return (
    <ScreenContainer>
      <Text>Hello Home</Text>
      <Button title="Send Funds" onPress={() => navigation.push("SendFunds")}/>
    </ScreenContainer>
  );
};
