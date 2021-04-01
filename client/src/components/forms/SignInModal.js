import React, { useRef } from 'react'
import {
  Heading,
  Button,
  VStack,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tooltip,
  Box
} from '@chakra-ui/react';
import SignInForm from './SignInForm';

export default function SignInModal() {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef()

  return (
    <>
      <Tooltip
        label="Sign in to your CoreaChord account to view and play your chord progressions."
        aria-label="sign in tooltip"
        fontSize="sm">
        <Button colorScheme="teal" px={10} mx={5} size="lg" onClick={onOpen}>
          Sign in
        </Button>
      </Tooltip>


      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>


          <Center> <Heading color="teal.500" size="xl" mt={12} mb={8}>
            Sign in: </Heading> </Center>
          {/* <ModalHeader w="200">Register for an account:</ModalHeader>  */}
          <ModalCloseButton />

          <ModalBody>
            <SignInForm />
          </ModalBody>


          <Box my={8}>
            <Center>
              <VStack>
                <Button colorScheme="teal" size="lg">
                  Sign in!
                </Button>
                <Button variant="ghost" colorScheme="red" size="lg" onClick={onClose}>Close</Button>
              </VStack>
            </Center>
          </Box>

        </ModalContent>
      </Modal>
    </>
  )
}
