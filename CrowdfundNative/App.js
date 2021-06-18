import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SignIn} from './components/SignIn';
import {CreateAccount} from './components/CreateAccount';
import {Profile} from './components/Profile';
import {Home} from './components/Home';

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator>
        <Tabs.Screen name="Home" component={Home} />
        <Tabs.Screen name="Profile" component={Profile} />
      </Tabs.Navigator>

      {/* <AuthStack.Navigator>
        <AuthStack.Screen name="SignIn" component={SignIn} />
        <AuthStack.Screen name="CreateAccount" component={CreateAccount} />
      </AuthStack.Navigator> */}
    </NavigationContainer>
  );
};

export default App;
