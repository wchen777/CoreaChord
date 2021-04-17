import React, { useRef, useEffect, useState } from 'react'
import { VictoryChart, VictoryLine, VictoryZoomContainer, VictoryLabel } from 'victory'
import {
  HStack,
  Tooltip,
  IconButton,
  Button,
  Input,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  Center,
  VStack,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  Heading,
  Box
} from "@chakra-ui/react"
import AnalyzeTable from './AnalyzeTable'

export default function AnalyzeResultsModal({ finalRef, isOpen, onClose, analyzedData }) {

  console.log(analyzedData)

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
        {/* <ModalHeader w="200">Register for an account:</ModalHeader>  */}
        <ModalCloseButton />

        <Box mb={8} mt={4}>
          <Center>
            <VStack>
              <Tooltip
                label="A secret complexity score that we track throughout the chord progression."
                aria-label="progression complexity tooltip"
                fontSize="xs">
                <Heading color="gray.500" fontSize="15px">Progression Complexity</Heading>
              </Tooltip>
              {/* <VictoryLabel text="Progression Complexity" textAnchor="middle"/> */}
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
                  data={analyzedData.complexities}
                />

              </VictoryChart>

              <Tooltip
                label="We can detect standard chord cadences in your chord progression."
                aria-label="jazz cadences tooltip"
                fontSize="xs">
                <Heading color="gray.500" fontSize="15px" my={2}>Jazz Cadences</Heading>
              </Tooltip>
              <AnalyzeTable cadences={analyzedData.cadences} />

              <Button variant="ghost" colorScheme="red" size="lg" onClick={onClose} mt={5}>Close</Button>
            </VStack>
          </Center>
        </Box>

      </ModalContent>
    </Modal>
  )
}




