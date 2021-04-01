import React from 'react'
import {
  Container, HStack, Center, Flex, Button, Tooltip, Box, Text, IconButton
} from "@chakra-ui/react"
import { DownloadIcon } from '@chakra-ui/icons'
import { FaPlay, FaStop } from 'react-icons/fa'

export default function LeadSheetButtons() {
  return (

    <HStack spacing="70px" mt={12} ml={6}>

      <IconButton
        colorScheme="green"
        aria-label="play button"
        size="md"
        py={4}
        icon={<FaPlay />}
      />

      <IconButton
        colorScheme="red"
        aria-label="stop button"
        size="md"
        py={4}
        icon={<FaStop />}
      />

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
        />
      </Tooltip>

    </HStack>

  )
}
