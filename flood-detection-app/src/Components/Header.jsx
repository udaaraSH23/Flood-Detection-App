import React from 'react';
import { View, TouchableOpacity, Text,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const Header = () => {
  const navigation = useNavigation();
  const currentRoute = navigation.getState().routes[navigation.getState().index].name;
  console.log(currentRoute)

  return (
    <View style={style.container}>
      <TouchableOpacity>
        <Icon name="cog" size={24} color="black"/>
      </TouchableOpacity>

      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{currentRoute}</Text>

      <TouchableOpacity>
        <Icon name="info-circle" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const style =StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor:'green'
    },
})

export default Header;