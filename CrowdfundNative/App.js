import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SignIn} from './components/SignIn';
import {CreateAccount} from './components/CreateAccount';
import {Profile} from './components/Profile';
import {Home} from './components/Home';
import {Search} from './components/Search';
import {Search2} from './components/Search2';
import {Details} from './components/Details';
import {OpenWallet} from './components/OpenWallet';
import {ElrondProvider} from './context';

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <ElrondProvider>
        <HomeStack.Screen name="Home" component={Home} />
        <HomeStack.Screen name="Details" component={Details} />
        <HomeStack.Screen name="OpenWallet" component={OpenWallet} />
      </ElrondProvider>
    </HomeStack.Navigator>
  );
};

const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={Search} />
      <SearchStack.Screen name="Search2" component={Search2} />
    </SearchStack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator>
        <Tabs.Screen name="Home" component={HomeStackScreen} />
        <Tabs.Screen name="Search" component={SearchStackScreen} />
      </Tabs.Navigator>

      {/* <AuthStack.Navigator>
        <AuthStack.Screen name="SignIn" component={SignIn} />
        <AuthStack.Screen name="CreateAccount" component={CreateAccount} />
      </AuthStack.Navigator> */}
    </NavigationContainer>
  );
};

export default App;
