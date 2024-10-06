import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { BACKGROUND_LOGO } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage("");
  };

  const handleSignIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setErrorMessage(
        error.code === "auth/invalid-credential"
          ? "Invalid credentials"
          : "Something went wrong"
      );
    }
  };

  const handleSignUp = async (name, email, password) => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(newUser.user, {
        displayName: name,
      });
      const { uid, displayName, email: updatedEmail } = auth?.currentUser;
      dispatch(addUser({ uid, displayName, email: updatedEmail }));
    } catch (error) {
      setErrorMessage(
        error.code === "auth/email-already-in-use"
          ? "Email already exists"
          : "Something went wrong"
      );
    }
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current?.value;
    const message = checkValidData(name, email, password);
    setErrorMessage(message);

    if (message) return;

    if (isSignInForm) {
      // will sign in
      handleSignIn(email, password);
    } else {
      // will create new user
      handleSignUp(name, email, password);
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="h-screen w-screen object-cover"
          src={BACKGROUND_LOGO}
          alt="background-logo"
        />
      </div>
      <form
        onSubmit={handleButtonClick}
        className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={nameRef}
            type="text"
            placeholder="Full Name"
            className="p-4 my-2 w-full bg-gray-700 rounded-lg"
          />
        )}
        <input
          ref={emailRef}
          type="text"
          placeholder="Email Address"
          className="p-4 my-2 w-full bg-gray-700 rounded-lg"
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="p-4 my-2 w-full bg-gray-700 rounded-lg"
        />

        {errorMessage && (
          <p className="text-red-500 font-bold">{errorMessage}</p>
        )}

        <button type="submit" className="p-4 my-4 bg-red-700 w-full rounded-lg">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="my-4" onClick={toggleSignInForm}>
          {isSignInForm ? "New to Netflix?" : "Already an user!"}{" "}
          <span className="cursor-pointer hover:underline">
            {isSignInForm ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
