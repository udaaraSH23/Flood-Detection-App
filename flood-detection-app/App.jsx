import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {StyleSheet,SafeAreaView} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';


import { UserIdProvider } from "./src/Components/UserIdProvider";
import StartUp from "./src/Components/StartUp";
import UserInfo from "./src/Components/UserInfo";
import Home from "./src/Components/Home";
import Imergency from "./src/Components/Imergency";
import Maps from "./src/Components/Maps";
import Settings from "./src/Components/Settings";
import About from "./src/Components/About";
import EditUser from "./src/Components/EditUser";

//Creating stacks for navigation
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Startup status
const isGetStarted = () => {
  return false;
};

//Bottom Navigation

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Maps') {
          iconName = 'map-marker';
          color ='green'
        } else if (route.name === 'Home') {
          iconName = 'home';
          color ='#7FC7D9' 
        } else if (route.name === 'Imergency') {
          iconName = 'exclamation-triangle';
          color='red'; 
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      activeTintColor: 'blue', 
      inactiveTintColor: 'gray', 
      style: {
        backgroundColor: 'white', 
      },
      labelStyle: {
        fontSize: 12, 
      },
    })}
    >
      <Tab.Screen name="Maps" component={Maps} options={{ headerShown: false }}/>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }}/>
      <Tab.Screen name="Imergency" component={Imergency} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};

export default function App() {
  //Check for get started Status
  const isStarted = isGetStarted();

  return (
    <SafeAreaView style={style.container}>
    <UserIdProvider>
    <NavigationContainer>
      <Stack.Navigator>
        {isStarted ? (
          <>
            <Stack.Screen
              name="HomeTabs"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="About"
              component={About}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditUser"
              component={EditUser}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Startup"
              component={StartUp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UserInfo"
              component={UserInfo}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HomeTabs"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="About"
              component={About}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditUser}
              options={{ headerShown: false }}
            />

          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    </UserIdProvider>
    </SafeAreaView>
  );
}

const style =StyleSheet.create({
  container:{
    flex:1
  }
})
