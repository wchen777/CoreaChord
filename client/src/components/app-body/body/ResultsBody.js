import React from 'react'
import {
  HStack, Center, VStack
} from "@chakra-ui/react"
import LeadSheetButtons from './LeadSheetButtons'
import LeadSheet from './LeadSheet'
import SaveProgression from './SaveProgression'
import LoadExistingChanges from './LoadExistingChanges'


export default function ResultsBody( {synths}) {

  return (

    <VStack>
      <LeadSheetButtons synths={synths}/>

      <Center>

        <HStack spacing="60px" align="top">

          <SaveProgression/>

          <LeadSheet synths={synths}/>

          <LoadExistingChanges />

        </HStack>

      </Center>

    </VStack>


  )
}
