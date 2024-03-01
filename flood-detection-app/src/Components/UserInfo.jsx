import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  ImageBackground,
} from "react-native";
import { useUserId } from "./UserIdProvider";

import db from "../../db/fireStoredb";
import { collection, addDoc } from "firebase/firestore";

export default function Userinfo({ navigation }) {
  const handleGetStarted = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "HomeTabs" }],
    });
  };

  const [Name, setName] = useState("");
  const [MobileNo, setMobileNo] = useState("");
  const [location, setLocation] = useState("");

  const validTextInput = () => {
    if (Name.trim().length < 3 || location.trim().length < 4) {
      Alert.alert(
        "Incomplete Information",
        "Please provide valid username (min 3 characters) and location (min 4 characters)."
      );
      return false;
    }
    const mobileNumberRegex = /^(\+94)?(0)?\d{9}$/;

    if (!mobileNumberRegex.test(MobileNo.trim())) {
      Alert.alert(
        "Invalid Mobile Number",
        "Please provide a valid mobile number in the format +94XXXXXXXXX or 0716870859."
      );
      return false;
    }

    return true;
  };

  const { setUserId } = useUserId();

  const handleTextInput = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        Name,
        mbNo: MobileNo,
        location,
      });

      // Get the document ID and set it as the userId
      setUserId(docRef.id);

      ToastAndroid.show("User added successfully", ToastAndroid.SHORT);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const myImage = require("../../assets/Setthings.jpg");

  return (
    <ImageBackground source={myImage} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        <Text style={styles.heading}>Let's Set things Up</Text>
        <View style={styles.containerInfo}>
          <Text style={styles.body}>What is Your Name ?</Text>
          <TextInput
            placeholder="John Doe"
            style={styles.txtinputs}
            onChangeText={(n) => setName(n)}
          />
          <Text style={styles.body}>Mobile Number</Text>
          <TextInput
            placeholder="+94XXXXXXXX"
            style={styles.txtinputs}
            onChangeText={(m) => setMobileNo(m)}
          />
          <Text style={styles.body}>Set Your Location</Text>
          <TextInput
            placeholder="Enter Your Location"
            style={styles.txtinputs}
            onChangeText={(l) => setLocation(l)}
          />
          <View style={styles.btn}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              if (validTextInput()) {
                navigation.navigate("HomeTabs");
                handleGetStarted();
                handleTextInput();
              }
            }}
          >
            <Text style={styles.buttonText}>Let's Go</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#0F1035",
  },
  body: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    color: "#0F1035",
  },
  txtinputs: {
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    color: "#0F1035",
    backgroundColor: "#FFF",
  },
  buttonContainer: {
    marginTop: 100,
    backgroundColor: "#0F1035",
    padding: 10,
    borderRadius: 20,
    width: "60%",
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  btn:{
    alignItems:'center',
    justifyContent:'center',
  },
  containerInfo: {
    width: "80%",
  },
});
