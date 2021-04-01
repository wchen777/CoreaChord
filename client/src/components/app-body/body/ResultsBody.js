import React from 'react'
import {
  HStack, Center, VStack
} from "@chakra-ui/react"
import LeadSheetButtons from './LeadSheetButtons'
import LeadSheet from './LeadSheet'
import SaveProgression from './SaveProgression'
import LoadExistingChanges from './LoadExistingChanges'

export default function ResultsBody() {
  return (

    <VStack>
      <LeadSheetButtons />

      <Center>

        <HStack spacing="60px">

          <SaveProgression />

          <LeadSheet />

          <LoadExistingChanges />

        </HStack>

      </Center>

    </VStack>


  )
}
