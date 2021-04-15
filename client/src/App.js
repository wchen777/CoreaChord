import React from 'react';
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
// import { BrowserRouter, Switch } from 'react-router-dom'
// import DynamicRoute from './routes/DynamicRoute';
// import SavedSheetsPage from './pages/SavedSheetsPage';
// import firebase from "firebase/app";
// import "firebase/auth";

function App() {


  return (
    <ChakraProvider theme={theme}>
      {/* <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}> */}

      <AuthProvider>
        <ChordProgContextProvider>
          {/* <BrowserRouter> */}
            <Box textAlign="center" fontSize="xl">
              <Grid minH="100vh">

                <HomePage/>

              </Grid>
            </Box>
          {/* </BrowserRouter> */}
        </ChordProgContextProvider>
      </AuthProvider>
      {/* </FirebaseAuthProvider> */}
    </ChakraProvider>
  );
}

export default App;
