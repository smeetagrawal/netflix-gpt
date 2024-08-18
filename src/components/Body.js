import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../redux/userSlice";
import appRouter from "../router";

const Body = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        // here user can be new user or existing user
        dispatch(addUser({ uid, email, displayName }));
      } else {
        // here we will signout the user
        dispatch(removeUser());
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <RouterProvider router={appRouter} />;
};

export default Body;
