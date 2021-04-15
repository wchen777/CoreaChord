import React, { useState, useEffect, useContext } from 'react'
import {
  Container, HStack, Center, Button, Tooltip, Box, Text, useColorModeValue, Grid
} from "@chakra-ui/react"
import ChordProgCard from './ChordProgCard'
import firebase from "firebase/app";
import "firebase/firestore";
import { AuthContext } from '../../../context/AuthContext'


export default function SavedSheetsBody({ setShowSaved }) {

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
      }

    } catch (err) {
      alert('Error in fetching sheets.' + err.message);
    }
  }

  useEffect(() => {
    fetchSheets(user.uid)
  }, [])

  console.log(userSheets)

  const chordsList = userSheets.map((sheet, index) => <ChordProgCard key={index} chordProgData={sheet} setShowSaved={setShowSaved} />)

  return (
    <Container className="home-body-container" p={8} >
      { userSheets.length === 0 ?
        <Text textAlign='center' mx="auto"> You haven't saved any sheets yet!</Text>
        :
        <Grid templateColumns="repeat(4, 1fr)" gap={6} pb={12}>
          {chordsList}
        </Grid>
      }

    </Container>
  )
}
