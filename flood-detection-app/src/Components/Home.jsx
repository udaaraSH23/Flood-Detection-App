import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { collection, onSnapshot, getDocs } from "firebase/firestore";
import db from "../../db/fireStoredb";
import Header from "./Header";
import WaterLevelBar from "./WaterLevelBar";

import Icon from "react-native-vector-icons/FontAwesome";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [safeColor, setSafeColor] = useState("white"); // Set a default color
  const [level, setLevel] = useState([
    { Location: "", UnitNo: "", WaterLvState: "" },
  ]);

  useEffect(() => {
    // Update water level when component mounts
    updateWaterLevel();

    // Set up listener for changes in water level
    const levelDataListener = onSnapshot(
      collection(db, "floodDetection"),
      (snapshot) => {
        const updatedLevel = [];
        snapshot.forEach((doc) => {
          updatedLevel.push({ id: doc.id, ...doc.data() });
        });
        setLevel(updatedLevel);
        levelIndicate(updatedLevel);
      }
    );

    return () => {
      levelDataListener();
    };
  }, []);
  //Listens to Document and Updates
  const updateWaterLevel = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "floodDetection"));
      const floodLevel = [];
      querySnapshot.forEach((doc) => {
        floodLevel.push({ id: doc.id, ...doc.data() });
      });
      setLevel(floodLevel);
    } catch (error) {
      console.error("Error fetching", error);
    } finally {
      setLoading(false);
    }
  };

  const levelIndicate = (updatedLevel) => {
    if (updatedLevel.length > 0) {
      const lvl = updatedLevel[0].WaterLvState;
      setSafeColor(lvl > 80 ? "red" : "white");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor="blue" barStyle="light-content" />
      <Header />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <>
            <View style={styles.topIamgeContainer}>
              <ImageBackground
                source={require("../../assets/home2.jpg")}
                style={styles.top}
              >
                <View style={styles.topContainer}>
                  <Text style={[styles.safe, { color: safeColor }]}>
                    You are Safe
                  </Text>
                  <Text style={styles.locat}>
                    Location : {level.length > 0 ? level[0].Location : "N/A"}
                  </Text>
                  <TouchableOpacity style={styles.refreshbtn}>
                    <Icon
                      name="refresh"
                      size={24}
                      color="black"
                      
                    />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>

            <View style={styles.topBorder} />

            <View style={styles.bottom}>
              <View style={styles.bottomleft}>
                <Text style={styles.flood}>Water Level</Text>
                <Text style={styles.level}>
                  : {level.length > 0 ? level[0].WaterLvState : "N/A"} %
                </Text>
                <TouchableOpacity style={styles.checkbtn}>
                  <Text style={styles.checkTxt}>Check</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.bottomright}>
                <WaterLevelBar />
              </View>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topIamgeContainer: {
    flex: 2,
    width: "100%",
    overflow: "hidden",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  top: {
    justifyContent: "flex-start",
    alignItems: "baseline",
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  topContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    paddingLeft: 20,
  },
  refreshbtn: {
    padding: 10,
    marginTop:20,
    width:50,
    height:50,
    borderRadius:25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FFF",
    
  },
  topBorder: {
    marginTop:20,
    borderTopWidth: 2, 
    borderTopColor: 'blue', 
    width: '50%',
  },
  bottom: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop:5,

  },
  bottomleft: {
    
    flex: 3,
    paddingLeft:10,
  },
  bottomright: {
    
    flex: 1,
    justifyContent: "center",
    alignItems:'center',
    paddingTop:30,
    paddingBottom:30,
  },
  flood: {
    fontSize: 36,
    color: "#0F1035",
    marginTop: 10,
  },
  locat: {
    fontSize: 18,
    color: "#FFF",
  },
  level: {
    fontSize: 20,
    color: "#0F1035",
    marginTop:1,
  },
  safe: {
    fontSize: 40,
    marginTop: 20,
  },
  checkbtn: {
    backgroundColor: "#365486",
    width: "40%",
    marginTop:150,
    padding: 20,
    borderRadius:20,
  },
  checkTxt:{
    fontSize:18,
    color:'#FFF'
  },
});
