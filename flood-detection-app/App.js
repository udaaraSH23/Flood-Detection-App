import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StartUp from './src/Components/StartUp';
import UserInfo from './src/Components/UserInfo';
import Home from './src/Components/Home';

const Stack = createNativeStackNavigator();

const isGetStarted = () => {

  return true;
};

export default function App() {

  const isStarted = isGetStarted();

  return (

    <NavigationContainer>
      <Stack.Navigator>
        {isStarted ? (
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />

        ) : (
          <>
            <Stack.Screen name="Startup" component={StartUp} options={{ headerShown: false }} />
            <Stack.Screen name="UserInfo" component={UserInfo} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          </>

        )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};