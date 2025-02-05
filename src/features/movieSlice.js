import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '194291fb71772fdfacec2f6703a07ffa';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  return response.data.results;
});

export const fetchMovieDetails = createAsyncThunk('movies/fetchMovieDetails', async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  return response.data;
});

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    watchlist: [],
    status: 'idle',
    error: null,
    sortBy: 'none',
    searchQuery: '',
    selectedMovie: null,
    selectedMovieStatus: 'idle'
  },
  reducers: {
    addToWatchlist: (state, action) => {
      if (!state.watchlist.find(movie => movie.id === action.payload.id)) {
        state.watchlist.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(movie => movie.id !== action.payload);
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
      state.selectedMovieStatus = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.selectedMovieStatus = 'loading';
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.selectedMovieStatus = 'succeeded';
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.selectedMovieStatus = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { 
  addToWatchlist, 
  removeFromWatchlist, 
  setSortBy, 
  setSearchQuery,
  clearSelectedMovie 
} = movieSlice.actions;
export default movieSlice.reducer;