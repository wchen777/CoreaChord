import React from 'react'
import {
  Flex, Button, Text
} from "@chakra-ui/react"
import Select from 'react-select'

export default function LoadExistingChanges() {
  return (
    <Flex w="60" ml={6} className="side-select" flexDirection="column" justifyContent="flex-start">
      <Text fontWeight="semibold" my={4} fontSize="lg" color="gray.700">Load Existing Changes <br/> from Popular Songs</Text>
      
      <Select options={[{ label: "test", value: "test" }]} placeholder="Existing Changes" isSearchable={false} />
      
      <Button colorScheme="teal" px={5} mx={12} mt={4} size="md" >
        Load
      </Button>

    </Flex>
  )
}
