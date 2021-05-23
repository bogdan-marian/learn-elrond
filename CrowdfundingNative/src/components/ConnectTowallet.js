import React from 'react';
import {View, Text, Button} from 'react-native';
import {ScreenContainer} from './ScreenContainer';
import {AuthContext} from "../utils/context"

export const ConnectToWallet = ({navigation}) => {
  const {signIn} = React.useContext(AuthContext);
  return (
    <ScreenContainer>
      <Text>Sign in Screen</Text>
      <Button title="Sign In" onPress={() => signIn()}/>
      
    </ScreenContainer>
  );
};
