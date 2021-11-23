import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// components
import { Signup } from './components/Signup'
import { Signin } from './components/Signin'
import { Home } from './components/Home';
import { Signout } from './components/Signout';
// firebase
import { firebaseConfig } from './Config';
import {initializeApp,} from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { initializeFirestore, getFirestore, setDoc, doc, addDoc, collection } from 'firebase/firestore'


const app = initializeApp( firebaseConfig)
const FSdb = initializeFirestore(app, {useFetchStreams: false})
const FBauth = getAuth()

const Stack = createNativeStackNavigator();

export default function App() {
  const[ auth, setAuth ] = useState()
  const[ user, setUser ] = useState()
  const [signupError, setSignupError ] = useState()
  const [signinError, setSigninError ] = useState()

  

  useEffect(() => {
    onAuthStateChanged( FBauth, (user) => {
      if( user ) { 
        setAuth(true) 
        setUser(user)
        console.log( 'authed')
      }
      else {
        setAuth(false)
        setUser(null)
      }
    })
  })

  const SignupHandler = ( email, password ) => {
    setSignupError(null)
    createUserWithEmailAndPassword( FBauth, email, password )
    .then( ( userCredential ) => { 
      setUser(userCredential.user)
      setAuth( true )
    } )
    .catch( (error) => { setSignupError(error.code) })
  }

  const SigninHandler = ( email, password ) => {
    signInWithEmailAndPassword( FBauth, email, password )
    .then( (userCredential) => {
      setUser(userCredential.user)
      setAuth(true)
    })
    .catch( (error) => { 
      const message = (error.code.includes('/') ) ? error.code.split('/')[1].replace(/-/g, ' ') : error.code
      setSigninError(message) 
    })
  }

  const SignoutHandler = () => {
    signOut( FBauth ).then( () => {
      setAuth( false )
      setUser( null )
    })
    .catch( (error) => console.log(error.code) )
  }

  const addData = async ( FScollection , data ) => {
    //adding data to a collection with automatic id
    const ref = await addDoc( collection(FSdb, FScollection ), data )
  }



  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Signup" options={{title: 'Sign up'}}>
          { (props) => 
          <Signup {...props} 
          handler={SignupHandler} 
          auth={auth} 
          error={signupError} 
          /> }
        </Stack.Screen>
        <Stack.Screen 
          name="Signin" 
          options={{
            title:'Sign in'
          }}
        >
          { (props) => 
          <Signin {...props} 
          auth={auth} 
          error={signinError} 
          handler={SigninHandler} 
          /> }
        </Stack.Screen>
        <Stack.Screen name="Home" options={{
          headerTitle: "Home",
          headerRight: (props) => <Signout {...props} handler={SignoutHandler} />
        }}>
          { (props) => 
          <Home {...props} auth={auth} add={addData} /> }
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
