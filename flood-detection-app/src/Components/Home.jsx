import React from "react";
import { View,Text,StyleSheet,SafeAreaView,StatusBar} from "react-native";

import Header from "./Header";



export default function Home() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <Header/>
        <View style={styles.container}>
          <Text>Home Page Content</Text>
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
  };