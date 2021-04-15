import React, {useRef, useEffect} from 'react'
import {
  HStack, Center, VStack
} from "@chakra-ui/react"
import LeadSheetButtons from './LeadSheetButtons'
import LeadSheet from './LeadSheet'
import SaveProgression from './SaveProgression'
import LoadExistingChanges from './LoadExistingChanges'
import * as Tone from "tone";

export default function ResultsBody() {
  const synths = useRef([]);

  const pianoSample = {
    urls: {
      "C4": "C4.mp3",
      "D#4": "Ds4.mp3",
      "F#4": "Fs4.mp3",
      "A4": "A4.mp3",
    },
    release: 1,
    baseUrl: "https://tonejs.github.io/audio/salamander/",
  }

  const casioSample = {
    urls: {
      A1: "A1.mp3",
      A2: "A2.mp3",
      D2: "D2.mp3",
      G2: "G2.mp3"
    },
    baseUrl: "https://tonejs.github.io/audio/casio/"
  }

  useEffect(() => {
    if (synths.current.length < 5) {
      const synth1 = new Tone.Sampler(pianoSample).toDestination();
      const synth2 = new Tone.Sampler(pianoSample).toDestination();
      const synth3 = new Tone.Sampler(pianoSample).toDestination();
      const synth4 = new Tone.Sampler(pianoSample).toDestination();
      const synth5 = new Tone.Sampler(pianoSample).toDestination();
      synths.current = [synth1, synth2, synth3, synth4, synth5];
    }
  }, [])

  return (

    <VStack>
      <LeadSheetButtons synths={synths.current}/>

      <Center>

        <HStack spacing="60px">

          <SaveProgression />

          <LeadSheet synths={synths.current}/>

          <LoadExistingChanges />

        </HStack>

      </Center>

    </VStack>


  )
}
