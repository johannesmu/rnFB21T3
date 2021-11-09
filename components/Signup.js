import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ThemeColours } from './ThemeColours';
import { Feedback } from './Feedback';

export function Signup(props) {
  const [validEmail, setValidEmail] = useState(false)
  const [emailErrors,setEmailErrors] = useState()
  const [validPassword, setValidPassword] = useState(false)
  const [passwordErrors,setPasswordErrors] = useState()
  const [validForm, setValidForm] = useState(false)

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const navigation = useNavigation()

  const validateEmail = (emailVal) => {
    const emailElements = emailVal.split('.')
    // check if @ is at the beginning
    if ( emailVal.indexOf('@') === 0 ) {
      setValidEmail(false)
      setEmailErrors('cannot begin with @')
    }
    // check if it contains @
    else if( emailVal.indexOf('@') === -1 ) {
      setValidEmail(false)
      setEmailErrors('missing @ symbol')
    }
    // check if domain (eg .com) contains less than 2 characters
    else if( emailElements[ emailElements.length - 1].length < 2 ) {
      setValidEmail(false)
      setEmailErrors('invalid domain')
    }
    else {
      setValidEmail(true)
      setEmailErrors(null)
    }
    setEmail(emailVal)
  }

  const includesNumber = ( str ) => {
    let result = false
    const strChars = str.split('')
    strChars.forEach( (chr) => {
      if(parseInt(chr) ) {
        result = true
      }
    })
    return result
  }

  const validatePassword = (passwordVal) => {
    const passwordChars = passwordVal.split('')
    if (passwordVal.length < 8) {
      setValidPassword(false)
      setPasswordErrors('minimum 8 characters')
    }
    else if( includesNumber(passwordVal) === false ) {
      setValidPassword(false)
      setPasswordErrors('needs to contain a number')
    }
    else {
      setValidPassword(true)
      setPasswordErrors(null)
    }
    setPassword(passwordVal)
  }

  const submitHandler = () => {
    props.handler(email, password)
  }

  useEffect(() => {
    if (validEmail && validPassword) {
      setValidForm(true)
    }
    else {
      setValidForm(false)
    }
  }, [validEmail, validPassword])

  useEffect(() => {
    if (props.auth === true) {
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
    }
  }, [props.auth])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.inner}>
          <Text>Email</Text>
          <TextInput 
            style={styles.input} 
            onChangeText={(val) => validateEmail(val)} 
            placeholder="you@domain.com"
          />
          <Feedback text={emailErrors} />
          <Text>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={(val) => validatePassword(val)}
            secureTextEntry={true} 
            placeholder="minimum 8 characters"
          />
          <Feedback text={passwordErrors} />
          <TouchableOpacity
            style={(validForm) ? styles.button : styles.buttonDisabled}
            disabled={(validForm) ? false : true}
            onPress={() => submitHandler()}
          >
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
          <Feedback text={props.error} />
          <View style={styles.meta} >
            <Text style={styles.metaText} >Already have an account?</Text>
            <TouchableOpacity style={styles.metaLink} onPress={ () => navigation.navigate("Signin") }>
              <Text style={styles.metaLinkText} >Sign in to your account</Text>
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
    backgroundColor: ThemeColours.cerise,
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
    backgroundColor: ThemeColours.turquoise,
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
    color: ThemeColours.cerise,
    textAlign: 'center'
  }
})