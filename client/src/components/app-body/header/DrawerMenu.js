import React, { useRef, useContext } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
  Text,
  Button,
  useColorModeValue
} from "@chakra-ui/react"
import { HamburgerIcon } from '@chakra-ui/icons'
import { AuthContext } from '../../../context/AuthContext'

export default function DrawerMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  const {user, _} = useContext(AuthContext)

  const bgColor = useColorModeValue("white", "")
  return (
    <>
      <IconButton 
          ref={btnRef}     
          aria-label="Options"
          icon={<HamburgerIcon />}
          size="xs"
          variant="outline"
          mx={3}
          p={4}
          w="100%"
          h="80%"
          backgroundColor={bgColor}
          onClick={onOpen} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Welcome to CoreaChord!</DrawerHeader>

            <DrawerBody>
              {!user && <Text> Sign in or create a CoreaChord account to save your chord progressions!</Text>} 
              {user && <Text> Your account email: <i>{user.email}</i></Text>} 
            </DrawerBody>

            <DrawerFooter>
              <Button variant="solid" color="teal.500" mr={3} onClick={onClose}>
                Close
              </Button>

            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}
