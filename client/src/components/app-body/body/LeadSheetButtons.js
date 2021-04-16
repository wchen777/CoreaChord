import React, {useRef, useEffect, useState} from 'react'
import {
  HStack, Tooltip, IconButton, Input, Text, useColorModeValue
} from "@chakra-ui/react"
import {DownloadIcon} from '@chakra-ui/icons'
import {FaPlay, FaStop} from 'react-icons/fa'
import {useChordProgContext} from "../../../context/ChordProgContext";
import {
  NUM_MEASURES_PER_BAR, getChordTextRepresentation, getChordMeasureLength, getBarList, playChord
} from '../../../ChordUtils'
import * as Tone from "tone";

export default function LeadSheetButtons({synths}) {
  const audioShouldBePlaying = useRef(false);
  const componentMounted = useRef(true);
  const MAX_CHORD_TEXT_REPRESENTATION_LENGTH = 6;
  const FIRST_CHORD_PLAYING_WAIT_FRAMES = 500;
  const {chordProg, setChordProg} = useChordProgContext();
  const [BPM, setBPM] = useState(60);
  const measureLengthInSeconds = 60 / BPM;
  const GAP_LENGTH_FACTOR = 1.1;
  const audioPlayingTimeout = useRef(null);
  const chordHighlightingTimeout = useRef(null);
  const lastHighlightedChordIndex = useRef(null);
  /*
   * The above factor determines how much of an audible gap there will be between chords being played.
   * Higher values result in a longer gap, while values closer to 1.0 result in little to no gap.
   */
  const labelColor = useColorModeValue('gray.700', 'gray.200')

  useEffect(() => {
      audioShouldBePlaying.current = false;
      componentMounted.current = true;

      return () => {
        componentMounted.current = false;
        // When component unmounts, audio should stop, as well
        audioShouldBePlaying.current = false;
      }
  })

  // Play and pause when space bar is pressed
  document.body.onkeypress = function(e){
    if(e.keyCode === 32){
      e.stopPropagation()
      if (audioShouldBePlaying.current) {
        stopAudio();
      } else {
        playChordProgression(chordProg, 0);
      }
      return false;
    }
  }

  /**
   * Plays the audio for the chord progression.
   */
  function playChordProgression(chordProgression, startIndex) {
    // check if chordProg exists
    if (chordProgression === {} || chordProgression === undefined) return

    if (isNaN(BPM)) {
      alert("Please input a number for BPM.");
      return;
    } else if (BPM <= 0) {
      alert("Please input a positive value for BPM.");
      return;
    }

    // Start playing the audio
    if (!audioShouldBePlaying.current) {
      audioShouldBePlaying.current = true;
      Tone.Transport.bpm.value = Math.floor(BPM * GAP_LENGTH_FACTOR);
      playChordsSetTimeoutLoop(chordProgression, startIndex);
      highlightChordsSetTimeoutLoop(chordProgression, startIndex);
    }
  }

  /**
   * Plays one chord of the chord progression, then recursively calls itself in a setTimeout method, to
   * play the rest of the chord progression.
   *
   * @param chordProgression - the chord progression to play
   * @param chordPlayingIndex - the index of the chord that should be played in this step
   */
  function playChordsSetTimeoutLoop(chordProgression, chordPlayingIndex) {
    const chordPlaying = chordProgression[chordPlayingIndex];
    let lengthOfWaitFrames;
    if (chordPlayingIndex === 0) {
      lengthOfWaitFrames = FIRST_CHORD_PLAYING_WAIT_FRAMES;
      // this may cause a "buffer is not set or loaded" glitch on slow computers
    } else {
      const chordForLength = chordProgression[chordPlayingIndex - 1];
      const lengthOfWait = (getChordMeasureLength(chordForLength) * measureLengthInSeconds);
      lengthOfWaitFrames = lengthOfWait * 1000; // 1000 milliseconds per second
    }
    audioPlayingTimeout.current = setTimeout(() => {
      if (audioShouldBePlaying.current) {
        playChord(synths, chordPlaying);
        // Play the next chord, if there are any left to play!
        if (chordPlayingIndex + 1 < chordProgression.length) {
          playChordsSetTimeoutLoop(chordProgression, chordPlayingIndex + 1);
        } else {
          // after playing the last chord, wait for a bit, and then officially stop the audio
          audioPlayingTimeout.current = setTimeout(() => {
            stopAudio()
          }, lengthOfWaitFrames + FIRST_CHORD_PLAYING_WAIT_FRAMES)
        }
      }
    }, lengthOfWaitFrames);
  }

  /**
   * Recursive setTimeout function that highlights chords in rhythm as the chord progression is played.
   *
   * @param chordProgression - the chord progression being played
   * @param chordPlayingIndex - the index of the measure that should be played in this step
   */
  function highlightChordsSetTimeoutLoop(chordProgression, chordPlayingIndex) {
    // Get the length of the chordProgression
    let chordProgressionNumMeasures = 0;
    for (let chord of chordProgression) {
      chordProgressionNumMeasures += getChordMeasureLength(chord);
    }

    let lengthOfWaitFrames;
    if (chordPlayingIndex === 0) {
      lengthOfWaitFrames = FIRST_CHORD_PLAYING_WAIT_FRAMES;
    } else {
      // We only want to wait one measure in between highlighting chords
      lengthOfWaitFrames = measureLengthInSeconds * 1000;
    }
    chordHighlightingTimeout.current = setTimeout(() => {
      if (audioShouldBePlaying.current) {
        // Unhighlight the last chord
        unhighlightPreviousChord();
        // Highlight the currently-playing chord
        document.getElementById("chordBox" + chordPlayingIndex).classList.add("chordHighlighted");
        lastHighlightedChordIndex.current = chordPlayingIndex;

        // Recurse to highlight the next chord, if there are any left to highlight!
        if ((chordPlayingIndex + 1) < chordProgressionNumMeasures) {
          highlightChordsSetTimeoutLoop(chordProgression, chordPlayingIndex + 1);
        } else {
          // We reached the end! Set the timeout to unhighlight the last chord
          chordHighlightingTimeout.current = setTimeout(() => {
            if (componentMounted.current) {
              unhighlightPreviousChord();
            }
          }, lengthOfWaitFrames)
        }
      } else {
        // In the event that we've stopped playing, just unhighlight the last chord
        if (chordPlayingIndex > 0) {
          unhighlightPreviousChord()
        }
      }
    }, lengthOfWaitFrames);
  }

  function unhighlightPreviousChord() {
    if (componentMounted.current && lastHighlightedChordIndex.current !== null) {
      document.getElementById("chordBox" + lastHighlightedChordIndex.current)
          .classList.remove("chordHighlighted");
    }
    lastHighlightedChordIndex.current = null;
  }

  /**
   * Stops the audio, if it's playing.
   */
  function stopAudio() {
    audioShouldBePlaying.current = false;
    clearTimeout(audioPlayingTimeout.current);
    clearTimeout(chordHighlightingTimeout.current);
    unhighlightPreviousChord();
  }

  /**
   * Allows the user to download the lead sheet.
   */
  function downloadChordProgression(chordProgression) {
    /*
     * Code in this snippet adapted from:
     * https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-
     * not-through-server
     */
    const filename = "lead-sheet.txt";
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
    const barList = getBarList(chordProgression);

    let textRepresentation = "Your Chord Progression:";
    for (let bar = 0; bar < barList.length; bar++) {
      const measureNumber = (NUM_MEASURES_PER_BAR * bar) + 1;
      // Add a new bar and a measure number at the start
      textRepresentation += "\n " + measureNumber;
      // Add some padding so the text will line up nicely
      if (measureNumber < 100) {
        textRepresentation += " ";
        if (measureNumber < 10) {
          textRepresentation += " ";
        }
      }

      for (let chord of barList[bar]) {
        const chordTextRepresentation = getChordTextRepresentation(chord);
        textRepresentation += "     " + chordTextRepresentation;
        // Add some padding so the text will line up nicely
        for (let j = 0; j < (MAX_CHORD_TEXT_REPRESENTATION_LENGTH - chordTextRepresentation.length); j++) {
          textRepresentation += " ";
        }
        textRepresentation += "  |";
      }
    }
    return textRepresentation;
  }

  return (
      <HStack spacing="70px" mt={12} ml={6}>

        <Tooltip
            label="Start audio"
            aria-label="play button"
            fontSize="sm">
          <IconButton
              colorScheme="green"
              aria-label="play button"
              size="md"
              py={4}
              icon={<FaPlay/>}
              onClick={() => {
                playChordProgression(chordProg, 0)
              }}
          />
        </Tooltip>

        <div>
          <Text as="span" fontWeight="semibold" my={2} fontSize="lg" color={labelColor}>BPM: </Text>
          <Tooltip
              label="Input the BPM for playback"
              aria-label="chord playback BPM"
              fontSize="sm">
            <Input defaultValue="60" placeholder="BPM" w="16"
                   onChange={(e) => setBPM(e.target.value)}/>
          </Tooltip>
        </div>

        <Tooltip
            label="Stop audio"
            aria-label="stop button"
            fontSize="sm">
          <IconButton
              colorScheme="red"
              aria-label="stop button"
              size="md"
              py={4}
              icon={<FaStop/>}
              onClick={() => {
                stopAudio()
              }}
          />
        </Tooltip>

        <Tooltip
            label="Download your lead sheet as .txt format"
            aria-label="measures tooltip"
            fontSize="sm">
          <IconButton
              colorScheme="blue"
              aria-label="download button"
              size="md"
              py={4}
              icon={<DownloadIcon/>}
              onClick={() => {
                downloadChordProgression(chordProg)
              }}
          />
        </Tooltip>

      </HStack>

  )
}
