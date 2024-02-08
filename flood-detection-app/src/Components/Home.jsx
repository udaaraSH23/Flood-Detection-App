import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar,ActivityIndicator } from "react-native";

import { collection, getDocs } from "firebase/firestore";
import db from "../../db/fireStoredb";

import Header from "./Header";

export default function Home() {

  const [loading, setLoading] = useState(true);
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
      console.error('Error fetching', error);
    }
    finally{
      setLoading(false);
    }
  };

  const levelIndicate = () =>{
    const lvl = level[0].WaterLvState;
    if(lvl > 80){
      styles.safe.color = "orange"
    }
    else{
      styles.safe.color = "green"
    }
  }

  levelIndicate();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar backgroundColor="blue" barStyle="light-content" />
      <Header />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <>
          <Text style={styles.flood}>Flood Level</Text>
          <Text style={styles.locat}>Location :  {level.length > 0 ? level[0].Location : 'N/A'}</Text>
          <Text style={styles.level} >Water Level: {level.length > 0 ? level[0].WaterLvState : 'N/A'} %</Text>
          <Text style={styles.safe}>You are Safe</Text>
          </>
        )}
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
  flood:{
    fontSize:36,
    color:"blue",
    margin:10
  },
  locat:{
    fontSize:18,
    color:"#0F1035",
  },
  level:{
    fontSize:20,
    color:"#0F1035",
    marginTop:40
  },
  safe:{
    fontSize:40,
    color:"#0F1035",
    marginTop:20
  }
};