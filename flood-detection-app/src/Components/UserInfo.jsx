import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";


export default function Userinfo({ navigation }) {
    const handleGetStarted = () => {

        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Let's Set things Up</Text>
            <View style={styles.containerInfo}>
                <Text style={styles.body} >What is Your Name ?</Text>
                <TextInput placeholder="John Doe" style={styles.txtinputs} />
                <Text style={styles.body}>Mobile Number</Text>
                <TextInput placeholder="+94XXXXXXXX" style={styles.txtinputs} />
                <Text style={styles.body}>Set Your Location</Text>
                <TextInput placeholder="Enter Your Location" style={styles.txtinputs} />
                <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                    navigation.navigate('Home')
                    handleGetStarted()
                }}>
                    <Text style={styles.buttonText}>Let's Go</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    heading: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 40
    },
    body: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10
    },
    txtinputs: {
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    }
    ,
    buttonContainer: {
        marginTop: 100,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 20,
    }
    ,
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    containerInfo:{
        
        width:'80%',
        
    }
})