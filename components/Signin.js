import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ThemeColours } from './ThemeColours';

export function Signin(props) {
  const[validEmail,setValidEmail] = useState()
  const[validPassword,setValidPassword] = useState()
  const[validForm,setValidForm] = useState()

  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Text style={styles.title} >Sign in</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.inner}>
          <Text>Email</Text>
          <TextInput style={styles.input} />
          <Text>Password</Text>
          <TextInput style={styles.input} />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
          <View style={styles.meta}>
            <Text style={styles.metaText}>Don't have an account?</Text>
            <TouchableOpacity style={styles.metaLink} onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.metaLinkText} >Sign up for an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  input: {
    backgroundColor: ThemeColours.cultured,
    fontSize: 16,
    padding: 5,
    borderRadius: 4,
  },
  button: {
    marginVertical: 15,
    backgroundColor: ThemeColours.cerulean,
    padding: 10,
    borderRadius: 10,
  },
  buttonDisabled: {
    marginVertical: 15,
    backgroundColor: ThemeColours.ceriseLight,
    padding: 10,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: ThemeColours.ceruleanLight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: ThemeColours.cultured,
    textAlign: 'center',
  },
  inner: {
    width: 300,
    marginBottom: 90,
  },
  meta: {
    backgroundColor: ThemeColours.culturedTransparent,
    marginVertical: 10,
    borderRadius: 10,
  },
  metaText: {
    textAlign: 'center',
    width: '100%',
    padding: 10,
  },
  metaLink: {
    padding: 10,
  },
  metaLinkText: {
    color: ThemeColours.cerulean,
    textAlign: 'center'
  }
})