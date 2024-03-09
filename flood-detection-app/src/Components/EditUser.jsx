import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image, ImageBackground } from "react-native";

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';



export default function EditUser() {
  const [Name, setName] = useState('');
  const [MobileNo, setMobileNo] = useState('');
  const [location, setLocation] = useState('');

  const navigation = useNavigation();


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

  useEffect(() =>{
    async function getUserInfo() {
      const id = await getuserId(); // Wait for the user ID
      setUserId(id); // Set the user ID state
      
  }
  getUserInfo();
},[]);
  //Update Firebase 
  const updateUsernameInFirestore = async () => {
    try {
      database()
        .ref(`/users/${userId}`)
        .update({
          name: Name,
          mbNo: MobileNo,
          Loc: location
        })
        .then(() => console.log('Data set.'));
    } catch (error) {
      console.error("Error updating username in Firestore:", error);
    }
  };


  const validTextInput = () => {

    if (Name.trim().length < 3 || location.trim().length < 4) {
      Alert.alert('Incomplete Information', 'Please provide valid username (min 3 characters) and location (min 4 characters).');
      return false;
    }
    const mobileNumberRegex = /^(\+94)?(0)?\d{9}$/;

    if (!mobileNumberRegex.test(MobileNo.trim())) {
      Alert.alert('Invalid Mobile Number', 'Please provide a valid mobile number in the format +94XXXXXXXXX or 0716870859.');
      return false;
    }

    return true;
  };

  const myImage = require('../../assets/editprofile.jpg');

  return (
    <ImageBackground source={myImage} resizeMode="cover" style={styles.ImageBackground}>
      <View style={styles.container}>

        <Image
          source={require('../../assets/propic.jpg')}
          style={styles.image}
        />
        <Text style={styles.body} >Hello User</Text>
        <View style={styles.containerInfo}>
          <Text style={styles.body} >What is Your Name ?</Text>
          <TextInput placeholder="John Doe" style={styles.txtinputs} onChangeText={n => setName(n)} />
          <Text style={styles.body}>Mobile Number</Text>
          <TextInput placeholder="+94XXXXXXXX" style={styles.txtinputs} onChangeText={m => setMobileNo(m)} />
          <Text style={styles.body}>Set Your Location</Text>
          <TextInput placeholder="Enter Your Location" style={styles.txtinputs} onChangeText={l => setLocation(l)} />
          <TouchableOpacity style={styles.buttonContainer} onPress={() => {
            if (validTextInput()) {
              updateUsernameInFirestore();
              Alert.alert('User Info Changed', 'You will be re-direct to home', [
                {
                  text: 'OK',
                  onPress: () => navigation.navigate('Home')
                }
              ],
              )

            }
          }}>
            <Text style={styles.buttonText}>Edit Information</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 40,
    color: "#0F1035"
  },
  body: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    color: "#0F1035",
    fontWeight:'700'
  },
  txtinputs: {
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    color: "#0F1035"
  }
  ,
  buttonContainer: {
    marginTop: 100,
    backgroundColor: '#0F1035',
    padding: 10,
    borderRadius: 20,
    
  }
  ,
  buttonText: {
    color: "#FFF",
    textAlign: 'center',
    fontWeight: 'bold',
  },
  containerInfo: {

    width: '80%',

  },
  image: {
    width: 100, // Set the desired width
    height: 100, // Set the desired height
    resizeMode: 'cover', // or 'contain' or 'stretch' or 'center'
    borderRadius: 50, // for a circular image, adjust as needed
    marginRight: 10, // optional margin to separate the image from other content
  },
})
