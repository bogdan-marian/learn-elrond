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
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Text, View} from 'react-native';
import {ConnectToWallet} from './components/ConnectTowallet';
import {Home} from './components/Home';
import {About} from './components/About';
import {SendFunds} from './components/SendFunds';
import {LoadingScreen} from './components/LoadingScreen';
import {AuthContext} from './utils/standardcontext';

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [userToken, setUserToken] = React.useState();
  const [appKeyFileObject, setKeyFileObject] = React.useState();
  const [appKeyFilePassword, setKeyFilePassword] = React.useState();


  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setUserToken('something');
      },
      signOut: () => {
        setUserToken(null);
      },
      updateWalletCredentials: ({keyFileObject, keyFilePassword}) => {
        //stringify is needed to force reading entire object
        console.log(keyFileObject);
        console.log(keyFilePassword);
        JSON.stringify(keyFileObject);
        JSON.stringify(keyFilePassword);
        if (keyFileObject !== null && keyFilePassword != null) {
          console.log('App password: ', keyFilePassword);
          setKeyFileObject(keyFileObject);
          setKeyFilePassword(keyFilePassword);
          setUserToken('bingo');
        } else {
          setUserToken(null);
        }
      },
      getKeyFile: () => {
        return appKeyFileObject;
      },
      getPassword: () => {
        return appKeyFilePassword;
      },
    };
  }, []);

  const HomeStackScreen = () => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={Home} />
        <HomeStack.Screen name="SendFunds" component={SendFunds} />
      </HomeStack.Navigator>
    );
  };
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken ? (
          <Tabs.Navigator>
            <Tabs.Screen name="Home" component={HomeStackScreen} />
            <Tabs.Screen name="About" component={About} />
          </Tabs.Navigator>
        ) : (
          <AuthStack.Navigator>
            <AuthStack.Screen
              name="ConnectToWallet"
              component={ConnectToWallet}
            />
          </AuthStack.Navigator>
        )}

        {/*  */}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
