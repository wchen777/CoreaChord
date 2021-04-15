import React, {useContext, useEffect, useState, useRef } from 'react'
import HomeBody from '../components/app-body/body/HomeBody'
import HeaderBar from '../components/app-body/header/HeaderBar'
import { AuthProvider, AuthContext } from '../context/AuthContext'
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from '../config/FirebaseConfig'
import SavedSheetsBody from '../components/app-body/saved-sheets/SavedSheetsBody';
import * as Tone from "tone";


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


  const [showSaved, setShowSaved] = useState(false)


  // ------------- SYNTHS ----------------


  const synths = useRef([]);

  const pianoSample = {
    urls: {
      "C4": "C4.mp3",
      "D#4": "Ds4.mp3",
      "F#4": "Fs4.mp3",
      "A4": "A4.mp3",
    },
    release: 1,
    baseUrl: "https://tonejs.github.io/audio/salamander/",
  }

  const casioSample = {
    urls: {
      A1: "A1.mp3",
      A2: "A2.mp3",
      D2: "D2.mp3",
      G2: "G2.mp3"
    },
    baseUrl: "https://tonejs.github.io/audio/casio/"
  }

  useEffect(() => {
    if (synths.current.length < 5) {
      const synth1 = new Tone.Sampler(pianoSample).toDestination();
      const synth2 = new Tone.Sampler(pianoSample).toDestination();
      const synth3 = new Tone.Sampler(pianoSample).toDestination();
      const synth4 = new Tone.Sampler(pianoSample).toDestination();
      const synth5 = new Tone.Sampler(pianoSample).toDestination();
      synths.current = [synth1, synth2, synth3, synth4, synth5];
    }
  })

  return (
    <>
      <HeaderBar showSaved={showSaved} setShowSaved={setShowSaved}/>
      { !showSaved && <HomeBody synths={synths.current}/> }
      { showSaved && <SavedSheetsBody setShowSaved={setShowSaved}/> }
    </>
  )
}
