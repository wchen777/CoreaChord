import React from 'react'
import {
  Table,
  Thead,
  Tbody,

  Tr,
  Th,
  Td,

} from "@chakra-ui/react"

export default function AnalyzeTable() {
  return (
    <div className="analyze-table">
      <Table variant="simple" >
        <Thead>
          <Tr>
            <Th>Bars</Th>
            <Th>Cadence Type</Th>
            <Th>Progression</Th>
            <Th>Relative Key</Th>
          </Tr>
        </Thead>
        <Tbody>

          <Tr>
            <Td>3 to 5</Td>
            <Td>II V I</Td>
            <Td>D-7 G7 Cmaj7</Td>
            <Td>C major</Td>
          </Tr>

          <Tr>
            <Td>3 to 5</Td>
            <Td>II V I</Td>
            <Td>D-7 G7 Cmaj7</Td>
            <Td>C major</Td>
          </Tr>

          <Tr>
            <Td>3 to 5</Td>
            <Td>II V I</Td>
            <Td>D-7 G7 Cmaj7</Td>
            <Td>C major</Td>
          </Tr>

        </Tbody>

      </Table>
    </div>
  )
}
