import React,{useState} from "react";
import { View,Text,StyleSheet,TextInput,TouchableOpacity, Alert,Image} from "react-native";


import Header from "./Header";




export default function EditUser(){
  const [Name, setName] = useState('');
  const [MobileNo, setMobileNo] = useState('');
  const [location, setLocation] = useState('');


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

    return (
      <View style={styles.container}>
      
      <Image
        source={require('../../assets/propic.jpg')}
        style={styles.image}
      />
      <View style={styles.containerInfo}>
          <Text style={styles.body} >What is Your Name ?</Text>
          <TextInput placeholder="John Doe" style={styles.txtinputs} onChangeText={n => setName(n)} />
          <Text style={styles.body}>Mobile Number</Text>
          <TextInput placeholder="+94XXXXXXXX" style={styles.txtinputs} onChangeText={m => setMobileNo(m)} />
          <Text style={styles.body}>Set Your Location</Text>
          <TextInput placeholder="Enter Your Location" style={styles.txtinputs} onChangeText={l => setLocation(l)} />
          <TouchableOpacity style={styles.buttonContainer} onPress={() => {
              if (validTextInput()) {
                  Alert.alert('Alert','User Edited')
              }
          }}>
              <Text style={styles.buttonText}>Let's Go</Text>
          </TouchableOpacity>
      </View>
  </View>
)
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
},
heading: {
  fontSize: 36,
  fontWeight: 'bold',
  marginBottom: 40,
  color: "#0F1035"
},
body: {
  fontSize: 20,
  marginTop: 10,
  marginBottom: 10,
  color: "#0F1035"
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
  backgroundColor: '#7FC7D9',
  padding: 10,
  borderRadius: 20,
}
,
buttonText: {
  color: "#0F1035",
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
