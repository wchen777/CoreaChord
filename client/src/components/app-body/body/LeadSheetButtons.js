import React, {useEffect, useRef} from 'react'
import {
  Container, HStack, Center, Flex, Button, Tooltip, Box, Text, IconButton
} from "@chakra-ui/react"
import { DownloadIcon } from '@chakra-ui/icons'
import { FaPlay, FaStop } from 'react-icons/fa'
import { Midi as TonalMidi } from "@tonaljs/tonal"
import * as Tone from 'tone'

export default function LeadSheetButtons() {
  const synths = useRef([]);
  const audioShouldBePlaying = useRef(false);
  const curPlayingChordNotes = useRef([]);
  const DELAY = 1.0;

  useEffect(() => {
    // console.log("page loaded");
    // TODO MAXIME test code for turnChordNotesToMidiNums() below, can probably be deleted
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
    // TODO MAXIME fill in this method
    return [];
  }

  /**
   * Plays the audio for the chord progression.
   */
  function playChordProgression() {
    // TODO in the design docs, this is listed as playChordProgression(chordProgression) -- should we change it?
    // TODO MAXIME fill in this method once backend is connected
    // Start up the synths needed to play four-note chords
    audioShouldBePlaying.current = true;
    curPlayingChordNotes.current = [];
    if (synths.current.length === 0) {
      const synth1 = new Tone.Synth().toDestination();
      const synth2 = new Tone.Synth().toDestination();
      const synth3 = new Tone.Synth().toDestination();
      const synth4 = new Tone.Synth().toDestination();
      synths.current = [synth1, synth2, synth3, synth4];
    }
    // const now = Tone.now()
    // TODO MAXIME delete below dummy data once we have proper data
    const DUMMY_CHORDS = [["E3", "G3", "B3", "D3"], ["A3", "C#3", "E3", "G3"], ["C3", "Eb3", "G3", "Bb3"],
      ["F3", "A3", "C3", "Eb3"], ["F3", "Ab3", "C3", "Eb3"], ["Bb3", "D3", "F3", "Ab3"], ["Eb3", "G3", "Bb3", "D3"],
      ["Ab3", "C3", "Eb3", "Gb3"], ["Bb3", "D3", "Fb3", "Ab3"], ["A3", "C#3", "E3", "G3"], ["D3", "F3", "A3", "C3"],
      ["Eb3", "G3", "Bb3", "Db3"], ["F3", "A3", "C3", "E3"], ["A3", "C#3", "E3", "G3"], ["A3", "C3", "E3", "G3"],
      ["D3", "F#3", "A3", "C3"], ["G3", "B3", "D3", "F3"], ["C3", "Eb3", "G3", "Bb3"], ["Ab3", "C3", "Eb3", "Gb3"],
      ["Bb3", "D3", "Fb3", "Ab3"], ["E3", "G3", "B3", "D3"], ["A3", "C#3", "E3", "G3"], ["D3", "F3", "A3", "C3"],
      ["G3", "B3", "D3", "F3"]];
    playChordsSetTimeoutLoop(DUMMY_CHORDS, 0);
    // const DUMMY_LENGTHS = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    //   2, 2, 2, 2, 1, 1, 1, 1];
    // let delaySoFar = now;
    //
    // for(let i = 0; i < DUMMY_CHORDS.length; i++) {
    //   playChord(synths.current, DUMMY_CHORDS[i], (4 / DUMMY_LENGTHS[i]) + "n", delaySoFar);
    //   delaySoFar += (DUMMY_LENGTHS[i] * DELAY);
    // }
  }

  function playChordsSetTimeoutLoop(chordProgression, chordPlaying){
    if (chordPlaying === chordProgression.length) {
      return;
    }
    // TODO MAXIME delete below dummy data once we have proper data
    const DUMMY_LENGTHS = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      2, 2, 2, 2, 1, 1, 1, 1];
    const chordToPlay = chordProgression[chordPlaying];
    const chordNumMeasures = getChordLength(DUMMY_LENGTHS[chordPlaying]); // TODO fill this in properly
    const chordNoteNames = getChordNoteNames(chordToPlay);
    const chordLength = (4 / chordNumMeasures) + "n";
    const lengthOfWait = (chordNumMeasures * DELAY);
    const lengthOfWaitFrames = lengthOfWait * 1000;
    setTimeout(() => {
      if (audioShouldBePlaying.current) {
        const now = Tone.now();
        playChord(synths.current, chordNoteNames, chordLength, now);
        playChordsSetTimeoutLoop(chordProgression, chordPlaying + 1);
      }
    }, lengthOfWaitFrames);
  }

  /**
   * Given a chord, returns a list with the names of all the notes in the chord.
   *
   * @param chord - the chord to be converted to a list of note names
   * @returns {*} - the list of note names in the chord
   */
  function getChordNoteNames(chord) {
    // TODO MAXIME fill in later after we get proper data
    return chord;
  }

  /**
   * Given a chord, returns an integer with the length of the chord, in terms of measures.
   *
   * @param chord - the chord to find the length of
   * @returns {*} - the number of measures the chord lasts
   */
  function getChordLength(chord) {
    // TODO MAXIME fill in later after we get proper data
    return chord;
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
    // if (curPlayingChordNotes.current.length > 0) {
    //   stopPlayingChord(synths, curPlayingChordNotes.current, time);
    // }
    curPlayingChordNotes.current = chordNotes;
    for (let i = 0; i < chordNotes.length; i++) {
      // console.log("playing note " + chordNotes[i]);
      synths[i].triggerAttackRelease(chordNotes[i], length, time);
    }
  }

  function stopPlayingChord(synths, chordNotes, time) {
    // TODO MAXIME connecting this causes an error, but we don't really need it as far as I can tell
    for (let i = 0; i < chordNotes.length; i++) {
      console.log("releasing note " + chordNotes[i] + " at time " + time);
      synths[i].triggerRelease(chordNotes[i], time + (i / 10));
    }
    curPlayingChordNotes.current = [];
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
    // TODO MAXIME fill in this method
    // console.log("stopping audio");
    audioShouldBePlaying.current = false;
  }

  /**
   * Allows the user to download the lead sheet.
   */
  function downloadChordProgression() {
    // TODO MAXIME fill in this method
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

      <IconButton
        colorScheme="red"
        aria-label="stop button"
        size="md"
        py={4}
        icon={<FaStop />}
        onClick={() => {stopAudio()}}
      />

      {/*TODO MAXIME fill in the __ below*/}
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
