import React from 'react'
import {
  Flex, Button, Text, Input, useColorModeValue
} from "@chakra-ui/react"

export default function SaveProgression() {
  const labelColor = useColorModeValue('gray.700', 'gray.200')

  return (
    <Flex w="60" mr={4} className="side-select" flexDirection="column" justifyContent="flex-start">

      <Text fontWeight="semibold" my={4} fontSize="lg" color={labelColor}>Progression Name</Text>

      <Input defaultValue="My-Prog-1" placeholder="Progression Name" />

      <Button colorScheme="teal" px={5} mx={8} mt={4} size="md" >
        Save for Later
      </Button>
    </Flex>
  )
}
