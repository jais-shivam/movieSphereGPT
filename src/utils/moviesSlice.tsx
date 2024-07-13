import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    trailerVideo: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
  },
});

export const { addNowPlayingMovies, 
  addTrailerVideo, addPopularMovies
 } =
  moviesSlice.actions;

export default moviesSlice.reducer;

export const selectNowPlayingMovies = (state: { movies: { nowPlayingMovies: []; }; }) => state.movies?.nowPlayingMovies;
export const selectTrailerVideo = (state: { movies: { trailerVideo: []; }; }) => state.movies?.trailerVideo;
export const selectPopularMovies = (state: { movies: { popularMovies: []; }; }) => state.movies?.popularMovies;
