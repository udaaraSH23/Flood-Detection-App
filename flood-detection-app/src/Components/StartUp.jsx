import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";


function StartUp({ navigation }) {

  const myImage = require('./water.jpg');
  return (
    <ImageBackground source={myImage} resizeMode="cover" style={styles.image}>
    <View style={styles.container}>
      
        <Text style={
          styles.textStyle}>Your Partner for real-time Flood Detection and Emergency Information.</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('UserInfo')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      
    </View>
    </ImageBackground>


  )
}

const styles = StyleSheet.create({

  container: {

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  textStyle: {
    color:"#0F1035",
    fontSize: 30,
    margin: 20,
    padding: 10,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  buttonContainer: {
    width: '60%',
    marginTop: 100,
    backgroundColor: '#7FC7D9',
    padding: 10,
    borderRadius: 20,
    
  },
  buttonText: {
    color: '#0F1035',
    textAlign: 'center',
    fontWeight: 'bold',
  },
})

export default StartUp;