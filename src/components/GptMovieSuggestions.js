import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const gpt = useSelector((store) => store.gpt);

  const { gptMovies, recommededMovie } = gpt;

  if (!recommededMovie) return null;

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-70 rounded-lg">
      <div>
        {recommededMovie.map((rm, rmIndex) => (
          <MovieList title={rm} movies={gptMovies[rmIndex]?.results} />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
