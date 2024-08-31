import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../redux/moviesSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const getPopularMovies = async () => {
    try {
      const url = "https://api.themoviedb.org/3/movie/popular?page=1";
      const response = await fetch(url, API_OPTIONS);
      const data = await response.json();
      dispatch(addPopularMovies(data.results));
    } catch (error) {
      console.error("Error in popular movies", error);
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []);
};

export default usePopularMovies;
