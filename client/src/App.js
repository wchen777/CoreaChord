import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';
import './App.scss'
import HomePage from './pages/HomePage';
// import { ColorModeSwitcher } from './ColorModeSwitcher';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          {/* <ColorModeSwitcher justifySelf="flex-end" /> */}

          {/* TODO: NEED REACT ROUTER DOM */}
          <HomePage/>
          
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
