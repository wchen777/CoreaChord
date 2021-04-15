import React, {useRef, useEffect} from 'react'
import {
  HStack, Tooltip, IconButton
} from "@chakra-ui/react"
import {DownloadIcon} from '@chakra-ui/icons'
import {FaPlay, FaStop} from 'react-icons/fa'
import {useChordProgContext} from "../../../context/ChordProgContext";
import {
  NUM_MEASURES_PER_BAR, getChordTextRepresentation, getChordMeasureLength, getBarList, playChord
} from '../../../ChordUtils'

export default function LeadSheetButtons(props) {
  const audioShouldBePlaying = useRef(false);
  const DELAY = 1.0;
  const MAX_CHORD_TEXT_REPRESENTATION_LENGTH = 6;
  const FIRST_CHORD_PLAYING_WAIT_FRAMES = 500;
  const {chordProg, setChordProg} = useChordProgContext();

  useEffect(() => {
      audioShouldBePlaying.current = false;
  })

  /**
   * Plays the audio for the chord progression.
   */
  function playChordProgression(chordProgression, startIndex) {
    // check if chordProg exists
    if (chordProgression === {} || chordProgression === undefined) return

    audioShouldBePlaying.current = true;
    playChordsSetTimeoutLoop(chordProgression, startIndex);
    highlightChordsSetTimeoutLoop(chordProgression, startIndex);
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
      const lengthOfWait = (getChordMeasureLength(chordForLength) * DELAY);
      lengthOfWaitFrames = lengthOfWait * 1000; // 1000 milliseconds per second
    }
    setTimeout(() => {
      if (audioShouldBePlaying.current) {
        playChord(props.synths, chordPlaying);
        // Play the next chord, if there are any left to play!
        if (chordPlayingIndex + 1 < chordProgression.length) {
          playChordsSetTimeoutLoop(chordProgression, chordPlayingIndex + 1);
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
      // We only want to wait one measure, one DELAY in between highlighting chords
      lengthOfWaitFrames = DELAY * 1000;
    }
    setTimeout(() => {
      if (audioShouldBePlaying.current && (chordPlayingIndex + 1) < chordProgressionNumMeasures) {
        if (chordPlayingIndex > 0) {
          document.getElementById("chordBox" + (chordPlayingIndex - 1))
              .classList.remove("chordHighlighted");
        }
        document.getElementById("chordBox" + chordPlayingIndex).classList.add("chordHighlighted");
        highlightChordsSetTimeoutLoop(chordProgression, chordPlayingIndex + 1);
      } else {
        if (chordPlayingIndex > 0) {
          document.getElementById("chordBox" + (chordPlayingIndex - 1))
              .classList.remove("chordHighlighted");
        }
      }
    }, lengthOfWaitFrames);
  }

  /**
   * Stops the audio, if it's playing.
   */
  function stopAudio() {
    audioShouldBePlaying.current = false;
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

        <Tooltip
            label="Download your lead sheet as .txt format."
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
