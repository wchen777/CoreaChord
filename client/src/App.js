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

function App() {
  return (
    <ChakraProvider theme={theme}>

      <ChordProgContextProvider>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh">

            {/* TODO: NEED REACT ROUTER DOM */}
            <HomePage />

          </Grid>
        </Box>
      </ChordProgContextProvider>
      
    </ChakraProvider>
  );
}

export default App;
