import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import auth from "../../firebase/firebase";

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/dashboard",
  signInOptions: [auth.EmailAuthProvider.PROVIDER_ID],
};

const SignIn = () => (
  <div>
    <h1>Sign In</h1>
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />
  </div>
);

export default SignIn;
