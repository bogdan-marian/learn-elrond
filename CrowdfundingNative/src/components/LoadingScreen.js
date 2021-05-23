import React from 'react';
import {View, Text, Button} from 'react-native';
import {ScreenContainer} from './ScreenContainer';

export const LoadingScreen = ({navigation}) => {
  return (
    <ScreenContainer>
      <Text>Loading ...</Text>
    </ScreenContainer>
  );
};
