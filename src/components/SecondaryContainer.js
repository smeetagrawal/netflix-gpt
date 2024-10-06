import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies?.nowPlayingMovies && (
      <div className="bg-black">
        <div className="mt-0 md:-mt-52 px-2 md:px-4 relative z-50">
          <MovieList title="Now Playing" movies={movies?.nowPlayingMovies} />
          <MovieList title="Popular" movies={movies?.popularMovies} />
          <MovieList title="Top Rated" movies={movies?.topRatedMovies} />
          <MovieList title="UpComing" movies={movies?.upComingMovies} />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
