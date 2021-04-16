import React, { useContext, useState } from 'react'
import {
  Flex, Button, Text, Input, useColorModeValue, IconButton, Tooltip
} from "@chakra-ui/react"
import { AuthContext } from '../../../context/AuthContext'
import { useChordProgContext } from '../../../context/ChordProgContext'
import { saveSheet } from '../../../api/Firebase'
import {DownloadIcon} from "@chakra-ui/icons";

const colors = ["red.300", "orange.300", "blue.300", "cyan.300", "green.300",
"purple.300", "cyan.300", "gray.300", "pink.300", "yellow.300"]

export default function SaveProgression() {
  const labelColor = useColorModeValue('gray.700', 'gray.200')

  const { user } = useContext(AuthContext)

  const [loadingButton, setLoadingButton] = useState(false)
  const [saveButtonText, setSaveButtonText] = useState("Save for Later")
  const [chordProgName, setChordProgName] = useState("My-Prog-1")

  const { chordProg } = useChordProgContext();


  const onSaveSheet = async () => {

    // check for authentication before saving
    if (!user) {
      alert("Please sign in or register for an account to save your chord progression.")
    } else {
      let r = Math.floor(Math.random() * colors.length)
      setLoadingButton(true)
      await saveSheet({ chordProg, userID: user.uid, name: chordProgName, color: colors[r] })
      setLoadingButton(false)
      setSaveButtonText("Saved!")
      setTimeout(() => setSaveButtonText("Save for Later"), 5000)
    }
  }

  return (
    <Flex w="60" mr={4} className="side-select" flexDirection="column" justifyContent="flex-start">

      <Text fontWeight="semibold" my={4} fontSize="lg" color={labelColor}>Progression Name</Text>

      <Tooltip
          label="Input the name you would like to save this progression with."
          aria-label="progression save name"
          fontSize="sm">
        <Input defaultValue="My-Prog-1" placeholder="Progression Name"
               onChange={(e) => setChordProgName(e.target.value)}/>
      </Tooltip>


      <Button
        colorScheme="teal"
        px={5}
        mx={8}
        mt={4}
        size="md"
        onClick={() => onSaveSheet()}
        loadingText="Saving Progression"
        isLoading={loadingButton}>
        {saveButtonText}
      </Button>

    </Flex>
  )
}
