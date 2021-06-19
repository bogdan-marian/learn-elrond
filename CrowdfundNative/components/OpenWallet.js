import React from 'react';
import {View, Text, Button} from 'react-native';
import {ScreenContainer} from './ScreenContainer';

export const OpenWallet = ({route}) => {
  return (
    <ScreenContainer>
      <Text>OpenWallet</Text>
      {route.params.name && <Text>{route.params.name}</Text>}
    </ScreenContainer>
  );
};
