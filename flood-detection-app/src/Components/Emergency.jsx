import React from "react";
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Linking,
  ImageBackground
} from "react-native";

import Header from "./Header";

export default function Emergency() {
  const openDialer = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const myImage = require('../../assets/emergency.jpg');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor="blue" barStyle="light-content" />
      <Header />
      <ImageBackground source={myImage} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.Header}>Need help ? </Text>
          <Text style={styles.HeaderSub}>Call right now</Text>
          <View style={styles.btncontainer}>
            <TouchableOpacity onPress={() => openDialer("119")} style={styles.circleBtn} >
              <Text style={styles.circleTxt}>119</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.btmHeadTxt}>Other calls</Text>
          <View style={styles.otherBtn}>
            <View style={styles.tilescontainer}>
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

              <TouchableOpacity
                style={styles.tile}
                onPress={() => openDialer("456")}
              >
                <Image
                  source={require("../../assets/favicon.png")}
                  style={styles.icon}
                />
                <Text style={styles.tileText}>Police</Text>
              </TouchableOpacity>

              {/* Navy Tile */}
              <TouchableOpacity
                style={styles.tile}
                onPress={() => openDialer("789")}
              >
                <Image
                  source={require("../../assets/favicon.png")}
                  style={styles.icon}
                />
                <Text style={styles.tileText}>Navy</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tilescontainer}>
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

              <TouchableOpacity
                style={styles.tile}
                onPress={() => openDialer("456")}
              >
                <Image
                  source={require("../../assets/favicon.png")}
                  style={styles.icon}
                />
                <Text style={styles.tileText}>Police</Text>
              </TouchableOpacity>

              {/* Navy Tile */}
              <TouchableOpacity
                style={styles.tile}
                onPress={() => openDialer("789")}
              >
                <Image
                  source={require("../../assets/favicon.png")}
                  style={styles.icon}
                />
                <Text style={styles.tileText}>Navy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  top: {
    flex: 5,
    alignItems: "left",
    paddingTop:20,
  },
  Header: {
    marginLeft:20,
    fontSize:26,
  },
  HeaderSub:{
    fontSize:16,
    marginLeft:20
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
  circleTxt:{
    fontSize:30,
    color:'#FFF'
  },

  bottom: {
    flex: 5,
    padding:10,
  },
  otherBtn:{
    flex:1,
  },
  tilescontainer: {
    
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  tile: {
    flex: 1,
    backgroundColor: "black",
    borderRadius: 8,
    padding: 10,
    margin:5,
    alignItems: "center",
  },
  icon: {
    width: 25,
    height: 25,
    marginBottom: 8,
  },
  tileText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  btmHeadTxt:{
    fontSize:24
  },
};
