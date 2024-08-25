import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../redux/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("error while signout", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        // here user can be new user or existing user
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse");
      } else {
        // here we will signout the user
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black flex items-center justify-between z-50">
      <img src={LOGO} alt="logo" className="w-36" />
      {user && (
        <div>
          <button onClick={handleSignOut} className="font-bold text-red-500">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
