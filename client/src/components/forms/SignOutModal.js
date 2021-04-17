import React, { useRef } from 'react'
import {
  Heading,
  Button,
  VStack,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  Tooltip,
  Box
} from '@chakra-ui/react';
import { signOut } from '../../api/Firebase'

export default function SignOutModal( { setShowSaved } ) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef()

  return (
    <>
      <Tooltip
        label="Sign out of your CoreaChord account."
        aria-label="sign in tooltip"
        fontSize="sm">
        <Button colorScheme="teal" px={10} mx={5} size="lg" onClick={onOpen}>
          Sign out
        </Button>
      </Tooltip>


      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>


          <Center> <Heading color="teal.500" fontSize="25px" mt={12} mb={8} mx={3}>
            Are you sure you want to sign out? </Heading> </Center>
          {/* <ModalHeader w="200">Register for an account:</ModalHeader>  */}
          <ModalCloseButton />

          <Box my={8}>
            <Center>
              <VStack>
                <Button
                  colorScheme="teal"
                  size="lg"
                  onClick={() => {
                    signOut()
                    setShowSaved(false)
                  }}>
                  Sign me out!
                </Button>
                <Button variant="ghost" colorScheme="red" size="lg" onClick={onClose}>No, go back.</Button>
              </VStack>
            </Center>
          </Box>

        </ModalContent>
      </Modal>
    </>
  )
}
