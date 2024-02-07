import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";

import { collection, getDocs } from "firebase/firestore";
import db from "../../db/fireStoredb";

import Header from "./Header";

export default function Home() {

  const [level, setLevel] = useState([{Location:"",UnitNo:"",WaterLvState:""}]);
  

  useEffect(() => {
    updateWaterLevel();
  }, [])

  const updateWaterLevel = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "floodDetection"));
      const floodLevel = [];
      querySnapshot.forEach((doc) => {
        floodLevel.push({ id: doc.id, ...doc.data() });
      });
      console.log(floodLevel);
      console.log("Succcess")
      setLevel(floodLevel);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar backgroundColor="blue" barStyle="light-content" />
      <Header />
      <View style={styles.container}>
        <Text>Water Level is {level[0].WaterLvState}</Text>
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