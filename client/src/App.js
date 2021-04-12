import React, { useState, useEffect, useContext } from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';
import './App.scss'
import HomePage from './pages/HomePage';
import { ChordProgContextProvider } from './context/ChordProgContext'
import { AuthProvider, AuthContext } from './context/AuthContext'
// import firebase from "firebase/app";
// import "firebase/auth";

function App() {


  return (
    <ChakraProvider theme={theme}>
      {/* <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}> */}

      <AuthProvider>
        <ChordProgContextProvider>
          <Box textAlign="center" fontSize="xl">
            <Grid minH="100vh">

              {/* TODO: NEED REACT ROUTER DOM */}
              <HomePage />

            </Grid>
          </Box>
        </ChordProgContextProvider>
      </AuthProvider>
      {/* </FirebaseAuthProvider> */}
    </ChakraProvider>
  );
}

export default App;
