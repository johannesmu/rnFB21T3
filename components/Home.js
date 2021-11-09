import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from "react-native";
import { Signout } from './Signout';

export function Home ( props ) {
  const navigation = useNavigation()

  useEffect( () => {
    navigation.setOptions({
      headerRight: props => <Signout {...props} handler={unAuth} text="Sign out" />
    })
  })

  useEffect( () => {
    if( !props.auth ) {
      navigation.reset({ index: 0, routes: [{ name: 'Signin' }] })
    }
  }, [props.auth])

  const unAuth = () => {
    props.signout()
  }

  return(
    <View>
      <Text>Home</Text>
    </View>
  )
}