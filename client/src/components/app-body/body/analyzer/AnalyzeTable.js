import React from 'react'
import {
  Table,
  Thead,
  Tbody,

  Tr,
  Th,
  Td,

} from "@chakra-ui/react"

export default function AnalyzeTable({ cadences }) {


  const cadenceRows = cadences?.map((c) => {
    return (
      <Tr>
        <Td>{c.start} to {c.end}</Td>
        <Td>{c.cadence === "Imaj7_Im7" ? "Imaj7 I-7" : c.cadence.split("_").join(" ")}</Td>
        <Td>{c.progression}</Td>
        <Td>{c.relativeRoot}</Td>
      </Tr>
    )
  })
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

          {cadenceRows}

        </Tbody>

      </Table>
    </div>
  )
}
