import React, { useContext } from 'react'

import {
  Heading, HStack, Container, Flex, Spacer, useColorModeValue
} from '@chakra-ui/react';

import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import DrawerMenu from './DrawerMenu';
import RegisterModal from '../../forms/RegisterModal';
import SignInModal from '../../forms/SignInModal';

import { AuthContext } from '../../../context/AuthContext'
import SignOutModal from '../../forms/SignOutModal';
import InfoModal from './InfoModal';
import SavedSheetsButton from './SavedSheetsButton';


export default function HeaderBar( { showSaved, setShowSaved } ) {
  const barColor = useColorModeValue('gray.50', 'gray.800')

  const { user, _ } = useContext(AuthContext) 

  return (
    <Container className="top-bar" backgroundColor={barColor}>
      <Flex>


        <HStack my={0} py={0}>

          <DrawerMenu />

          <Heading color="teal.500" ml={7} pl={4} fontSize="44px" onClick={() => !setShowSaved()}> CoreaChord </Heading>

        </HStack>
        <Spacer />
        <HStack mr={4}>

          {/* if we have a user, display the welcome message  */}
          {user && <Heading color="teal.500" mx={10} fontSize="17px"> Welcome <i>{user.email.split("@")[0]}</i>, you are signed in. </Heading>}

          {/* no user, display register and sign in buttons  */}
          {!user && <RegisterModal /> }
          {!user && <SignInModal />}

          {/* if user, display saved sheets button */}
          {user && <SavedSheetsButton showSaved={showSaved} setShowSaved={setShowSaved}/> }

          {/* if user, display signout button */}
          {user && <SignOutModal />}

          <InfoModal/>

          <ColorModeSwitcher />
        </HStack>

      </Flex>
    </Container>
  )
}
