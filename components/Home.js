import React, {useEffect,useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ThemeColours } from './ThemeColours';

export function Home ( props ) {
  const navigation = useNavigation()

  useEffect( () => {
   if(!props.auth) {
    navigation.reset({ index: 0, routes: [ {name: 'Signin'} ] })
   }
  }, [props.auth])

  const data = { time: new Date().getTime(), user: Math.random() * 100 }

  return(
    <View>
      <Text>Home</Text>
      <TouchableOpacity style={styles.button} onPress={ () => { props.add('cities', data ) }}>
        <Text>Add something</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: ThemeColours.turquoise,
    padding: 10,
  },
})