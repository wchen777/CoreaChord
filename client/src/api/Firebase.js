import firebase from "firebase/app";
import "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';


export async function registration({ email, password }) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    // const currentUser = firebase.auth().currentUser;
  } catch (err) {
    alert("Error in account registration." + err.message);
  }
}

export async function signIn({email, password}) {
  try {
   await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
  } catch (err) {
    alert("Error in account sign in." + err.message);
  }
}

export async function signOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    alert('Error in account sign out.' + err.message);
  }
}

export async function saveSheet({ chordProg, userID, name }) {
  try {
    await firebase
      .firestore()
      .collection("sheets")
      .doc(uuidv4())
      .set({
        chordProg,
        userID,
        createdAt: new Date().toDateString(),
        name
      })


  } catch (err) {
    alert('Error in save sheets.' + err.message);
  }
}