import React from "react";
import MovieCard from "./MovieCard";

const MovieList = (props) => {
  const { title, movies } = props;

  return (
    <div className="px-6">
      <h3 className="text-3xl py-4 text-white">{title}</h3>
      <div className="flex overflow-x-scroll no-scrollbar">
        <div className="flex gap-4">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
