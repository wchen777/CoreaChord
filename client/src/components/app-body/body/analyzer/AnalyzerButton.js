import React, { useRef, useState } from 'react'
import axios from 'axios'
import {
  Tooltip,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react"
import { BsGraphUp } from "react-icons/bs";
import AnalyzeResultsModal from './AnalyzeResultsModal';
import { useChordProgContext } from '../../../../context/ChordProgContext'


export default function AnalyzerButton() {

  const { chordProg } = useChordProgContext();

  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef()

  const [analyzedData, setAnalyzedData] = useState()

  const analyze = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      }
    }

    axios.post(
      "http://localhost:4567/analyze",
      chordProg,
      config
    )
      .then((response) => {
        console.log(response)
        let complexities = JSON.parse(response.data.complexities)
        let cadences = JSON.parse(response.data.cadences)

        setAnalyzedData({complexities, cadences})
        onOpen()
      }) 
      .catch(err => console.log(err))

  }

  return (
    <>
      <Tooltip
        label="Analyze your chord progression using our experimental algorithm."
        aria-label="measures tooltip"
        fontSize="sm">
        <IconButton
          colorScheme="purple"
          aria-label="analyzer button"
          size="md"
          py={4}
          icon={<BsGraphUp />}
          onClick={() => analyze()}
        />
      </Tooltip>

      <AnalyzeResultsModal finalRef={finalRef} isOpen={isOpen} onClose={onClose} analyzedData={analyzedData}/>

    </>
  )
}
