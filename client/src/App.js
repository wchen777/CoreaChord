import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';
import './App.scss'
import HomePage from './pages/HomePage';

function App() {
  return (
    <ChakraProvider theme={theme}>

      
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>

          {/* TODO: NEED REACT ROUTER DOM */}
          <HomePage/>
          
        </Grid>
      </Box>


    </ChakraProvider>
  );
}

export default App;
