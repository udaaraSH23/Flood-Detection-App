import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
  ImageBackground,
} from "react-native";
import { useNavigation } from '@react-navigation/native';

import ToggleSwitch from "./ToggleSwitch";

import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from "./Header";

export default function Settings() {

  const navigation = useNavigation();

  //State for toggle buttons
  const [isEnabledNotification, setIsEnabledNotification] = useState(false);

  //Function handler for When Toggle button pressed
  const handleToggle = (newValue) => {
    setIsEnabledNotification(newValue);
  };

  //Update user info when settings component mounts
  const [userData, setUserData] = useState({
    name: "User",
    mbNo: "0000",
    Loc: "None",
  });

  //Global User Id State
  const [userId, setUserId] = useState('');

  const getuserId = async () => {
    try {
      const value = await AsyncStorage.getItem('id');
      console.log(value);
      if (value !== null) {
        return value; // Return the retrieved value
      } else {
        console.log('No data found');
        return ''; // Return false if no data is found
      }
    } catch (error) {
      console.error('Error retrieving data: ', error);
      return ''; // Return false if an error occurs
    }
  };

  useEffect(() => {
    async function getUserInfo() {
      const id = await getuserId(); // Wait for the user ID
      setUserId(id); // Set the user ID state

      try {
        // Create a reference to the specific user node in the Realtime Database
        if (id) {
          database()
            .ref(`/users/${id}`)
            .once('value')
            .then(snapshot => {
              setUserData(snapshot.val());
            });
        }
      } catch (error) {
        console.error('Error retrieving user information:', error);
      }
    }

    getUserInfo(); // Call getUserInfo directly inside useEffect

  }, []);



  const myImage = require('../../assets/settings.jpg')

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>

      <StatusBar backgroundColor="blue" barStyle="light-content" />
      <Header />
      <ImageBackground source={myImage} resizeMode="cover" style={styles.ImageBackground}>
        <View style={styles.container}>
          <Text style={styles.hdngTxt}>Edit your user information here</Text>
          <View style={styles.separator}>
            <View style={styles.propic}>
              <Image
                source={require('../../assets/propic.jpg')}
                style={styles.image}
              />
            </View>
            <View style={styles.proedit}>
              <Text style={styles.texth}>Your information</Text>
              <Text style={styles.text}>{userData.name}</Text>
              <Text style={styles.text}>{userData.mbNo}</Text>
              <Text style={styles.text}>{userData.Loc}</Text>
              <TouchableOpacity onPress={() => { navigation.navigate('EditUser') }} style={styles.editbtn}>
                <Text style={styles.btnText}>Set</Text>
              </TouchableOpacity>
            </View>

          </View>
          <View style={styles.tbutttons}>
            <Text style={styles.hdngTxt}>Adjust the notification settings</Text>
            <ToggleSwitch
              label="SMS Notification"
              value={false}
              onValueChange={() => {
                Alert.alert(
                  "SMS Notification",
                  "Currently not available"
                );
              }}
              icon={'envelope'}
            />
            <ToggleSwitch
              label="Notification"
              value={isEnabledNotification}
              onValueChange={handleToggle}
              icon={'bell'}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  hdngTxt: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 10,

  },
  text: {
    margin: 5,
    fontSize: 16,
    fontWeight: '500',
  },
  texth: {
    margin: 5,
    fontSize: 16,
    fontWeight: '700',
  },

  ImageBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  separator: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    spaceBetween: 5,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  tbutttons: {
    flex: 1,
    width: "90%",
    alignItems: 'center',
    justifyContent: 'center',

  },
  buttonContainer: {
    width: "60%",
    marginTop: 100,
    backgroundColor: "#7FC7D9",
    padding: 10,
    borderRadius: 20,
  },
  propic: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
    width: '40%'

  },
  proedit: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '60%',
    borderLeftWidth: 1,
    paddingLeft: 10,

  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50,
    marginRight: 10,
  },
  editbtn: {
    marginTop: 20,
    marginLeft: 5,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    fontWeight: '500'
  },
  backgroundimage: {
    flex: 1,
    justifyContent: 'center',
  },

};
