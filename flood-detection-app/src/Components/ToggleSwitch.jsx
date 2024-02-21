import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function ToggleSwitch({ label, onValueChange, value, icon }) {
  const toggleSwitch = () => {
    onValueChange(!value);
  };

  return (
    <View style={styles.container}>
      <Icon name={icon} size={24} color="black" style={styles.icons}/>
      <Text style={styles.text}>{label}</Text>
      <View style={styles.switchContainer}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={value ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={value}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#365486",
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 10,
    borderRadius:20,
    width:'100%'
  },
  text: {
    marginLeft:10,
    fontSize: 16,
    color: "#FFF",
  },
  switchContainer: {
    marginLeft: "auto",
    
  },
  icons:{
        margin:10,
        color:'#FFF',
  },
});
