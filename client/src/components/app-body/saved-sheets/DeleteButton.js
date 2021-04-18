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
import { deleteSheet } from '../../../api/Firebase'
import { DeleteIcon } from '@chakra-ui/icons'

export default function DeleteButton({ id, forceUpdate, setShowSaved, reload, updateState }) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef()

  return (
    <>
      <Tooltip
        label="Delete your saved sheet."
        aria-label="delete tooltip"
        fontSize="xs">
        <DeleteIcon boxSize={4} focusable={true} className="trash" onClick={onOpen} />
      </Tooltip>


      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>

          <Box textAlign="center">
            <Heading color="teal.500" fontSize="25px" mt={12} mx={10} alignSelf='center'>
              Are you sure you want to delete your saved sheet? </Heading>
          </Box>

          <Heading color="gray.500" fontSize="18px" mt={6} mb={8} mx='auto'>
            (this action cannot be reversed) </Heading>

          <ModalCloseButton />

          <Box mb={8}>
            <Center>
              <VStack>
                <Button
                  colorScheme="teal"
                  size="lg"
                  onClick={() => {
                    deleteSheet(id)
                    window.location.reload()
                    updateState(reload + 1)
                    forceUpdate()
                    setShowSaved(true)
                    onClose()
                    }}>
                  Delete my sheet!
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
