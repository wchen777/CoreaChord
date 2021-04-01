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
import RegisterForm from './RegisterForm';

export default function RegisterModal() {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef()

  return (
    <>
      <Tooltip
        label="Register for a CoreaChord account to save your chord progressions."
        aria-label="register tooltip"
        fontSize="sm">
        <Button colorScheme="teal" px={10} mx={5} size="lg" onClick={onOpen}>
          Register
        </Button>
      </Tooltip>


      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>


          <Center> <Heading color="teal.500" size="xl" mt={12} mb={8}>
            Register an account: </Heading> </Center>
          {/* <ModalHeader w="200">Register for an account:</ModalHeader>  */}
          <ModalCloseButton />

          <ModalBody>
            <RegisterForm />
          </ModalBody>


          <Box my={8}>
            <Center>
              <VStack>
                <Button colorScheme="teal" size="lg">
                  Register!
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
