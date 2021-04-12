import React, { useContext, useRef } from 'react'

import {
  Heading, IconButton, Tooltip,
  Button,
  VStack,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Text
} from '@chakra-ui/react';


import { FaInfoCircle } from 'react-icons/fa'

export default function InfoModal() {


  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef()

  return (
    <>
      <Tooltip
        label="What is CoreaChord?"
        aria-label="info tooltip"
        fontSize="sm">
        <IconButton
          size="md"
          fontSize="2xl"
          aria-label="info button"
          variant="ghost"
          color="current"
          mx={2}
          icon={<FaInfoCircle />}
          onClick={onOpen}
        />
      </Tooltip>

      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>


          <Center> <Heading color="teal.500" fontSize="25px" mt={12} mx={3}>
            What is CoreaChord? </Heading> </Center>
          {/* <ModalHeader w="200">Register for an account:</ModalHeader>  */}
          <ModalCloseButton />

          <Box my={8}>
            <Center>
              <VStack>
                <ModalBody>
                  <Text>
                    CoreaChord is a jazz chord progression generator named in honor after the late jazz legend <b>Chick Corea</b>.
                  </Text>
                  <br/>
                  <Text>
                    CoreaChord uses a stochastic process, specifically a <b>random walk on Markov chain</b>, to emulate common jazz chord changes.
                  </Text>
                  <br/>
                  <Text>
                  Built by<b> Will, Ashley, Maxime, and Erick </b>for CS32: Software Engineering @ Brown.
                  </Text>
                    

                </ModalBody>
                <Button variant="ghost" colorScheme="red" size="lg" onClick={onClose}>Close</Button>
              </VStack>
            </Center>
          </Box>

        </ModalContent>
      </Modal>

    </>

  )
}
