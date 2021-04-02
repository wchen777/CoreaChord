import React, {useState, useEffect, useRef} from 'react'
import {
  Box
} from "@chakra-ui/react"
import './LeadSheet.css'

export default function LeadSheet() {
  const DUMMY_DATA = ["E-7", "A7", "C-7", "F7", "F-7", "Bb7", "Ebmaj7", "Ab7", "Bbmaj7", "A7", "D-7", "Eb7", "Fmaj7",
    "A7", "A-7", "D7", "G7", "", "C-7", "", "Ab7", "", "Bbmaj7", "", "E-7", "A7", "D-7", "G7"];
  // TODO: delete above line when we have proper data
  const [chordProgression, setChordProgression] = useState(DUMMY_DATA);
  // TODO: update above line when we know how we'll be getting the chord progression data
  const NUM_CHORDS_PER_BAR = 4;

  // useEffect(() => {
  //   // Run this once when the component loads!
  // }, []);

  /**
   * Returns the HTML code to display the chord progression.
   *
   * @param chordProgression - the data for the chord progression to be rendered.
   */
  function renderChordProgression(chordProgression) {
    // Determine the number of bars to use
    const numChordsToRender = chordProgression.length;
    let renderedChordProgression = "<div>";
    let barRendering = 0;
    let chordRendering = 0;

    // Render the chords!
    while (chordRendering < numChordsToRender) {
      const barCurrentlyOn = Math.floor(chordRendering / NUM_CHORDS_PER_BAR);
      if (barCurrentlyOn > barRendering) {
        barRendering++;
        // Close the previous bar and add a new bar
        renderedChordProgression += "</div><div class='barDiv'>";
        // Add the measure number to the start of the bar
        renderedChordProgression += "<div class='measureNumberDiv'>" + (chordRendering + 1) + "</div>";
      }
      // Now add the chord to the current bar
      renderedChordProgression += "<div class='chordTextDiv'>"
          + getChordTextRepresentation(chordProgression, chordRendering) + "</div>";
      chordRendering++;
    }

    // Close the current bar
    renderedChordProgression += "</div>";

    // Close the whole wrapper div
    renderedChordProgression += "</div>";
    return renderedChordProgression;
  }

  /**
   * Returns the text representation of a chord, given the data and the chord number to return.
   *
   * @param chordProgression - all chord data
   * @param chordNum - the specific number of the chord to get
   * @returns {string} - the text representation of the desired chord.
   */
  function getChordTextRepresentation(chordProgression, chordNum) {
    // TODO: update when we have proper data
    return chordProgression[chordNum];
  }

  return (
    <Box mx={0} className="lead-sheet" backgroundColor="gray.200">
      {renderChordProgression(chordProgression)}
    </Box>
  )
}
