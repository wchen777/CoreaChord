import React, {useEffect} from 'react'
import {
  Box
} from "@chakra-ui/react"
import './LeadSheet.css'
import {useChordProgContext} from '../../../context/ChordProgContext'

export default function LeadSheet() {
  const DUMMY_DATA = ["E-7", "A7", "C-7", "F7", "F-7", "Bb7", "Ebmaj7", "Ab7", "Bbmaj7", "A7", "D-7", "Eb7", "Fmaj7",
    "A7", "A-7", "D7", "G7", "", "C-7", "", "Ab7", "", "Bbmaj7", "", "E-7", "A7", "D-7", "G7"];
  // TODO: MAXIME delete above line when we have proper data
  const {chordProg, setChordProg} = useChordProgContext();
  const NUM_CHORDS_PER_BAR = 4;

  useEffect(() => {
    setChordProg(DUMMY_DATA);
  }, []);

  // useEffect(() => {
  //   console.log("LeadSheet component loaded");
  //   console.log(chordProg);
  // })

  /**
   * Returns the HTML to display the chord progression.
   *
   * @param chordProgression - the data for the chord progression to be rendered.
   */
  function renderChordProgression(chordProgression) {
    // Get the data formatted as a list of bars, where each bar is a list of chords
    const barList = getBarList(chordProgression);
    return (<div>
      {/*Iterate over bars*/}
      {barList.map(
          (barToRender, barIndex) => {
            return <div className={"barDiv"} key={barIndex}>
              {/*Add the measure number at the start of the bar*/}
              <div className={"measureNumberDiv"}>
                {(barIndex * NUM_CHORDS_PER_BAR) + 1}
              </div>
              {/*Iterate over chords in the bar*/}
              {barToRender.map(
                  (chordToRender, chordIndex) => {
                    return (<div className={"chordTextDiv"} key={chordIndex}>
                      {getChordTextRepresentation(chordToRender)}
                    </div>);
                  }
              )}
            </div>;
          }
      )}
    </div>);
  }

  /**
   * Returns the text representation of a chord, given the chord data.
   *
   * @param chordRendering - all the data corresponding to the chord
   * @returns {string} - the text representation of the desired chord.
   */
  function getChordTextRepresentation(chordRendering) {
    // TODO: MAXIME update when we have proper data
    if (chordRendering === "") {
      return "–";
    } else {
      return chordRendering;
    }
  }

  /**
   * Converts whatever data format the chord progression is stored in into a list of lists of
   * NUM_CHORDS_PER_BAR chords that can be passed to .map().
   *
   * @param chordProgression - all chord data
   * @returns {*}
   */
  function getBarList(chordProgression) {
    // TODO: MAXIME update when we have proper data
    const barList = [];
    for (let i = 0; i < chordProgression.length; i += NUM_CHORDS_PER_BAR){
      barList.push(chordProgression.slice(i, i + NUM_CHORDS_PER_BAR));
    }
    return barList;
  }

  return (
    <Box mx={0} className="lead-sheet" backgroundColor="gray.200">
      {renderChordProgression(chordProg)}
    </Box>
  )
}
