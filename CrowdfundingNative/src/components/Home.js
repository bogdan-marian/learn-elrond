import React from 'react';
import {View, Text, Button} from 'react-native';
import {ScreenContainer} from './ScreenContainer';
import {AuthContext } from '../utils/standardcontext'

export const Home = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext)
  return (
    <ScreenContainer>
      <Text>Hello Home</Text>
      <Button title="Send Funds" onPress={() => navigation.push("SendFunds")}/>
      <Button title="Sign out" onPress={() => signOut()}/>
    </ScreenContainer>
  );
};
