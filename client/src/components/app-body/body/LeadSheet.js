import React from 'react'
import {
  Box, Tooltip,
  useColorModeValue
} from "@chakra-ui/react"
import './LeadSheet.css'
import {useChordProgContext} from '../../../context/ChordProgContext'
import {NUM_MEASURES_PER_BAR, CONTINUE_CHORD_REPRESENTATION, getChordTextRepresentation, getBarList, playChord} from '../../../ChordUtils'

export default function LeadSheet(props) {
  const {chordProg, setChordProg} = useChordProgContext();

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
                    if (chordToRender !== CONTINUE_CHORD_REPRESENTATION) {
                      return (<div id={"chordBox" + ((barIndex * NUM_MEASURES_PER_BAR) + chordIndex)}
                                   className={"chordTextDiv clickable"} key={chordIndex}
                                   onMouseDown={() => {playChord(props.synths, chordToRender)}}>
                        {getChordTextRepresentation(chordToRender)}
                          {console.log(chordProg)}
                      </div>);
                    } else {
                      return (<div id={"chordBox" + ((barIndex * NUM_MEASURES_PER_BAR) + chordIndex)}
                                   className={"chordTextDiv"} key={chordIndex}>
                        {getChordTextRepresentation(chordToRender)}
                      </div>);
                    }
                  }
              )}
            </div>;
          }
      )}
    </div>);
  }

  return (
      <Tooltip
          label="Click a chord to hear what it sounds like!"
          aria-label="measures tooltip"
          fontSize="sm"
          className={"tooltip"}>
        <Box mx={0} className="lead-sheet" backgroundColor={bgColor}>
          {renderChordProgression(chordProg)}
        </Box>
      </Tooltip>
  )
}
