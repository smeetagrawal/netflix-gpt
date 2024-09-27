import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../redux/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../redux/gptSlice";
import { changeLanguage } from "../redux/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const gptSearchPage = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("error while signout", error);
    }
  };

  const handleGptSearch = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    dispatch(changeLanguage(selectedLanguage));
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
          {gptSearchPage && (
            <select
              className="p-2 bg-gray-700 text-white rounded-lg"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((language) => (
                <option key={language.id} value={language.id}>
                  {language.name}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={handleGptSearch}
            className="bg-purple-800 py-2 px-2 rounded-lg mx-4 my-2 text-white"
          >
            {gptSearchPage ? "Home" : "GPT Search"}
          </button>
          <button onClick={handleSignOut} className="font-bold text-red-500">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
