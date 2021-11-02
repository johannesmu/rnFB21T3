import React from 'react'
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { AuthForm } from './AuthForm';

export function Signin ( props ) {
  const navigation = useNavigation()
  return(
    <View>
      <Text>Sign in</Text>
      <AuthForm />
      <Button title="Click here to sign up" onPress={ () => navigation.navigate("Signup") }/>
    </View>
  )
}