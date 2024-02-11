import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function ToggleSwitch({ label, onValueChange, value }) {

    const toggleSwitch = () => {
        onValueChange(!value);
    };



    return (
        <View style={styles.container}>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    text: {
        fontSize: 16,
        color: '#000',
    },
    switchContainer: {
        marginLeft: 'auto', // Align the switch to the right
    },
});
