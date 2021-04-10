import React from 'react'
import {
  Container, HStack, Center, Flex, Button, Tooltip, Box, Text
} from "@chakra-ui/react"
import Select from 'react-select'
import axios from 'axios'
import {useChordProgContext} from '../../../context/ChordProgContext'

import { numBars, chordDiversity } from '../../../data/GenerateSettings'

import ResultsBody from './ResultsBody'

export default function HomeBody() {
  const {chordProg, setChordProg} = useChordProgContext();

  /**
   * Makes an axios request to generate a set of chords based on the current settings.
   */
  function generateChords() {
    const toSend = { // TODO update these post parameters with data from the page input elements
      startChord: "A7",
      chordDiversity: "Medium",
      numBars: 32
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
          setChordProg(data); // TODO something may need to be changed here
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
              <Select options={numBars} placeholder="# of Bars" defaultValue={32} isSearchable={false} />
            </Box>

            <Box w="60">
              <Tooltip
                label="Choose a starting chord to generate from."
                aria-label="starting chord tooltip"
                fontSize="sm">
                <Text fontWeight="semibold" my={2} fontSize="lg" color="gray.700">Starting Chord</Text>
              </Tooltip>
              <Select options={[{ value: 'None', label: 'None' }, { value: 'E-7', label: 'E-7' },
              { value: 'A7', label: 'A7' }]} placeholder="Starting Chord" defaultValue="None" isSearchable={false} />
            </Box>

            <Box w="60">
              <Tooltip
                label="Generate chord progressions with varying levels of complexity and variety."
                aria-label="diversity tooltip"
                fontSize="sm">
                <Text fontWeight="semibold" my={2} fontSize="lg" color="gray.700">Chord Diversity</Text>
              </Tooltip>
              <Select options={chordDiversity} defaultValue="Medium" placeholder="Chord Diversity" isSearchable={false} />
            </Box>

          </HStack>

          <Button colorScheme="teal" px={10} mx={5} size="lg" onClick={() => {generateChords()}}>
            Generate!
          </Button>

        </HStack>
      </Center>

      <ResultsBody/>

    </Container>
  )
}
