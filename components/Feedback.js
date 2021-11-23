import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { ThemeColours } from './ThemeColours'

export function Feedback ( props ) {
  return (
    <View>
      <Text style={styles.text}>{ props.message }</Text>
    </View>
  )
}

const styles= StyleSheet.create({
  text: {
    color: ThemeColours.cultured,
    textAlign: 'center',
    padding: 10,
  },
})