import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("error while signout", error);
    }
  };

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black flex items-center justify-between">
      <img
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
        className="w-36"
      />
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
