import React, { useContext, useState } from 'react'
import {
  Flex, Button, Text, Input, useColorModeValue, IconButton, Tooltip
} from "@chakra-ui/react"
import { AuthContext } from '../../../context/AuthContext'
import {ChordProgContextProvider, useChordProgContext} from '../../../context/ChordProgContext'
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
  const { isTyping } = useChordProgContext();

  /*
   * Logic for preventing space bar click when typing in the text area input
   */
  let timer, // using "let" here just for the space bar key detection/differentiation
      timeoutVal = 1000; // normally, we would not use "let" keyword for good practice.
  const status = document.getElementById('status'); // pointers to simple DOM elements
  const typer = document.getElementById('typer');

  if (typer) {
    typer.addEventListener('keypress', handleKeyPress); // call functions
    typer.addEventListener('keyup', handleKeyUp);
  }

  // create a timeout on keyup event (to detect that the user has finished typing)
  function handleKeyUp(e) {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      {console.log('User has finished typing.')}
      // ChordProgContextProvider(isTyping) = false; // set boolean to false
      {console.log(isTyping)}
    }, timeoutVal);
  }

  // clear the timeout object on keypress
  function handleKeyPress(e) {
    window.clearTimeout(timer);
    {console.log('User is typing...')}
    // isTyping = true; // set boolean to true
    {console.log(isTyping)}
  }

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
        <Input defaultValue="My-Prog-1" placeholder="Progression Name" type="textbox" id="typer"
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
