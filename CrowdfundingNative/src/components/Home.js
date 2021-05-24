import React from 'react';
import {View, Text, Button} from 'react-native';
import {ScreenContainer} from './ScreenContainer';
import {AuthContext } from '../utils/standardcontext'

export const Home = ({navigation}) => {
  const {signOut, getKeyFile} = React.useContext(AuthContext)
  return (
    <ScreenContainer>
      <Text>Hello Home</Text>

      <Text>-------------------------------</Text>
      <Text>Wallet: {getKeyFile().address}</Text>
      <Text>-------------------------------</Text>
      <Button title="Send Funds" onPress={() => navigation.push("SendFunds")}/>
      <Button title="Sign out" onPress={() => signOut()}/>
    </ScreenContainer>
  );
};
