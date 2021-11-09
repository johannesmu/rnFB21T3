import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// components
import { Signup } from './components/Signup'
import { Signin } from './components/Signin'
import { Home } from './components/Home';
// firebase
import { firebaseConfig } from './Config';
import {initializeApp,} from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth"

initializeApp( firebaseConfig)


const Stack = createNativeStackNavigator();

export default function App() {
  const[ auth, setAuth ] = useState()
  const[ user, setUser ] = useState()
  const [ signupError, setSignupError ] = useState()

  const SignupHandler = ( email, password ) => {
    const auth = getAuth()
    createUserWithEmailAndPassword( auth, email, password )
    .then( ( userCredential ) => { 
      console.log(userCredential) 
      setUser(userCredential)
      setAuth( true )
    } )
    .catch( (error) => { 
      console.log(error) 
      setSignupError( error.message )
    })
  }

  const SignOutHandler = () => {
    console.log('signing out...')
    const auth = getAuth()
    signOut( auth )
    .then( () => { setAuth(false) })
    .catch( (error) => console.log(error) )
  }


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Signup" 
          options={{title: 'Sign up'}}
        >
          { 
            (props) => <Signup {...props} 
                        handler={SignupHandler} 
                        auth={auth} 
                        error={signupError} 
                        /> 
            }
        </Stack.Screen>
        <Stack.Screen 
          name="Signin" 
          component={Signin} 
          options={{
            title:'Sign in'
          }}
        />
        <Stack.Screen name="Home" options={{title: 'Home'}} >
          { (props) => <Home {...props} signout={SignOutHandler} auth={auth} /> }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
