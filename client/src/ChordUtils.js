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