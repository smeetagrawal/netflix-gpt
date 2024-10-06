import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    gptMovies: null,
    recommededMovie: null,
  },
  reducers: {
    toggleGptSearchView(state) {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovieResult(state, action) {
      state.gptMovies = action.payload?.movieResult;
      state.recommededMovie = action.payload?.movieRecommended;
    },
  },
});

export const { toggleGptSearchView, addGptMovieResult } = gptSlice.actions;

export default gptSlice.reducer;
