import React from 'react'
import { StyleSheet, Text } from 'react-native'

export function Feedback(props) {
  return (
    <Text style={(props.style) ? props.style : styles.default} >{props.text}</Text>
  )
}

const styles = StyleSheet.create({
  default: {
    textAlign: 'center'
  }
})