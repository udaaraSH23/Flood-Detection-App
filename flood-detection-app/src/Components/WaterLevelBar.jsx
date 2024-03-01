import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WaterLevelBar = ({ level }) => {
  const [waterLevel, setWaterLevel] = useState(0); 
  

  useEffect(() => {
    setWaterLevel(level);
  }, [level]);

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
    borderWidth:4,
    borderColor:'#FFF',
  },
  waterLevelText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WaterLevelBar;
