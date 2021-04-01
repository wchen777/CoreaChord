import React from 'react'

import {
  Heading, HStack, Container, Button, VStack, Center, Flex, Spacer, IconButton
} from '@chakra-ui/react';

import { FaInfoCircle } from 'react-icons/fa'

import { ColorModeSwitcher } from '../ColorModeSwitcher';
import DrawerMenu from './DrawerMenu';
import RegisterModal from './forms/RegisterModal';
import SignInModal from './forms/SignInModal';


export default function HeaderBar() {
  return (
    <Container className="top-bar" mb={0} pb={0}>
      <Flex>


        <HStack my={0} py={0}>

          <DrawerMenu />

          <Heading color="teal.500" ml={7} pl={4} fontSize="44px"> CoreaChord </Heading>



          {/* <VStack mr={4} my={0} py={0}>

           
          </VStack> */}
        </HStack>
        <Spacer />
        <HStack mr={4}>

          <RegisterModal />

          <SignInModal />

          {/* Refactor this elsewhere, add modal */}
          <IconButton
            size="md"
            fontSize="2xl"
            aria-label="info button"
            variant="ghost"
            color="current"
            mx={2}
            icon={<FaInfoCircle />}

          />

          <ColorModeSwitcher />
        </HStack>

      </Flex>
    </Container>
  )
}
