import React, {useEffect,useState} from 'react'
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

export function Home ( props ) {
  const navigation = useNavigation()

  useEffect( () => {
   
  })

  return(
    <View>
      <Text>Home</Text>
    </View>
  )
}