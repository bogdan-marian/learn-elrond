/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Text, View} from 'react-native';
import {SignIn} from './components/SignIn';

const AuthStack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen name="SignIn" component={SignIn} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
