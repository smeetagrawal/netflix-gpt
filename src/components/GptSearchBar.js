import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { model } from "../utils/geminiai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../redux/gptSlice";

const GptSearchBar = () => {
  const language = useSelector((store) => store?.config?.language);
  const dispatch = useDispatch();
  const searchRef = useRef();

  const searchMovieTMDB = async (movie) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&page=1'`,
        API_OPTIONS
      );
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const searchValue = searchRef.current.value;
      if (searchValue) {
        const prompt = `Act as a Movie Recommendation system and suggest some movies for the query: ${searchValue}. only give me names of 5 movies, comma separated like the example result given ahead. Example Sholay, Don, Koi mil gaya, Hera pheri, Pushpa`;
        const result = await model.generateContent(prompt);
        if (result?.response?.text()?.length > 0) {
          const reommendedMoviesArray = result.response.text().split(",");

          const promiseArray = reommendedMoviesArray.map((movie) =>
            searchMovieTMDB(movie)
          );
          const tmdbResults = await Promise.all(promiseArray);
          dispatch(
            addGptMovieResult({
              movieRecommended: reommendedMoviesArray,
              movieResult: tmdbResults,
            })
          );
        }
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder={lang[language].gptSearchPlaceHolder}
          className="p-4 m-4 col-span-9 rounded-lg text-xs md:text-base"
          ref={searchRef}
        />
        <button
          className="m-4 py-2 px-4 bg-red-700 text-white rounded-lg col-span-3 text-xs md:text-base"
          onClick={handleSubmit}
        >
          {lang[language].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
