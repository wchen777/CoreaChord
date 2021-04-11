import React, {useState} from 'react'
import {
  Container, HStack, Center, Button, Tooltip, Box, Text
} from "@chakra-ui/react"
import Select from 'react-select'
import axios from 'axios'
import {useChordProgContext} from '../../../context/ChordProgContext'

import { numBars, chordDiversity, chordValues } from '../../../data/GenerateSettings'

import ResultsBody from './ResultsBody'

export default function HomeBody() {
  const {chordProg, setChordProg} = useChordProgContext();
  const [startChordInput, setStartChordInput] = useState("");
  const [chordDiversityInput, setChordDiversityInput] = useState("");
  const [numBarsInput, setNumBarsInput] = useState(0);

  /**
   * Makes an axios request to generate a set of chords based on the current settings.
   */
  function generateChords() {
    if (startChordInput === "" || chordDiversityInput === "" || numBarsInput <= 0) {
      alert("Please make a selection in all three dropdowns.");
      return;
    }

    let chordToSend = startChordInput;
    while (chordToSend === "None") {
      const randomIndex = Math.floor(Math.random() * chordValues.length);
      chordToSend = chordValues[randomIndex].value;
    }

    const toSend = {
      startChord: chordToSend,
      chordDiversity: chordDiversityInput,
      numBars: numBarsInput
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      }
    }
    axios.post(
        "http://localhost:4567/generate",
        toSend,
        config
    )
        .then(response => {
          return response.data;
        })
        .then((data) => {
          console.log("data received!")
          console.log(data);
          setChordProg(data);
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  return (
    <Container className="home-body-container">
      <Center>
        <HStack spacing="160px" my={4}>

          {/* REFACTOR THIS???? */}

          <HStack spacing="80px" w="150">

            {/* fix these colors to be teal, fix night mode colors, fix default values? */}

            <Box w="60">
              <Tooltip
                label="How many bars or measures to generate."
                aria-label="measures tooltip"
                fontSize="sm">
                <Text fontWeight="semibold" my={2} fontSize="lg" color="gray.700"># of Bars</Text>
              </Tooltip>
              <Select options={numBars} placeholder="# of Bars" defaultValue={32}
                      isSearchable={false}  onChange={(event) => {setNumBarsInput(event.value)}}/>
            </Box>

            <Box w="60">
              <Tooltip
                label="Choose a starting chord to generate from."
                aria-label="starting chord tooltip"
                fontSize="sm">
                <Text fontWeight="semibold" my={2} fontSize="lg" color="gray.700">Starting Chord</Text>
              </Tooltip>
              <Select options={chordValues} placeholder="Starting Chord" defaultValue="None"
                      isSearchable={false} onChange={(event) => {setStartChordInput(event.value)}}/>
            </Box>

            <Box w="60">
              <Tooltip
                label="Generate chord progressions with varying levels of complexity and variety."
                aria-label="diversity tooltip"
                fontSize="sm">
                <Text fontWeight="semibold" my={2} fontSize="lg" color="gray.700">Chord Diversity</Text>
              </Tooltip>
              <Select options={chordDiversity} defaultValue="Medium" placeholder="Chord Diversity"
                      isSearchable={false} onChange={(event) => {setChordDiversityInput(event.value)}}/>
            </Box>

          </HStack>

          <Button colorScheme="teal" px={10} mx={5} size="lg" onClick={() => { generateChords() }}>
            Generate!
          </Button>

        </HStack>
      </Center>

      <ResultsBody/>

    </Container>
  )
}
