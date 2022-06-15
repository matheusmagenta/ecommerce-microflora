import React, { useEffect } from "react";
import {
  signInWitGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import Button from "../../components/button/button.component";
import "../../components/button/button.styles.scss";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWitGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h2>Sign-In Page</h2>
      <Button buttonType="google" onClick={logGoogleUser}>
        sign in with google popup
      </Button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
