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

export async function saveSheet({ chordProg, userID, name, color }) {
  try {
    let id = uuidv4()
    await firebase
      .firestore()
      .collection("sheets")
      .doc(id)
      .set({
        chordProg,
        userID,
        createdAt: new Date().toDateString(),
        name,
        color,
        id
      })


  } catch (err) {
    alert('Error in save sheets.' + err.message);
  }
}

export async function deleteSheet(id ) {
  try {
    await firebase
      .firestore()
      .collection("sheets")
      .doc(id)
      .delete()

  } catch (err) {
    alert('Error in delete sheets.' + err.message);
  }
}



