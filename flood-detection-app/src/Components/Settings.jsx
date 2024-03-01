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
import { useUserId } from "./UserIdProvider";

import { doc, getDoc } from "firebase/firestore";
import db from "../../db/fireStoredb";

import Header from "./Header";

export default function Settings() {

  const navigation = useNavigation();

  //Global User Id State
  const { userId } = useUserId();

  //State for toggle buttons
  const [isEnabledNotification, setIsEnabledNotification] = useState(false);

  //Function handler for When Toggle button pressed
  const handleToggle = (newValue) => {
    setIsEnabledNotification(newValue);
  };

  //Update user info when settings component mounts
  const [userData, setUserData] = useState({
    Name: "Null",
    mbNo: "Null",
    location: "Null",
  });

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userDocRef = doc(db, "users", userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
          console.log(userDocSnap.data());
        } else {
          Alert.alert("User does not exist");
        }
      } catch (error) {
        // console.error("Error getting user data:", error);
      }
    };

    getUserInfo();
  }, []);

  //

  //Settings for updatings username and info

  //Update Firebase Document
  const updateUsernameInFirestore = async (newUsername) => {
    try {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, { username: newUsername });
    } catch (error) {
      console.error("Error updating username in Firestore:", error);
    }
  };


  const myImage = require('../../assets/settings.jpg')

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      
      <StatusBar backgroundColor="blue" barStyle="light-content" />
      <Header />
      <ImageBackground source={myImage} resizeMode="cover" style={styles.ImageBackground}>
      <View style={styles.container}>
        <Text>Edit your user information here</Text>
        <View style={styles.separator}>
          <View style={styles.propic}>
          <Image
        source={require('../../assets/propic.jpg')}
        style={styles.image}
      />
          </View>
          <View style={styles.proedit}>
          <Text style={styles.text}>{userData.Name}</Text>
          <Text style={styles.text}>{userData.mbNo}</Text>
          <Text style={styles.text}>{userData.location}</Text>
          <TouchableOpacity onPress={() =>{navigation.navigate('EditUser')}} style={styles.editbtn}>
            <Text>Set</Text>
          </TouchableOpacity>
          </View>
          
        </View>
        <View style={styles.tbutttons}>
        <Text>Adjust the notification settings</Text>
          <ToggleSwitch
            label="SMS Notification"
            value={isEnabledNotification}
            onValueChange={handleToggle}
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
  text: {
    margin: 5,
    fontSize: 16,
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
    paddingTop: 20,
    spaceBetween: 5,
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  tbutttons: {
    flex: 1,
    width: "90%",
    alignItems:'center',
    justifyContent:'center',
    
  },
  buttonContainer: {
    width: "60%",
    marginTop: 100,
    backgroundColor: "#7FC7D9",
    padding: 10,
    borderRadius: 20,
  },
propic:{
  flex:1,
  alignItems:'center',
  justifyContent:'center',
  height:'50%',
  width:'40%'

},
proedit:{
  flex:1,
  alignItems:'flex-start',
  justifyContent:'center',
  width:'60%'
},
image: {
  width: 100, 
  height: 100, 
  resizeMode: 'cover', 
  borderRadius: 50, 
  marginRight: 10, 
},
editbtn:{
  marginTop:20,
  marginLeft:5,
  backgroundColor:'green',
  padding:10,
  borderRadius:10,
},
backgroundimage: {
  flex: 1,
  justifyContent: 'center',
},

};
