import React from 'react'
import {
  Container, HStack, Center, Flex, Button, Tooltip, Box, Text
} from "@chakra-ui/react"
import Select from 'react-select'

import { numBars, chordDiversity } from '../../../data/GenerateSettings'

export default function HomeBody() {
  return (
    <Container className="home-body-container">
      <Center>
        <HStack spacing="250px" mt={4}>

          {/* REFACTOR THIS???? */}

          <HStack spacing="80px" w="150">

            {/* fix these colors, fix default values? */}


            <Box w="60">
              <Tooltip
                label="How many bars or measures to generate."
                aria-label="measures tooltip"
                fontSize="sm">
                <Text fontWeight="semibold" my={2} fontSize="2xl"># of Bars</Text>
              </Tooltip>
              <Select options={numBars} placeholder="# of Bars" defaultValue={32} isSearchable={false} />
            </Box>




            <Box w="60">
              <Tooltip
                label="Choose a starting chord to generate from."
                aria-label="starting chord tooltip"
                fontSize="sm">
                <Text fontWeight="semibold" my={2} fontSize="2xl">Starting Chord</Text>
              </Tooltip>
              <Select options={[{ value: 'None', label: 'None' }, { value: 'E-7', label: 'E-7' },
              { value: 'A7', label: 'A7' }]} placeholder="Starting Chord" defaultValue="None" isSearchable={false} />
            </Box>



            <Box w="60">
              <Tooltip
                label="Generate chord progressions with varying levels of complexity and variety."
                aria-label="diversity tooltip"
                fontSize="sm">
                <Text fontWeight="semibold" my={2} fontSize="2xl">Chord Diversity</Text>
              </Tooltip>
              <Select options={chordDiversity} defaultValue="Medium" isSearchable={false} />
            </Box>



          </HStack>



          <Button colorScheme="teal" px={10} mx={5} size="lg" >
            Generate!
          </Button>



        </HStack>
      </Center>



    </Container>
  )
}
