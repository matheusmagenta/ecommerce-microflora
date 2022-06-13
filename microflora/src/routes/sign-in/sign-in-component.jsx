import React from "react";
import {
  signInWitGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWitGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <h1>SignIn</h1>
      <button onClick={logGoogleUser}>sign in with google popup</button>
    </div>
  );
};

export default SignIn;
