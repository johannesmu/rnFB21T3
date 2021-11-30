import React, {useEffect,useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ThemeColours } from './ThemeColours';

export function Detail ( props ) {
  const [id, setId] = useState()
  const [time,setTime] = useState()
  const [user, setUser] = useState()
  return(
    <View>
      <Text>id: {id}</Text>
      <Text>time: {time}</Text>
      <Text>user: {user}</Text>
    </View>
  )
}