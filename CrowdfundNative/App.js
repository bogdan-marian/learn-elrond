import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SignIn} from './components/SignIn';
import {CreateAccount} from './components/CreateAccount';

const AuthStack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen name="SignIn" component={SignIn} />
        <AuthStack.Screen name="CreateAccount" component={CreateAccount} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
