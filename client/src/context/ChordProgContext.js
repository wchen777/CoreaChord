import React, { useContext, createContext, useState, useMemo } from 'react'

const ChordProgContext = createContext()

// provider wrapper for context
export const ChordProgContextProvider = ( {children} ) => {
  const [chordProg, setChordProg] = useState({})

  const routes = useMemo(() => {
    return { chordProg, setChordProg }
  }, [chordProg, setChordProg])

  return <ChordProgContext.Provider value={routes} > {children} </ChordProgContext.Provider>
}

// allows children to have global access to the context state
export const useChordProgContext = () => useContext(ChordProgContext)