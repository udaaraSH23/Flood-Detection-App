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
  Alert
} from "react-native";
import Header from "./Header";
import WaterLevelBar from "./WaterLevelBar";

import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';


export default function Home() {
  const [loading, setLoading] = useState(true);
  const [safeColor, setSafeColor] = useState("white"); // Set a default color
  const [level, setLevel] = useState(""
  );

  useEffect(() => {
    const onValueChange = database()
      .ref('/Data')
      .on('value', snapshot => {
        const data = snapshot.val();
        if (data) {
          setLevel(data);
          setSafeColor(data.WaterLvState > 80 ? "red" : "white");
          setLoading(false);

        }
      }, error => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
    //Messaging Part
    //================================================================================================

    messaging().getInitialNotification().then(async (remoteMessage) => {
      console.log(remoteMessage.notification)
    }).catch((error) => console.log('failed initial'))

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log('opened')
      console.log(remoteMessage.notification)
    })

    //Foreground handler==========================================================================
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
    });
    //Background handler==========================================================================================
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    // Cleanup function
    return () => {
      database().ref('/Data').off('value', onValueChange);
      unsubscribe();
    };
  }, []);


  const myImage = require('../../assets/homebackground.jpg');
  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ImageBackground source={myImage} resizeMode="cover" style={styles.image}>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <Header />
        <View style={styles.container}>
          {loading ? (
            <ActivityIndicator size="large" color="blue" />
          ) : (
            <>

              <View style={styles.topIamgeContainer}>
                <ImageBackground
                  source={require("../../assets/home_up.jpg")}
                  style={styles.top}
                >
                  <View style={styles.topContainer}>
                    <Text style={[styles.safe, { color: safeColor }]}>
                      You are Safe
                    </Text>
                    <Text style={styles.locat}>
                      Location : {level.Location}
                    </Text>
                    {/* <TouchableOpacity style={styles.refreshbtn}>
                    <Icon
                      name="refresh"
                      size={24}
                      color="black"
                      onPress={() =>updateWaterLevel()}
                      
                    />
                  </TouchableOpacity> */}
                  </View>
                </ImageBackground>
              </View>

              <View style={styles.topBorder} />

              <View style={styles.bottom}>
                <View style={styles.bottomleft}>
                  <Text style={styles.tbody}>This gives you current water level</Text>
                  <Text style={styles.flood}>Water Level</Text>
                  <Text style={styles.level}>
                    : {level != null ? level.WaterLvState : "N/A"} %
                  </Text>

                  <Text style={styles.bbody}>Check for more information</Text>
                  <TouchableOpacity style={styles.checkbtn}>
                    <Text style={styles.checkTxt}>Check</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.bottomright}>
                  <WaterLevelBar level={level.WaterLvState} />
                </View>
              </View>

            </>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  topIamgeContainer: {
    flex: 2,
    width: "100%",
    overflow: "hidden",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
    marginTop: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FFF",

  },
  topBorder: {
    marginTop: 20,
    borderTopWidth: 2,
    borderTopColor: 'blue',
    width: '50%',
  },
  bottom: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,

  },
  body: {
    fontSize: 16,
    marginTop: 10
  },
  tbody: {
    fontSize: 16,
    marginTop: 15
  },
  bbody: {
    fontSize: 16
  },
  bottomleft: {

    flex: 3,
    paddingLeft: 10,
  },
  bottomright: {

    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
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
    marginTop: 1,
  },
  safe: {
    fontSize: 40,
    marginTop: 20,
  },
  checkbtn: {
    backgroundColor: "#365486",
    width: "40%",
    marginTop: 150,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: 'center',
  },
  checkTxt: {
    fontSize: 18,
    color: '#FFF'
  },
});
