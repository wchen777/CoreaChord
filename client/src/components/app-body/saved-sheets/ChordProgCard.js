import React from 'react'
import {
  Image, Box, Badge
} from "@chakra-ui/react"
import clefImg from './clef-transparent.png'
import { useChordProgContext } from '../../../context/ChordProgContext'
import DeleteButton from './DeleteButton'

export default function ChordProgCard({ chordProgData, setShowSaved, forceUpdate, reload, updateState }) {

  const { setChordProg } = useChordProgContext()

  const onChordProgSelect = () => {
    setChordProg(chordProgData.chordProg)
    setShowSaved(false)
  }

  return (
    <div role="button">
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">

        <Box backgroundColor={chordProgData.color ?? "gray.300"} py={3} onClick={() => onChordProgSelect()}>
          <Image src={clefImg} alt="img display" height={150} mx="auto" />
        </Box>

        <Box p="6">
          <Box d="flex" alignItems="baseline" onClick={() => onChordProgSelect()}>
            <Badge borderRadius="full" px="2" colorScheme="teal" ml={2} my={1}>
              Chord Progression
          </Badge>

          </Box>

          <Box
            mt="1"
            onClick={() => onChordProgSelect()}
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            textAlign="left"
            isTruncated
            ml={2}
          >
            {chordProgData.name}
          </Box>

          <Box d="flex" mt="2" alignItems="center" justifyContent='space-between'>

            <Box
              onClick={() => onChordProgSelect()}
              as="span"
              ml="2"
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase">
              {chordProgData.createdAt}
            </Box>

            <DeleteButton id={chordProgData.id} forceUpdate={forceUpdate} reload={reload} updateState={updateState} setShowSaved={setShowSaved}/>
          </Box>
        </Box>
      </Box>
    </div>
  )
}
