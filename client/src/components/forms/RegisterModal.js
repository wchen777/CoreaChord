import React, { useRef, useState } from 'react'
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
import { registration } from '../../api/Firebase'

export default function RegisterModal() {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef()

  const [regData, setRegData] = useState({})

  const submitRegister = () => {
    if (!regData.email || !regData.password || !regData.confirmPassword) {
      alert("Please enter in all fields.")
      return
    } else if (regData.confirmPassword !== regData.password) {
      alert("Passwords do not match.")
      return
    }

    registration(regData)
  }

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
            <RegisterForm regData={regData} setRegData={setRegData}/>
          </ModalBody>

          <Box my={8}>
            <Center>
              <VStack>
                <Button colorScheme="teal" size="lg" onClick={() => submitRegister()}>
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
