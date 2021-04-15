
import React from 'react'
import {
  Button, Tooltip
} from '@chakra-ui/react';


export default function SavedSheetsButton({ setShowSaved, showSaved }) {
  return (
    <Tooltip
      label={showSaved ? "Return to home page" : "View all your saved chord progressions"}
      aria-label="saved sheets button tooltip"
      fontSize="sm">
      <Button colorScheme="teal" px={10} mx={5} size="lg" onClick={() => setShowSaved(!showSaved)}>
        {showSaved ? "Home" : "Saved Sheets"}
    </Button>
    </Tooltip>
  )
}
