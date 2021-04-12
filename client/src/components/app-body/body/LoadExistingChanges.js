import React, { useState, useEffect } from 'react'
import {
  Flex, Button, Text
} from "@chakra-ui/react"
import Select from 'react-select'
import { changes } from '../../../data/ExistingChanges'
import { useChordProgContext } from '../../../context/ChordProgContext'

export default function LoadExistingChanges() {
  const rand = Math.floor(Math.random() * changes.length)

  useEffect(() => {
    setChordProg(changes[rand].value)
  }, [])

  const [existing, setExisting] = useState(null)
  const {chordProg, setChordProg} = useChordProgContext()

  return (
    <Flex w="60" ml={6} className="side-select" flexDirection="column" justifyContent="flex-start">
      <Text fontWeight="semibold" my={4} fontSize="lg" color="gray.700">Load Existing Changes <br/> from Popular Songs</Text>
      
      <Select options={changes} placeholder="Existing Changes" isSearchable={false} onChange={(event) => {setExisting(event.value)}} defaultValue={changes[rand]}/>
      
      <Button colorScheme="teal" px={5} mx={12} mt={4} size="md" 
        onClick={() => {existing == null ? alert("Please select changes before loading!") : setChordProg(existing)}}>
        Load
      </Button>

    </Flex>
  )
}
