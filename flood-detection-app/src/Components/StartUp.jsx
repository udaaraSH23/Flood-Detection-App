import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";

import SwiperCard from "./SwiperCard";


function StartUp({ navigation }) {

  // const myImage = require('./water.jpg');
  return (
    // <ImageBackground source={myImage} resizeMode="cover" style={styles.image}>
    <View style={styles.container}>
      <View style={styles.top}>
      <Text style={
          styles.textStyleHead}>Welcome to Flood Sentinal</Text>
          <Text style={
          styles.textHStyle}>Flood Prediction made easy</Text>
      </View>
      <View style={styles.swiperstyle}>
          <SwiperCard/>
          </View>
        <View style={styles.bottom}>
          
        
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('UserInfo')}>

          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        </View>
        
      
    </View>
    // </ImageBackground>


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
  top:{
    flex:5,
    padding:20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyleHead: {
    color:"#0F1035",
    fontSize: 30,
    margin: 5,
    padding: 5,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  textHStyle: {
    color:"#0F1035",
    fontSize: 15,
    margin: 5,
    padding: 5,
    fontStyle:'italic',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  swiperstyle:{
    flex:4,
    backgroundColor:'#0F1035',
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
  },
  bottom: {
    flex: 2,
    backgroundColor:'#0F1035',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '60%',
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