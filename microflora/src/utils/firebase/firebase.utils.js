import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMaO7JbFIpeOAjEUl1-lUbV56vryd1rkQ",
  authDomain: "microflora-23815.firebaseapp.com",
  projectId: "microflora-23815",
  storageBucket: "microflora-23815.appspot.com",
  messagingSenderId: "990602265711",
  appId: "1:990602265711:web:7dff43e8b6a4f5d5d1399a",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWitGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWitGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// Initialize db
export const db = getFirestore();

// Getting the data from authentication and store it in the Firestore
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  // create a doc reference for the user trying to authenticate
  const userDocRef = doc(db, "users", userAuth.uid);

  // create a special object using doc
  const userSnapshot = await getDoc(userDocRef);

  // check if user data exists
  if (!userSnapshot.exists()) {
    // if user does not exists, create it in the db
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  // if user exists
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
