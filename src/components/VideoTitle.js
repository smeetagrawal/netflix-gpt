import React from "react";

const VideoTitle = (props) => {
  const { title, overview } = props;
  return (
    <div className="w-full aspect-video pt-[20%] px-12 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4">{overview}</p>

      <div className="flex gap-3">
        <button className="bg-white text-black py-4 px-12 text-xl rounded-lg hover:bg-opacity-80">
          Play
        </button>
        <button className="bg-gray-500 text-white py-4 px-12 text-xl bg-opacity-50 rounded-lg hover:bg-opacity-80">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
