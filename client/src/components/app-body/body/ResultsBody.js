import React from 'react'
import {
  Container, HStack, Center, Flex, Button, Tooltip, Box, Text, VStack, Input
} from "@chakra-ui/react"
import LeadSheetButtons from './LeadSheetButtons'
import Select from 'react-select'

export default function ResultsBody() {
  return (

    <VStack>
      <LeadSheetButtons />

      <Center>
        <HStack spacing="60px">

          <Flex w="60" mr={4} className="side-select" flexDirection="column" justifyContent="flex-start">
            <Text fontWeight="semibold" my={2} fontSize="lg" color="gray.700">Progression Name</Text>
            <Input defaultValue="My-Prog-1" placeholder="Progression Name" />
            <Button colorScheme="teal" px={5} mx={8} mt={4} size="md" >
              Save for Later
            </Button>
          </Flex>

          {/* Refactor this into its own component */}
          <Box mx={0} className="lead-sheet" backgroundColor="gray.200">

          </Box>


          <Flex w="60" ml={6} className="side-select" flexDirection="column" justifyContent="flex-start">
            <Text fontWeight="semibold" my={2} fontSize="lg" color="gray.700">Load Existing Changes from Popular Songs</Text>
            <Select options={[{ label: "test", value: "test" }]} placeholder="Existing Changes" isSearchable={false} />
          </Flex>

        </HStack>

      </Center>

    </VStack>


  )
}
