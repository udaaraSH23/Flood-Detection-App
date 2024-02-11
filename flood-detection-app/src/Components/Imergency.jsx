import React from "react";
import { View,Text,StatusBar,SafeAreaView} from "react-native";


import Header from "./Header";



export default function Imergency(){
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
          <StatusBar backgroundColor="blue" barStyle="light-content" />
          <Header/>
          <View style={styles.container}>
            <Text>Imergency</Text>
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