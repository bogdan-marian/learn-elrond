import React from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {ScreenContainer} from './ScreenContainer';
import {AuthContext} from '../utils/standardcontext';
//import * as core from '@elrondnetwork/elrond-core-js';

export const SendFunds = ({navigation}) => {
  const contractAddress =
    'erd1f740t3vah0mg9qmv28q3lfwkj593nnma34q9jevzs30pa0sku4cqnjj2mk';
  const {getKeyFile, getPassword} = React.useContext(AuthContext);
  const [value, setValue] = React.useState('0.0000');

  return (
    <ScreenContainer>
      <Text>Hello Send Funds</Text>
      <Text>Wallet address: {getKeyFile()?.address}</Text>
      <Text>Contract: {contractAddress} </Text>
      <Text>{value}</Text>
      <TextInput placeholder="set value" />

      <Button title="Send funds" />
    </ScreenContainer>
  );
};
