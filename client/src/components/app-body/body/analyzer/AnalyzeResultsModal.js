import React, { useState } from 'react'
import { VictoryChart, VictoryLine, VictoryZoomContainer } from 'victory'
import {
  Tooltip,
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  Center,
  VStack,
  ModalCloseButton,
  ModalContent,
  Heading,
  Box
} from "@chakra-ui/react"
import AnalyzeTable from './AnalyzeTable'

export default function AnalyzeResultsModal({ finalRef, isOpen, onClose, analyzedData }) {

  const [zoom, setZoom] = useState({})

  const handleZoom = (domain) => {
    setZoom({ ...zoom, selectedDomain: domain });
  }

  return (
    <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>


        <Center> <Heading color="teal.500" fontSize="25px" mt={12} mx={3} mb={4}>
          Analyzer Results </Heading> </Center>
        <ModalCloseButton />

        <Box mb={8} mt={4}>
          <Center>
            <VStack>
              <Tooltip
                label="A secret complexity score ranging from 0 to 1 that we track throughout the chord progression.
                (0 = least complex, 1 = most complex)"
                aria-label="progression complexity tooltip"
                fontSize="xs">
                <Heading color="gray.500" fontSize="15px">Progression Complexity</Heading>
              </Tooltip>

              <VictoryChart
                width={450}
                height={200}
                maxDomain={{ y: 1 }}
                minDomain={{ y: 0 }}
                containerComponent={
                  <VictoryZoomContainer responsive={false}
                    zoomDimension="y"
                    zoomDomain={zoom.zoomDomain}
                    onZoomDomainChange={handleZoom}
                  />
                }
              >
                <VictoryLine
                  style={{
                    data: { stroke: "teal" }
                  }}
                  data={analyzedData?.complexities}
                />

              </VictoryChart>

              <Tooltip
                label="We can detect standard chord cadences in your chord progression."
                aria-label="jazz cadences tooltip"
                fontSize="xs">
                <Heading color="gray.500" fontSize="15px" my={2}>Jazz Cadences</Heading>
              </Tooltip>
              <AnalyzeTable cadences={analyzedData?.cadences} />

              <Button variant="ghost" colorScheme="red" size="lg" onClick={onClose} mt={5}>Close</Button>
            </VStack>
          </Center>
        </Box>

      </ModalContent>
    </Modal>
  )
}




