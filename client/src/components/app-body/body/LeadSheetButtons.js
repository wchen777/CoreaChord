import React, {useRef} from 'react'
import {
  HStack, Tooltip, IconButton
} from "@chakra-ui/react"
import { DownloadIcon } from '@chakra-ui/icons'
import { FaPlay, FaStop } from 'react-icons/fa'
// import { Midi as TonalMidi } from "@tonaljs/tonal" // TODO No longer need this, since not using MIDI.js
import * as Tone from 'tone'
import {useChordProgContext} from "../../../context/ChordProgContext";

export default function LeadSheetButtons() {
  const synths = useRef([]);
  const audioShouldBePlaying = useRef(false);
  const curPlayingChordNotes = useRef([]);
  const DELAY = 1.0;
  const NUM_CHORDS_PER_BAR = 4;
  const MAX_CHORD_TEXT_REPRESENTATION_LENGTH = 6;
  const {chordProg, setChordProg} = useChordProgContext();

  /**
   * Method to access the chord progression to be played.
   * Written this way for ease of connecting to backend later.
   *
   * @returns {*[]} - all chord progression data
   */
  function getChordProgression() {
    // TODO Will says: it'll be a JSON list of objects with all the data generated from the back end
    //

    // TODO MAXIME fill in this method after connecting to backend
    // const DUMMY_DATA = ["E-7", "A7", "C-7", "F7", "F-7", "Bb7", "Ebmaj7", "Ab7", "Bbmaj7", "A7", "D-7", "Eb7", "Fmaj7",
    //   "A7", "A-7", "D7", "G7", "", "C-7", "", "Ab7", "", "Bbmaj7", "", "E-7", "A7", "D-7", "G7"];
    return chordProg;
  }

  function getLengthOfChordProgression() {
    const DUMMY_DATA = ["E-7", "A7", "C-7", "F7", "F-7", "Bb7", "Ebmaj7", "Ab7", "Bbmaj7", "A7", "D-7", "Eb7", "Fmaj7",
      "A7", "A-7", "D7", "G7", "C-7", "Ab7", "Bbmaj7", "E-7", "A7", "D-7", "G7"];
    return DUMMY_DATA.length;
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
    const chordProgression = getChordProgression();
    playChordsSetTimeoutLoop(chordProgression, 0);
  }

  /**
   * Plays one chord of the chord progression, then recursively calls itself in a setTimeout method, to
   * play the rest of the chord progression.
   *
   * @param chordProgression - the chord progression to play
   * @param chordPlaying - the index of the chord that should be played in this step
   */
  function playChordsSetTimeoutLoop(chordProgression, chordPlaying){
    // const chordToPlay = chordProgression[chordPlaying];
    const chordNoteNames = getChordNoteNames(chordProgression, chordPlaying);
    const chordLength = (4 / getChordMeasures(chordProgression, chordPlaying)) + "n";
    const lengthOfWait = (getChordMeasures(chordProgression, Math.max(0, chordPlaying - 1)) * DELAY);
    const lengthOfWaitFrames = lengthOfWait * 1000;
    setTimeout(() => {
      if (audioShouldBePlaying.current) {
        const now = Tone.now();
        playChord(synths.current, chordNoteNames, chordLength, now);
        // Play the next chord, if there are any left to play!
        if (chordPlaying + 1 < getLengthOfChordProgression()) {
          playChordsSetTimeoutLoop(chordProgression, chordPlaying + 1);
        }
      }
    }, lengthOfWaitFrames);
  }

  /**
   * Given a chord, returns a list with the names of all the notes in the chord.
   *
   * @param chordProgression - the chordProgression that the chord is in
   * @param chordPlaying - the specific index of the chord to be converted to a list of note names
   * @returns {*} - the list of note names in the chord
   */
  function getChordNoteNames(chordProgression, chordPlaying) {
    // TODO MAXIME delete below dummy data and fill in once we have proper data
    const DUMMY_CHORD_NOTES = [["E3", "G3", "B3", "D3"], ["A3", "C#3", "E3", "G3"], ["C3", "Eb3", "G3", "Bb3"],
      ["F3", "A3", "C3", "Eb3"], ["F3", "Ab3", "C3", "Eb3"], ["Bb3", "D3", "F3", "Ab3"], ["Eb3", "G3", "Bb3", "D3"],
      ["Ab3", "C3", "Eb3", "Gb3"], ["Bb3", "D3", "Fb3", "Ab3"], ["A3", "C#3", "E3", "G3"], ["D3", "F3", "A3", "C3"],
      ["Eb3", "G3", "Bb3", "Db3"], ["F3", "A3", "C3", "E3"], ["A3", "C#3", "E3", "G3"], ["A3", "C3", "E3", "G3"],
      ["D3", "F#3", "A3", "C3"], ["G3", "B3", "D3", "F3"], ["C3", "Eb3", "G3", "Bb3"], ["Ab3", "C3", "Eb3", "Gb3"],
      ["Bb3", "D3", "Fb3", "Ab3"], ["E3", "G3", "B3", "D3"], ["A3", "C#3", "E3", "G3"], ["D3", "F3", "A3", "C3"],
      ["G3", "B3", "D3", "F3"]];
    return DUMMY_CHORD_NOTES[chordPlaying];
  }

  /**
   * Given a chord, returns an integer with the length of the chord, in terms of measures.
   *
   * @param chordProgression - the chordProgression that the chord is in
   * @param chordPlaying - the specific index of the chord to find the length of
   * @returns {*} - the number of measures the chord lasts
   */
  function getChordMeasures(chordProgression, chordPlaying) {
    // TODO MAXIME delete below dummy data and fill in once we have proper data
    const DUMMY_LENGTHS = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      2, 2, 2, 2, 1, 1, 1, 1];
    return DUMMY_LENGTHS[chordPlaying];
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
      throw new Error("ERROR!!! Not enough synths to play the chord correctly");
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

  // function stopPlayingChord(synths, chordNotes, time) {
  //   // TODO MAXIME connecting this causes an error, but we don't really need it as far as I can tell
  //   for (let i = 0; i < chordNotes.length; i++) {
  //     console.log("releasing note " + chordNotes[i] + " at time " + time);
  //     synths[i].triggerRelease(chordNotes[i], time + (i / 10));
  //   }
  //   curPlayingChordNotes.current = [];
  // }

  // /**
  //  * Converts a list of chord notes in the form of note names (for example, ["C3", "D#3", "Gb3"])
  //  * into a list of the corresponding MIDI numbers ([48, 51, 54]).
  //  *
  //  * @param chordNotes - a list of chord notes in note name form
  //  * @returns {[]} - a list of chord notes in MIDI number form
  //  */
  // function turnChordNotesToMidiNums(chordNotes) {
  //   // TODO perhaps delete - this was needed back when we were using MIDI.js
  //   let midiNums = [];
  //   for (let chordNote of chordNotes) {
  //     // console.log("converting " + chordNote + " to MIDI number " + Midi.toMidi(chordNote));
  //     midiNums.push(TonalMidi.toMidi(chordNote));
  //   }
  //   return midiNums;
  // }

  /**
   * Stops the audio, if it's playing.
   */
  function stopAudio() {
    // TODO perhaps this wants to be more complicated? It seems to work fine, as of right now.
    // console.log("stopping audio");
    audioShouldBePlaying.current = false;
  }

  /**
   * Allows the user to download the lead sheet.
   */
  function downloadChordProgression() {
    // TODO MAXIME use PDFs instead of TXTs
    /*
     * Code in this snippet adapted from:
     * https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-
     * not-through-server
     */
    const filename = "lead-sheet.txt";
    const chordProgression = getChordProgression();
    const text = formatChordProgressionAsText(chordProgression);
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  /**
   * Returns a text string that nicely formats the chord progression for a txt file for download.
   *
   * @param chordProgression - all the data for the chordProgression to format
   * @returns {string} - the string representation of the chord progression, ready to download
   */
  function formatChordProgressionAsText(chordProgression) {
    let textRepresentation = "Your Chord Progression:";
    for (let i = 0; i < chordProgression.length; i++) {
      if (i % NUM_CHORDS_PER_BAR === 0) {
        // Add a new bar and a measure number at the start
        textRepresentation += "\n " + (i + 1);
        // Add some padding so the text will line up nicely
        if (i < 100) {
          textRepresentation += " ";
          if (i < 10) {
            textRepresentation += " ";
          }
        }
      }
      const chordTextRepresentation = getChordTextRepresentation(chordProgression[i]);
      textRepresentation += "     " + chordTextRepresentation;
      // Add some padding so the text will line up nicely
      for (let j = 0; j < (MAX_CHORD_TEXT_REPRESENTATION_LENGTH - chordTextRepresentation.length); j++) {
        textRepresentation += " ";
      }
      textRepresentation += "  |";
    }
    return textRepresentation;
  }

  /**
   * Returns the text representation of a chord, given the chord data.
   *
   * @param chordRendering - all the data corresponding to the chord
   * @returns {string} - the text representation of the desired chord.
   */
  function getChordTextRepresentation(chordRendering) {
    // TODO MAXIME update when we have proper data
    if (chordRendering === "") {
      return "–";
    } else {
      return chordRendering;
    }
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

      {/*TODO MAXIME swap out the .txt for .pdf when you implement that*/}
      <Tooltip
        label="Download your lead sheet as .txt format."
        aria-label="measures tooltip"
        fontSize="sm">
        <IconButton
          colorScheme="blue"
          aria-label="download button"
          size="md"
          py={4}
          icon={<DownloadIcon />}
          onClick={() => {downloadChordProgression()}}
        />
      </Tooltip>

    </HStack>

  )
}
