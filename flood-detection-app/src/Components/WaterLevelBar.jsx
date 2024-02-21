import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WaterLevelBar = () => {
  const [waterLevel, setWaterLevel] = useState(100); // Replace with your logic to fetch the water level from the database

//   useEffect(() => {
//     // Simulate fetching water level from the database (replace this with your actual data fetching logic)
//     const fetchWaterLevel = async () => {
//       // Fetch water level from the database
//       // For example, you might use an API call or a database query
//       const fetchedWaterLevel = 50; // Replace with your actual fetched water level

//       setWaterLevel(fetchedWaterLevel);
//     };

//     fetchWaterLevel();
//   }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.bar, { height: `${waterLevel}%` }]} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent:'center',
    
  },
  bar: {
    backgroundColor: 'blue',
    width: 30,
    borderRadius: 8,
  },
  waterLevelText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WaterLevelBar;
