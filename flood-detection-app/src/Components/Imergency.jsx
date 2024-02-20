import React from "react";
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";

import Header from "./Header";

export default function Imergency() {
  const openDialer = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor="blue" barStyle="light-content" />
      <Header />
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.Header}>Need help ? </Text>
          <Text style={styles.Header}>Call right now</Text>
          <View style={styles.btncontainer}>
            <TouchableOpacity style={styles.circleBtn}>
              <Text>911</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottom}>
          <Text>Other calls</Text>
          <View>
            <View style={styles.container}>
              {/* Army Tile */}
              <TouchableOpacity
                style={styles.tile}
                onPress={() => openDialer("123")}
              >
                <Image
                  source={require("../../assets/favicon.png")}
                  style={styles.icon}
                />
                <Text style={styles.tileText}>Army</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
                style={styles.tile}
                onPress={() => openDialer("456")}
              >
                <Image
                  source={require("../../assets/favicon.png")}
                  style={styles.icon}
                />
                <Text style={styles.tileText}>Police</Text>
              </TouchableOpacity> */}

              {/* Navy Tile */}
              {/* <TouchableOpacity
                style={styles.tile}
                onPress={() => openDialer("789")}
              >
                <Image
                  source={require("../../assets/favicon.png")}
                  style={styles.icon}
                />
                <Text style={styles.tileText}>Navy</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
  },
  top: {
    flex: 5,
    alignItems: "left",
  },
  Header: {
    margin:20,
    fontSize:26,
  },
  btncontainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  circleBtn: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'red', 
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottom: {
    flex: 5,
  },
  tilescontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 20,
  },
  tile: {
    flex: 1,
    backgroundColor: "#3498db",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  tileText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
};
