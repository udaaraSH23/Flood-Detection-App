import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = () => {
  const navigation = useNavigation();
  const currentRoute = navigation.getState().routes[navigation.getState().index].name;


  return (
    <View style={style.container}>
      <TouchableOpacity>
        <Icon name="cog" size={24} color="black" onPress={() => navigation.navigate('Settings')} />
      </TouchableOpacity>

      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{currentRoute}</Text>

      <TouchableOpacity>
        <Icon name="info-circle" size={24} color="black" onPress={() => navigation.navigate('About')} />
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: 'black',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
})

export default Header;