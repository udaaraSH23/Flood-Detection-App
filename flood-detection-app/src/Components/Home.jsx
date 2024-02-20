import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { collection, onSnapshot, getDocs } from "firebase/firestore";
import db from "../../db/fireStoredb";
import Header from "./Header";
import WaterLevelBar from "./WaterLevelBar";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [safeColor, setSafeColor] = useState("green"); // Set a default color
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
      setSafeColor(lvl > 80 ? "red" : "green");
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
            <View>
              <Text>You are safe</Text>
              <Text>Kandy</Text>
            </View>
            <Text style={styles.flood}>Flood Level</Text>
            <Text style={styles.locat}>
              Location : {level.length > 0 ? level[0].Location : "N/A"}
            </Text>
            <Text style={styles.level}>
              Water Level: {level.length > 0 ? level[0].WaterLvState : "N/A"} %
            </Text>
            <Text style={[styles.safe, { color: safeColor }]}>
              You are Safe
            </Text>
            <WaterLevelBar/>
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
  flood: {
    fontSize: 36,
    color: "blue",
    margin: 10,
  },
  locat: {
    fontSize: 18,
    color: "#0F1035",
  },
  level: {
    fontSize: 20,
    color: "#0F1035",
    marginTop: 40,
  },
  safe: {
    fontSize: 40,
    marginTop: 20,
  },
});
