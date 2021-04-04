import React, {useEffect, useRef} from 'react'
import {
  Container, HStack, Center, Flex, Button, Tooltip, Box, Text, IconButton
} from "@chakra-ui/react"
import { DownloadIcon } from '@chakra-ui/icons'
import { FaPlay, FaStop } from 'react-icons/fa'
import { Midi as TonalMidi } from "@tonaljs/tonal"
import * as Tone from 'tone'

export default function LeadSheetButtons() {
  // const MIDI = useRef();

  useEffect(() => {
    console.log("page loaded");
    // TODO test code for turnChordNotesToMidiNums() below, can probably be deleted
    // const midiNums = turnChordNotesToMidiNums(["C3", "Eb3", "Gb3"]);
    // console.log(midiNums);
  }, [ ]);

  /**
   * Method to access the chord progression to be played.
   * Written this way for ease of connecting to backend later.
   *
   * @returns {*[]} - all chord progression data
   */
  function getChordProgression() {
    // TODO fill in this method
    return [];
  }

  /**
   * Plays the audio for the chord progression.
   */
  function playChordProgression() {
    // TODO in the design docs, this is listed as playChordProgression(chordProgression) -- should we change it?
    // TODO fill in this method once backend is connected
    // Start up the synths needed to play four-note chords
    const synth1 = new Tone.Synth().toDestination();
    const synth2 = new Tone.Synth().toDestination();
    const synth3 = new Tone.Synth().toDestination();
    const synth4 = new Tone.Synth().toDestination();
    const synths = [synth1, synth2, synth3, synth4];
    const now = Tone.now()
    // TODO delete below dummy data once we have proper data
    const DELAY = 1.0;
    const DUMMY_CHORDS = [["E3", "G3", "B3", "D3"], ["A3", "C#3", "E3", "G3"], ["C3", "Eb3", "G3", "Bb3"],
      ["F3", "A3", "C3", "Eb3"], ["F3", "Ab3", "C3", "Eb3"], ["Bb3", "D3", "F3", "Ab3"], ["Eb3", "G3", "Bb3", "D3"],
      ["Ab3", "C3", "Eb3", "Gb3"], ["Bb3", "D3", "Fb3", "Ab3"], ["A3", "C#3", "E3", "G3"], ["D3", "F3", "A3", "C3"],
      ["Eb3", "G3", "Bb3", "Db3"], ["F3", "A3", "C3", "E3"], ["A3", "C#3", "E3", "G3"], ["A3", "C3", "E3", "G3"],
      ["D3", "F#3", "A3", "C3"], ["G3", "B3", "D3", "F3"], ["C3", "Eb3", "G3", "Bb3"], ["Ab3", "C3", "Eb3", "Gb3"],
      ["Bb3", "D3", "Fb3", "Ab3"], ["E3", "G3", "B3", "D3"], ["A3", "C#3", "E3", "G3"], ["D3", "F3", "A3", "C3"],
      ["G3", "B3", "D3", "F3"]];
    const DUMMY_LENGTHS = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      2, 2, 2, 2, 1, 1, 1, 1];
    let delaySoFar = now;

    for(let i = 0; i < DUMMY_CHORDS.length; i++) {
      playChord(synths, DUMMY_CHORDS[i], (4 / DUMMY_LENGTHS[i]) + "n", delaySoFar);
      delaySoFar += (DUMMY_LENGTHS[Math.max(0, i - 1)] * DELAY);
    }
  }

  function getChordNoteNames(chord) {
    // TODO fill in later after we get proper data
    const DUMMY_CHORDS = [["C3", "D#3", "Gb3"], ["C3", "E3", "Gb3"], ["C3", "E3", "G3"], ["C3", "Eb3", "G3"]];
    const chord_to_choose = Math.floor(Math.random() * DUMMY_CHORDS.length);
    return DUMMY_CHORDS[chord_to_choose];
  }

  /**
   * Plays a given chord on a passed list of synths.
   *
   * @param synths - list of synth players - expects to be the same length as the number of notes in the chord
   * @param chordNotes - list of chord notes in note name form
   * @param length - how long the note should be played for
   * @param time - when this note should be played
   */
  function playChord(synths, chordNotes, length, time) {
    if (synths.length < chordNotes.length) {
      throw "ERROR!!! Not enough synths to play the chord correctly";
    }
    for (let i = 0; i < chordNotes.length; i++) {
      synths[i].triggerAttackRelease(chordNotes[i], length, time);
    }
  }

  /**
   * Converts a list of chord notes in the form of note names (for example, ["C3", "D#3", "Gb3"])
   * into a list of the corresponding MIDI numbers ([48, 51, 54]).
   *
   * @param chordNotes - a list of chord notes in note name form
   * @returns {[]} - a list of chord notes in MIDI number form
   */
  function turnChordNotesToMidiNums(chordNotes) {
    let midiNums = [];
    for (let chordNote of chordNotes) {
      // console.log("converting " + chordNote + " to MIDI number " + Midi.toMidi(chordNote));
      midiNums.push(TonalMidi.toMidi(chordNote));
    }
    return midiNums;
  }

  /**
   * Stops the audio, if it's playing.
   */
  function stopAudio() {
    // TODO fill in this method
    console.log("stopping audio");
  }

  /**
   * Allows the user to download the lead sheet.
   */
  function downloadChordProgression() {
    // TODO fill in this method
    console.log("downloading lead sheet")
    // Implementation pathway
    // 1. Get the button to download ANYTHING when clicked
    // 2. Figure out how to download specific, generated files
    // 3. Fill in the data in the file
  }

  return (
    <HStack spacing="70px" mt={12} ml={6}>

      <IconButton
        colorScheme="green"
        aria-label="play button"
        size="md"
        py={4}
        icon={<FaPlay />}
        onClick={() => {playChordProgression()}}
      />

      {/*TODO uncomment below lines of code when we're ready to deal with them*/}
      {/* they were lagging my Intellij error checking*/}
      {/*<IconButton*/}
      {/*  colorScheme="red"*/}
      {/*  aria-label="stop button"*/}
      {/*  size="md"*/}
      {/*  py={4}*/}
      {/*  icon={<FaStop />}*/}
      {/*  onClick={() => {stopAudio()}}*/}
      {/*/>*/}

      {/*TODO fill in the __ below*/}
      {/*<Tooltip*/}
      {/*  label="Download your lead sheet as __ format."*/}
      {/*  aria-label="measures tooltip"*/}
      {/*  fontSize="sm">*/}
      {/*  <IconButton*/}
      {/*    colorScheme="blue"*/}
      {/*    aria-label="download button"*/}
      {/*    size="md"*/}
      {/*    py={4}*/}
      {/*    icon={<DownloadIcon />}*/}
      {/*    onClick={() => {downloadChordProgression()}}*/}
      {/*  />*/}
      {/*</Tooltip>*/}

    </HStack>

  )
}
