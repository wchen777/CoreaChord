import React, {useContext, useEffect, useState} from 'react'
import HomeBody from '../components/app-body/body/HomeBody'
import HeaderBar from '../components/app-body/header/HeaderBar'
import { AuthProvider, AuthContext } from '../context/AuthContext'
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from '../config/FirebaseConfig'


export default function HomePage() {

  useEffect(() => {
    // init firebase
    console.log("firebase initialized")
    firebase.initializeApp(firebaseConfig)
  }, [])

  const { user, setUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  const onAuthStateChanged = (user) => {

    setUser(user);
    if (initializing) setInitializing(false);
    setLoading(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);


  return (
    <>
      <HeaderBar />
      <HomeBody />
    </>
  )
}
