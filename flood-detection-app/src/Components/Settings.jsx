import React, { useState, useEffect } from "react";
import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, Alert } from "react-native";

import ToggleSwitch from "./ToggleSwitch";
import { useUserId } from "./UserIdProvider";

import { doc, getDoc } from "firebase/firestore";
import db from "../../db/fireStoredb";


import Header from "./Header";



export default function Settings() {

  //Global User Id State
  const { userId } = useUserId();

  //State for toggle buttons
  const [isEnabledNotification, setIsEnabledNotification] = useState(false);

  //Function handler for When Toggle button pressed
  const handleToggle = newValue => {
    setIsEnabledNotification(newValue);
  };

  //Update user info when settings component mounts
  const [userData, setUserData] = useState({ Name: "Null", mbNo: "Null", location: "Null" });

  useEffect(() => {


    const getUserInfo = async () => {
      try {
        const userDocRef = doc(db, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
          console.log(userDocSnap.data());
        } else {
          Alert.alert('User does not exist');
        }
      } catch (error) {
        console.error('Error getting user data:', error);
      }
    };

    getUserInfo();
  }, []);


  //



  //Settings for updatings username and info


  const [username, setUsername] = useState('');

  const handleSettingsPress = async () => {
    try {
      console.log("ddd")
      const newUsername = await promptForUsername();
      setUsername(newUsername);
    } catch (error) {
      console.error('Error updating username:', error);
    }
  };

  const promptForUsername = () => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        'Enter Username',
        'Please enter your username:',
        [
          {
            text: 'Cancel',
            onPress: () => reject('Cancelled'),
            style: 'cancel',
          },
          {
            text: 'Save',
            onPress: username => resolve(username),
          },
        ],
        'plain-text',
        '',
        'default'
      );
    });
  };
  //Update Firebase Document
  const updateUsernameInFirestore = async newUsername => {
    try {
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, { username: newUsername });
    } catch (error) {
      console.error('Error updating username in Firestore:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar backgroundColor="blue" barStyle="light-content" />
      <Header />
      <View style={styles.container}>
        <View style={styles.separator}>
          <Text style={styles.text}>{userData.Name}</Text>
          <Text style={styles.text}>{userData.mbNo}</Text>
          <Text style={styles.text}>{userData.location}</Text>
          <TouchableOpacity style={styles.buttonContainer} onPress={() =>handleSettingsPress()}>
            <Text>Set</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.tbutttons}>
          <ToggleSwitch
            label="Notification"
            value={isEnabledNotification}
            onValueChange={handleToggle} />
          <ToggleSwitch
            label="Notification"
            value={isEnabledNotification}
            onValueChange={handleToggle} />

        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = {

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    margin: 5,
    fontSize: 16,

  },
  separator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: "80%",
    paddingTop: 20,
    spaceBetween: 5,
    borderBottomWidth: 4,
    borderBottomColor: 'blue',
  },
  tbutttons: {
    flex: 1,
    width: '80%',
  },
  buttonContainer: {
    width: '60%',
    marginTop: 100,
    backgroundColor: '#7FC7D9',
    padding: 10,
    borderRadius: 20,

  },
};