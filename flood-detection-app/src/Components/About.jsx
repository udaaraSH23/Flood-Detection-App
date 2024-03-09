import React from "react";
import { View,Text,StatusBar,SafeAreaView} from "react-native";


import Header from "./Header";



export default function About(){
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
          <StatusBar backgroundColor="blue" barStyle="light-content" />
          <Header/>
          <View style={styles.container}>
            <Text style={styles.head}>Flood Sentinal</Text>
            <Text style={styles.body}>Developed by DSStudio</Text>
            <Text style={styles.body}>version 1.0</Text>
            <Text style={styles.body}>@Copyright Udara Shanuka</Text>
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
      head:{
        fontSize:36,
        fontWeight:'bold',
        margin:20,
      },
      body:{
        fontSize:16,
        margin:10,
      }

    };