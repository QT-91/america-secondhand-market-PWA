'use client'
import React, { useState } from 'react';

import { auth } from '@/firebase/app';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential?.accessToken;
    
        // The signed-in user info.
        const user = result?.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className="container mx-auto h-screen mt-3 flex flex-col justify-center">
      <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={signInWithGoogle}>
        Log in with Google
      </button>

      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}


export default LoginPage;