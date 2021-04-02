import React from 'react'
import {
  Container, HStack, Center, Flex, Button, Tooltip, Box, Text, IconButton
} from "@chakra-ui/react"
import { DownloadIcon } from '@chakra-ui/icons'
import { FaPlay, FaStop } from 'react-icons/fa'

export default function LeadSheetButtons() {

  /**
   * Method to access the chord progression to be played.
   * Written this way for ease of connecting to backend later.
   *
   * @returns {*[]} - all chord progression data
   */
  function getChordProgression() {
    // TODO fill in this method
    return [];
  }

  /**
   * Plays the audio for the chord progression.
   */
  function playAudio() {
    // TODO fill in this method
    console.log("playing audio");
    // Implementation pathway
    // 1. Get the button to play any sound at all
    // 2. Get the button to play a specific sound
    // 3. Figure out how to layer three sounds together to make a chord
    // 4. Use setTimeout() calls to play a series of chords
  }

  /**
   * Stops the audio, if it's playing.
   */
  function stopAudio() {
    // TODO fill in this method
    console.log("stopping audio");
  }

  /**
   * Allows the user to download the lead sheet.
   */
  function downloadLeadSheet() {
    // TODO fill in this method
    console.log("downloading lead sheet")
    // Implementation pathway
    // 1. Get the button to download ANYTHING when clicked
    // 2. Figure out how to download specific, generated files
    // 3. Fill in the data in the file
  }

  return (
    <HStack spacing="70px" mt={12} ml={6}>

      <IconButton
        colorScheme="green"
        aria-label="play button"
        size="md"
        py={4}
        icon={<FaPlay />}
        onClick={() => {playAudio()}}
      />

      <IconButton
        colorScheme="red"
        aria-label="stop button"
        size="md"
        py={4}
        icon={<FaStop />}
        onClick={() => {stopAudio()}}
      />

      {/*TODO fill in the __ below*/}
      <Tooltip
        label="Download your lead sheet as __ format."
        aria-label="measures tooltip"
        fontSize="sm">
        <IconButton
          colorScheme="blue"
          aria-label="download button"
          size="md"
          py={4}
          icon={<DownloadIcon />}
          onClick={() => {downloadLeadSheet()}}
        />
      </Tooltip>

    </HStack>

  )
}
