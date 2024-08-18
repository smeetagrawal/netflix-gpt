import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";

const Login = () => {
  const navigate = useNavigate();
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
      navigate("/browse");
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
      navigate("/browse");
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
          src="https://assets.nflxext.com/ffe/siteui/vlv3/20bf1f4d-1c73-48fd-8689-310d6dd80efc/81bdc063-cb8f-4afe-8a02-a3131ca4ef5e/IN-en-20240812-POP_SIGNUP_TWO_WEEKS-perspective_WEB_7998f3b6-63e3-424a-8328-550cf777ddce_small.jpg"
          alt="background-logo"
        />
      </div>
      <form
        onSubmit={handleButtonClick}
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
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
