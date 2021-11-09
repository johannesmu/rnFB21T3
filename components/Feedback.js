import React from 'react'
import { View, Text } from 'react-native'

export function Feedback ( props ) {
  return (
    <View>
      <Text>{ props.message }</Text>
    </View>
  )
}