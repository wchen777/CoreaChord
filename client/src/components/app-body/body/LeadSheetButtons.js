import React, {useEffect, useRef} from 'react'
import {
  Container, HStack, Center, Flex, Button, Tooltip, Box, Text, IconButton
} from "@chakra-ui/react"
import { DownloadIcon } from '@chakra-ui/icons'
import { FaPlay, FaStop } from 'react-icons/fa'
import { Midi as TonalMidi } from "@tonaljs/tonal"

export default function LeadSheetButtons() {
  // const MIDI = useRef();

  useEffect(() => {
    console.log("page loaded");
    // TODO test code for turnChordNotesToMidiNums() below, can probably be deleted
    // const midiNums = turnChordNotesToMidiNums(["C3", "Eb3", "Gb3"]);
    // console.log(midiNums);

    /*
     * Code for loading MIDI.js javascript files
     * Workaround for using external js files in React from
     * https://www.codegrepper.com/code-examples/javascript/load+external+js+file+in+react
     */
    // const importScriptURLs = ["../../../MIDI.js/inc/shim/Base64.js", "../../../MIDI.js/inc/shim/Base64binary.js",
    //   "../../../MIDI.js/inc/shim/WebAudioAPI.js", "../../../MIDI.js/js/midi/audioDetect.js",
    //   "../../../MIDI.js/js/midi/gm.js", "../../../MIDI.js/js/midi/loader.js",
    //   "../../../MIDI.js/js/midi/plugin.audiotag.js", "../../../MIDI.js/js/midi/plugin.webaudio.js",
    //   "../../../MIDI.js/js/midi/plugin.webmidi.js", "../../../MIDI.js/js/util/dom_request_xhr.js",
    //   "../../../MIDI.js/js/util/dom_request_script.js"];
    // const scriptsToRemove = [];
    //
    // for (let i = 0; i < importScriptURLs.length; i++) {
    //   const script = document.createElement('script');
    //
    //   script.src = importScriptURLs[i];
    //   script.type = "text/javascript";
    //   script.async = true;
    //
    //   document.body.appendChild(script);
    //   scriptsToRemove.push(script);
    // }
    //
    // return () => {
    //   for (let i = 0; i < scriptsToRemove.length; i++) {
    //     document.body.removeChild(scriptsToRemove[i]);
    //   }
    // }
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
    // TODO fill in this method
    console.log("playing audio");

    // TODO below code is from a failed attempt to get MIDI.js to work
    // MIDI.loadPlugin({
    //   soundfontUrl: "../../../soundfont/",
    //   instrument: "acoustic_grand_piano",
    //   onprogress: function(state, progress) {
    //     console.log(state, progress);
    //   },
    //   onsuccess: function() {
    //     let delay = 0; // play one note every quarter second
    //     let note = 50; // the MIDI note
    //     let velocity = 127; // how hard the note hits
    //     // play the note
    //     MIDI.setVolume(0, 127);
    //     MIDI.noteOn(0, note, velocity, delay);
    //     MIDI.noteOff(0, note, delay + 0.75);
    //   }
    // });
    // const chordProgression = getChordProgression();
    // Implementation pathway
    // 1. Get the button to play any sound at all
    // 2. Get the button to play a specific sound
    // 3. Figure out how to layer three sounds together to make a chord
    // 4. Use setTimeout() calls to play a series of chords
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
      {/*TODO delete below code, which is from a failed attempt to get MIDI.js to work*/}
      {/*<script src="../../../MIDI.js/inc/shim/Base64.js" type="text/javascript"/>*/}
      {/*<script src="../../../MIDI.js/inc/shim/Base64binary.js" type="text/javascript"/>*/}
      {/*<script src="../../../MIDI.js/inc/shim/WebAudioAPI.js" type="text/javascript"/>*/}
      {/*<script src="../../../MIDI.js/js/midi/audioDetect.js" type="text/javascript"/>*/}
      {/*<script src="../../../MIDI.js/js/midi/gm.js" type="text/javascript"/>*/}
      {/*<script src="../../../MIDI.js/js/midi/loader.js" type="text/javascript"/>*/}
      {/*<script src="../../../MIDI.js/js/midi/plugin.audiotag.js" type="text/javascript"/>*/}
      {/*<script src="../../../MIDI.js/js/midi/plugin.webaudio.js" type="text/javascript"/>*/}
      {/*<script src="../../../MIDI.js/js/midi/plugin.webmidi.js" type="text/javascript"/>*/}
      {/*<script src="../../../MIDI.js/js/util/dom_request_xhr.js" type="text/javascript"/>*/}
      {/*<script src="../../../MIDI.js/js/util/dom_request_script.js" type="text/javascript"/>*/}

      {/*<script type="text/javascript">*/}
      {/*  MIDI.loadPlugin({*/}
      {/*    soundfontUrl: "../../../soundfont/",*/}
      {/*    instrument: "acoustic_grand_piano",*/}
      {/*    onprogress: function(state, progress) {*/}
      {/*      console.log(state, progress);*/}
      {/*    },*/}
      {/*    onsuccess: function() {*/}
      {/*      var delay = 0; // play one note every quarter second*/}
      {/*      var note = 50; // the MIDI note*/}
      {/*      var velocity = 127; // how hard the note hits*/}
      {/*      // play the note*/}
      {/*      MIDI.setVolume(0, 127);*/}
      {/*      MIDI.noteOn(0, note, velocity, delay);*/}
      {/*      MIDI.noteOff(0, note, delay + 0.75);*/}
      {/*    }*/}
      {/*  });*/}
      {/*</script>*/}

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

      {/*TODO fill in the __ below*/}
      <Tooltip
        label="Download your lead sheet as __ format."
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
