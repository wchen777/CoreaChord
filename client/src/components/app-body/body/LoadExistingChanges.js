import React, { useState, useEffect } from 'react'
import {
  Flex, Button, Text, useColorModeValue
} from "@chakra-ui/react"
import Select from 'react-select'
import { changes } from '../../../data/ExistingChanges'
import { useChordProgContext } from '../../../context/ChordProgContext'

export default function LoadExistingChanges() {
  const rand = Math.floor(Math.random() * changes.length)
  const [existing, setExisting] = useState(changes[rand].value)
  const {chordProg, setChordProg} = useChordProgContext()
  const labelColor = useColorModeValue('gray.700', 'gray.200')

  useEffect(() => {
    setChordProg(changes[rand].value)
  }, [])

  //TODO copy over any changes in HomeBody.js
  const selectBackgroundColor = useColorModeValue('white', '#1A202C')
  const selectOptionHoverColor = useColorModeValue('#b3d3ff', '#003680')
  const selectBorderColor = useColorModeValue('gray.200', 'gray.700')
  const customSelectStyles = {
    menu: (provided) => ({
      ...provided,
      color: labelColor,
      backgroundColor: selectBackgroundColor,
    }),
    option: (provided, state) => ({
      ...provided,
      color: labelColor,
      backgroundColor: state.isFocused ? selectOptionHoverColor : selectBackgroundColor,
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: selectBackgroundColor,
      borderColor: selectBorderColor,
      boxShadow: "none",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: labelColor,
    }),
    placeHolder: (provided) => ({
      ...provided,
      color: labelColor,
    })
  }

  return (
    <Flex w="60" ml={6} className="side-select" flexDirection="column" justifyContent="flex-start">
      <Text fontWeight="semibold" my={4} fontSize="lg" color={labelColor}>Load Existing Changes <br/> from Popular Songs</Text>

      <Select styles={customSelectStyles} options={changes} placeholder="Existing Changes" isSearchable={false} onChange={(event) => {setExisting(event.value)}} defaultValue={changes[rand]}/>
      
      <Button colorScheme="teal" px={5} mx={12} mt={4} size="md" 
        onClick={() => {existing == null ? alert("Please select changes before loading!") : setChordProg(existing)}}>
        Load
      </Button>

    </Flex>
  )
}
