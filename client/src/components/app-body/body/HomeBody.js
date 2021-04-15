import React, { useState } from 'react'
import {
  Container, HStack, Center, Button, Tooltip, Box, Text, useColorModeValue
} from "@chakra-ui/react"
import Select from 'react-select'
import axios from 'axios'
import { useChordProgContext } from '../../../context/ChordProgContext'

import { numBars, chordDiversity, chordValues } from '../../../data/GenerateSettings'

import ResultsBody from './ResultsBody'

export default function HomeBody({ synths }) {
  const labelColor = useColorModeValue('gray.700', 'gray.200')
  const { chordProg, setChordProg } = useChordProgContext();
  const [startChordInput, setStartChordInput] = useState("None");
  const [chordDiversityInput, setChordDiversityInput] = useState("Medium");
  const [numBarsInput, setNumBarsInput] = useState(32);
  const [loading, setLoading] = useState(false)


  const selectBackgroundColor = useColorModeValue('white', '#1A202C')
  const selectOptionHoverColor = useColorModeValue('#b3d3ff', '#003680')
  const selectBorderColor = useColorModeValue('gray.200', 'gray.700')
  const customSelectStyles = {
    menu: (provided) => ({
      ...provided,
      color: labelColor,
      backgroundColor: selectBackgroundColor,
      fontSize: "medium",
    }),
    option: (provided, state) => ({
      ...provided,
      color: labelColor,
      backgroundColor: state.isFocused ? selectOptionHoverColor : selectBackgroundColor,
    }),
    // TODO possibly change the color of the shadow highlight around the box to white,
    //  possibly change the color of the indicatorSeparator or the dropdown arrow
    //  https://react-select.com/components#replaceable-components
    control: (provided, state) => ({
      ...provided,
      backgroundColor: selectBackgroundColor,
      borderColor: selectBorderColor,
      boxShadow: "none",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: labelColor,
      fontSize: "medium",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: labelColor,
      fontSize: "medium",
    })
  }

  /**
   * Makes an axios request to generate a set of chords based on the current settings.
   */
  function generateChords() {
    setLoading(true)
    if (startChordInput === "" || chordDiversityInput === "" || numBarsInput <= 0) {
      alert("Please make a selection in all three dropdowns.");
      setLoading(false)
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
        // console.log(data);
        setChordProg(data);
        setLoading(false)
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false)
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
                <Text fontWeight="semibold" my={2} fontSize="lg" color={labelColor}># of Bars</Text>
              </Tooltip>
              <Select styles={customSelectStyles} options={numBars} placeholder="# of Bars" defaultValue={{label: 32, value: 32}}
                isSearchable={false} onChange={(event) => { setNumBarsInput(event.value) }} />
            </Box>

            <Box w="60">
              <Tooltip
                label="Choose a starting chord to generate from."
                aria-label="starting chord tooltip"
                fontSize="sm">
                <Text fontWeight="semibold" my={2} fontSize="lg" color={labelColor}>Starting Chord</Text>
              </Tooltip>
              <Select styles={customSelectStyles} options={chordValues} placeholder="Starting Chord"
                isSearchable={false} onChange={(event) => { setStartChordInput(event.value) }} defaultValue={{label: "None", value: "None"}} />
            </Box>

            <Box w="60">
              <Tooltip
                label="Generate chord progressions with varying levels of complexity and variety."
                aria-label="diversity tooltip"
                fontSize="sm">
                <Text fontWeight="semibold" my={2} fontSize="lg" color={labelColor}>Chord Diversity</Text>
              </Tooltip>
              <Select styles={customSelectStyles} options={chordDiversity} defaultValue={{label: "Medium", value: "Medium"}} placeholder="Chord Diversity"
                isSearchable={false} onChange={(event) => { setChordDiversityInput(event.value) }} />
            </Box>

          </HStack>

          <Button colorScheme="teal" px={10} mx={5} size="lg" onClick={() => { generateChords() }} isLoading={loading}>
            Generate!
          </Button>

        </HStack>
      </Center>

      <ResultsBody synths={synths} />

    </Container>
  )
}
