import firebase from "firebase/app";
import "firebase/firestore";


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