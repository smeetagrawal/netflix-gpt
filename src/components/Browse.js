import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../custom-hooks/useNowPlayingMovies";
import usePopularMovies from "../custom-hooks/usePopularMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useTopRatedMovies from "../custom-hooks/useTopRatedMovies";
import useUpComingMovies from "../custom-hooks/useUpComingMovies";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpComingMovies();

  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;
