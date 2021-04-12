import React, { useRef } from 'react'
import {
    HStack, Tooltip, IconButton
} from "@chakra-ui/react"
import { DownloadIcon } from '@chakra-ui/icons'
import { FaPlay, FaStop } from 'react-icons/fa'
import * as Tone from 'tone'
import { useChordProgContext } from "../../../context/ChordProgContext";
import { NUM_MEASURES_PER_BAR, getChordTextRepresentation, getChordMeasureLength, getBarList } from '../../../ChordUtils'
import { voicings } from '../../../data/ChordVoicings'

export default function LeadSheetButtons() {
    const synths = useRef([]);
    const audioShouldBePlaying = useRef(false);
    const curPlayingChordNotes = useRef([]);
    const DELAY = 1.0;
    const MAX_CHORD_TEXT_REPRESENTATION_LENGTH = 6;
    const { chordProg, setChordProg } = useChordProgContext();

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

    /**
     * Plays the audio for the chord progression.
     */
    function playChordProgression() {
        // check if chordProg exists
        if (chordProg === {} || chordProg === undefined) return

        // Start up the synths needed to play four-note chords
        audioShouldBePlaying.current = true;
        curPlayingChordNotes.current = [];
        if (synths.current.length === 0) {
            const synth1 = new Tone.Sampler(pianoSample).toDestination();
            const synth2 = new Tone.Sampler(pianoSample).toDestination();
            const synth3 = new Tone.Sampler(pianoSample).toDestination();
            const synth4 = new Tone.Sampler(pianoSample).toDestination();
            const synth5 = new Tone.Sampler(pianoSample).toDestination();
            synths.current = [synth1, synth2, synth3, synth4, synth5];
        }
        playChordsSetTimeoutLoop(chordProg, 0);
    }

    /**
     * Plays one chord of the chord progression, then recursively calls itself in a setTimeout method, to
     * play the rest of the chord progression.
     *
     * @param chordProgression - the chord progression to play
     * @param chordPlaying - the index of the chord that should be played in this step
     */
    function playChordsSetTimeoutLoop(chordProgression, chordPlaying) {
        const chordToPlay = chordProgression[chordPlaying];
        const chordNoteNames = getChordNoteNames(chordToPlay);
        const chordLength = (4 / getChordMeasureLength(chordToPlay)) + "n";
        const chordForLength = chordProgression[Math.max(0, chordPlaying - 1)];
        const lengthOfWait = (getChordMeasureLength(chordForLength) * DELAY);
        const lengthOfWaitFrames = lengthOfWait * 1000;
        setTimeout(() => {
            if (audioShouldBePlaying.current) {
                const now = Tone.now();
                playChord(synths.current, chordNoteNames, chordLength, now);
                // Play the next chord, if there are any left to play!
                if (chordPlaying + 1 < chordProgression.length) {
                    playChordsSetTimeoutLoop(chordProgression, chordPlaying + 1);
                }
            }
        }, lengthOfWaitFrames);
    }

    function getChordNoteNames(chordPlaying) {
        const CHORD_QUALITIES = { "DOMINANT7": "7", "MINOR7": "m7", "MAJOR7": "maj7", "MINOR7FLAT5": "m7b5" };
        const chordQuality = chordPlaying["chorddata"]["quality"];
        const voicingKey = chordPlaying["chorddata"]["root"] + CHORD_QUALITIES[chordQuality];
        console.log(voicingKey);
        console.log(voicings[voicingKey]);
        if (voicings[voicingKey] === undefined) {
            console.log(chordPlaying);
        }
        return voicings[voicingKey];
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

    /**
     * Stops the audio, if it's playing.
     */
    function stopAudio() {
        // TODO this method doesn't stop the audio immediately: only after the current chord is finished playing
        audioShouldBePlaying.current = false;
    }

    // TODO running this causes an error, but we only need it if stopping audio after the current chord isn't good enough
    // function stopPlayingChord(synths, chordNotes, time) {
    //   for (let i = 0; i < chordNotes.length; i++) {
    //     console.log("releasing note " + chordNotes[i] + " at time " + time);
    //     synths[i].triggerRelease(chordNotes[i], time + (i / 10));
    //   }
    //   curPlayingChordNotes.current = [];
    // }

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
        const text = formatChordProgressionAsText(chordProg);
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
                icon={<FaPlay />}
                onClick={() => { playChordProgression() }}
            />

            <IconButton
                colorScheme="red"
                aria-label="stop button"
                size="md"
                py={4}
                icon={<FaStop />}
                onClick={() => { stopAudio() }}
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
                    onClick={() => { downloadChordProgression() }}
                />
            </Tooltip>

        </HStack>

    )
}
