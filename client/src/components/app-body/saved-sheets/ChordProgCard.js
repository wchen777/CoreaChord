import React from 'react'
import {
  Image, Box, Badge
} from "@chakra-ui/react"
import clefImg from './clef-transparent.png'
import { useChordProgContext } from '../../../context/ChordProgContext'

export default function ChordProgCard({ chordProgData, setShowSaved }) {

  const { setChordProg } = useChordProgContext()

  const onChordProgSelect = () => {
    setChordProg(chordProgData.chordProg)
    setShowSaved(false)
  }

  return (
    <div role="button">
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" onClick={() => onChordProgSelect()}>

        <Box backgroundColor={chordProgData.color ?? "gray.300"} py={3}>
          <Image src={clefImg} alt="img display" height={150} mx="auto" />
        </Box>

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal" ml={2} my={1}>
              Chord Progression
          </Badge>

          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            textAlign="left"
            isTruncated
            ml={2}
          >
            {chordProgData.name}
          </Box>

          <Box d="flex" mt="2" alignItems="center">

            <Box
              as="span"
              ml="2"
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase">
              {chordProgData.createdAt}
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  )
}
