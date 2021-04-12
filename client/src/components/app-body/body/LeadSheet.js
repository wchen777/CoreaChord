import React from 'react'
import {
  Box,
  useColorModeValue
} from "@chakra-ui/react"
import './LeadSheet.css'
import {useChordProgContext} from '../../../context/ChordProgContext'
import {NUM_MEASURES_PER_BAR, getChordTextRepresentation, getBarList} from '../../../ChordUtils'

export default function LeadSheet() {
  const {chordProg, setChordProg} = useChordProgContext();

  console.log(chordProg)

  const bgColor = useColorModeValue('gray.200', 'gray.700')

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
                {(barIndex * NUM_MEASURES_PER_BAR) + 1}
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

  return (
    <Box mx={0} className="lead-sheet" backgroundColor={bgColor}>
      {renderChordProgression(chordProg)}
    </Box>
  )
}
