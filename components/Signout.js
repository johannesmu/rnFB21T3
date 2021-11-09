import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from "react-native";
export function Signout( props ) {
  const pressHandler = () => {
    props.handler()
  }
  return(
    <TouchableOpacity 
      onPress={ pressHandler }
    >
      <Text>{props.text}</Text>
    </TouchableOpacity>
  )
}