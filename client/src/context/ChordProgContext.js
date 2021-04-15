import React, { useContext, createContext, useState} from 'react'

const ChordProgContext = createContext()

// provider wrapper for context
export const ChordProgContextProvider = ( {children} ) => {
  const [chordProg, setChordProg] = useState([])

  return <ChordProgContext.Provider value={{chordProg, setChordProg}} > {children} </ChordProgContext.Provider>
}

// allows children to have global access to the context state
export const useChordProgContext = () => useContext(ChordProgContext)