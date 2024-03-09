import { StatusBar } from "expo-status-bar";
import React, { useState,useEffect } from "react";
import {StyleSheet,SafeAreaView} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { UserIdProvider } from "./src/Components/UserIdProvider";
import StartUp from "./src/Components/StartUp";
import UserInfo from "./src/Components/UserInfo";
import Home from "./src/Components/Home";
import Emergency from "./src/Components/Emergency";
import Maps from "./src/Components/Maps";
import Settings from "./src/Components/Settings";
import About from "./src/Components/About";
import EditUser from "./src/Components/EditUser";

//Creating stacks for navigation
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Startup status retrieve from local starage
const isGetStarted = async () => {
  try {
    const value = await AsyncStorage.getItem('key');
    if (value !== null) {
      return value; // Return the retrieved value
    } else {
      console.log('No data found');
      return false; // Return false if no data is found
    }
  } catch (error) {
    console.error('Error retrieving data: ', error);
    return false; // Return false if an error occurs
  }
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
        } else if (route.name === 'Emergency') {
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
      <Tab.Screen name="Emergency" component={Emergency} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};

export default function App() {
  //Check for get started Status
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    isGetStarted().then((data) => {
      setIsStarted(data);
    });
  }, []);
  

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
              name="EditUser"
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
