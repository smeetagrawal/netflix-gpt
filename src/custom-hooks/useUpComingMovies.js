import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addUpComingMovies } from "../redux/moviesSlice";
import { useEffect } from "react";

const useUpComingMovies = () => {
  const dispatch = useDispatch();

  const getUpComingMovies = async () => {
    try {
      const url = "https://api.themoviedb.org/3/movie/upcoming?page=1";
      const response = await fetch(url, API_OPTIONS);
      const data = await response.json();
      dispatch(addUpComingMovies(data.results));
    } catch (error) {
      console.error("Error in upcoming movies", error);
    }
  };

  useEffect(() => {
    getUpComingMovies();
  }, []);
};

export default useUpComingMovies;
