import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const SwiperCard = () => {
  const data = [
    { text: 'Swift Alerts',image:require('../../assets/swipe1.jpg'),subtxt:'Receive instant flood warnings' },
    { text: 'Live Tracking',image:require('../../assets/swipe2.jpg'),subtxt:' Real-time water level updates.'  },
    { text: 'Quick Setup',image:require('../../assets/swipe3.jpg'),subtxt:'Sign up easily'  }
  ];

  return (
    <Swiper showsButtons={false}>
      {data.map((item, index) => (
        <View key={index} style={styles.slide}>
          <Text style={styles.text}>{item.text}</Text>
          <Text style={styles.subtxt}>{item.subtxt}</Text>
          <Image source={item.image} style={styles.image} />
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color:'#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtxt:{
    fontSize:16,
    color:'#FFF',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
    margin:20,
  },
});

export default SwiperCard;
