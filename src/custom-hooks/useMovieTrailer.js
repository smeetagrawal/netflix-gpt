import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../redux/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = ({ movieId }) => {
  const dispatch = useDispatch();

  const getMovieVideos = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        API_OPTIONS
      );

      const data = await response.json();
      const trailers = data.results.filter((video) => video.type === "Trailer");
      const trailer = trailers[0] ?? data.results[0];
      dispatch(addTrailerVideo(trailer));
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useMovieTrailer;
