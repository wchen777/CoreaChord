import React, { useState, useEffect, useContext, useCallback } from 'react'
import {
  Container, Text, Grid, Spinner, Input, InputGroup, InputLeftElement
} from "@chakra-ui/react"
import { SearchIcon } from '@chakra-ui/icons'
import ChordProgCard from './ChordProgCard'
import firebase from "firebase/app";
import "firebase/firestore";
import { AuthContext } from '../../../context/AuthContext'
import { useChordProgContext } from '../../../context/ChordProgContext'


export default function SavedSheetsBody({ setShowSaved }) {

  const [reload, updateState] = useState(0);

  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')

  const { setIsTyping } = useChordProgContext()

  const [userSheets, setUserSheets] = useState([])

  const { user } = useContext(AuthContext)

  async function fetchSheets(userID) {
    try {
      let doc = await firebase
        .firestore()
        .collection("sheets")
        .where("userID", "==", userID)
        .get()

      if (!doc.empty) {
        let data = doc.docs.map(d => d.data())
        setUserSheets(data)
        setLoading(false)
      }

    } catch (err) {
      alert('Error in fetching sheets.' + err.message);
    }
    setLoading(false)
  }

  const refresh = () => {
    fetchSheets(user.uid)
  }

  useEffect(() => {
    refresh()
  }, [updateState, reload])



  const filtered = search === '' ? userSheets : userSheets.filter(s => s.name.toLowerCase().indexOf(search) >= 0)

  const chordsList = filtered.map(
      (sheet, index) => <ChordProgCard key={index} reload={reload} updateState={updateState}
      chordProgData={sheet} setShowSaved={setShowSaved}
  />)
  

  return (
    <Container className="home-body-container" p={8} >
      { loading ?
        <Spinner
          thickness="4px"
          mt={5}
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.500"
          size="xl"
        /> :
        userSheets.length === 0 ?
          <Text textAlign='center' mx="auto"> You haven't saved any sheets yet!</Text>
          :
          <>
            <InputGroup mx='auto' width="50%" mb={7}>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input
                placeholder="Search for a sheet name"
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
              />
            </InputGroup>

            <Grid templateColumns="repeat(4, 1fr)" gap={6} pb={12}>
              {chordsList}
            </Grid>
          </>
      }

    </Container>
  )
}
