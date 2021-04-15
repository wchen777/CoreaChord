import * as Tone from "tone";
import {voicings} from "./data/ChordVoicings";

export const NUM_MEASURES_PER_BAR = 4;
const CONTINUE_CHORD_REPRESENTATION = " – ";

/**
 * Returns the text representation of a chord, given the chord data.
 *
 * @param chordRendering - all the data corresponding to the chord
 * @returns {string} - the text representation of the desired chord.
 */
export const getChordTextRepresentation = (chordRendering) => {
  const CHORD_QUALITIES = {"DOMINANT7": "7", "MINOR7": "-7", "MAJOR7": "maj7", "MINOR7FLAT5": "-7b5"};
  if (chordRendering === CONTINUE_CHORD_REPRESENTATION) {
    return chordRendering;
  } else {
    const chordQuality = chordRendering["chorddata"]["quality"];
    return chordRendering["chorddata"]["root"] + CHORD_QUALITIES[chordQuality];
  }
}

/**
 * Returns the integer length of the chord, when passed an object containing the data for the chord.
 *
 * @param chordData - all the data corresponding to the chord
 * @returns {int} - the length of the chord, in number of measures
 */
export const getChordMeasureLength = (chordData) => {
  return chordData["chordlength"];
}

/**
 * When passed synths chord data, calls helper functions to get the information it needs to play
 * the chord on the passed synths.
 *
 * @param synths - an array of five synths to play the chord
 * @param chordPlaying - all data for a single chord
 */
export const playChord = (synths, chordPlaying) => {
  const chordNoteNames = getChordNoteNames(chordPlaying);
  const chordLength = (4 / getChordMeasureLength(chordPlaying)) + "n";
  const now = Tone.now();

  if (synths.length < chordNoteNames.length) {
    throw new Error("ERROR!!! Not enough synths to play the chord correctly");
  }
  for (let i = 0; i < chordNoteNames.length; i++) {
    synths[i].triggerAttackRelease(chordNoteNames[i], chordLength, now);
  }
}

/**
 * When passed chord data, uses the chord name to look up the voicing of the chord to play,
 * returning a list of the four or five notes that should be played in the chord.
 *
 * @param chordPlaying - all data for a single chord
 * @returns {*} - a list of String note names such as ["C3", "Bb3", "E4", "A4"]
 */
function getChordNoteNames(chordPlaying) {
  const CHORD_QUALITIES = { "DOMINANT7": "7", "MINOR7": "m7", "MAJOR7": "maj7", "MINOR7FLAT5": "m7b5" };
  const chordQuality = chordPlaying["chorddata"]["quality"];
  const voicingKey = chordPlaying["chorddata"]["root"] + CHORD_QUALITIES[chordQuality];
  return voicings[voicingKey];
}


/**
 * Converts whatever data format the chord progression is stored in into a list of lists of
 * NUM_MEASURES_PER_BAR chords that can be passed to .map().
 * Also adds "–" characters as continuations for when a chord is longer than one measure.
 *
 * @param chordProgression - all chord data
 * @returns {*}
 */
export const getBarList = (chordProgression) => {
  let barList = [[]];
  let curBar = 0;
  let curBarLength = 0;
  for (let i = 0; i < chordProgression.length; i++){
    const chordToAdd = chordProgression[i];
    const chordLength = getChordMeasureLength(chordToAdd);
    barList[curBar].push(chordToAdd);
    curBarLength += chordLength;

    // Add any necessary chord continuation characters
    for (let j = 1; j < chordLength; j++) {
      if (barList[curBar].length < NUM_MEASURES_PER_BAR) {
        barList[curBar].push(CONTINUE_CHORD_REPRESENTATION);
      }
    }

    // Add a new bar, if necessary
    if (curBarLength >= NUM_MEASURES_PER_BAR && (i + 1) < chordProgression.length) {
      barList.push([]);
      curBar++;
      const extraMeasures = curBarLength - NUM_MEASURES_PER_BAR;
      curBarLength = extraMeasures;
      for (let j = 0; j < extraMeasures; j++) {
        barList[curBar].push(CONTINUE_CHORD_REPRESENTATION);
      }
    }
  }
  return barList;
}