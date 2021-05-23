import React from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {ScreenContainer} from './ScreenContainer';

import {AuthContext} from '../utils/standardcontext';

export const SendFunds = ({navigation}) => {
  const contractAddress =
    'erd1f740t3vah0mg9qmv28q3lfwkj593nnma34q9jevzs30pa0sku4cqnjj2mk';
  const {getKeyFile, getPassword} = React.useContext(AuthContext);
  const [value, setValue] = React.useState('0.0000');
  console.log(getKeyFile())

  console.log('SendFundds', getKeyFile());
  console.log(getPassword());

  return (
    <ScreenContainer>
      <Text>Hello Send Funds</Text>
      <Text>Wallet address: </Text>
      <Text>Crowdfund address: {contractAddress}</Text>
      <Text>{value}</Text>
      <TextInput
        placeholder="set value"
      />
    </ScreenContainer>
  );
};
