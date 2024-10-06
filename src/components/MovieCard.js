import React from "react";
import { IMAGE_CDN_PREFIX } from "../utils/constants";

const MovieCard = (props) => {
  const { posterPath } = props;

  if (!posterPath) return null;

  return (
    <div className="w-48">
      <img
        alt="Movie card"
        src={IMAGE_CDN_PREFIX + posterPath}
        className="rounded-lg"
      />
    </div>
  );
};

export default MovieCard;
