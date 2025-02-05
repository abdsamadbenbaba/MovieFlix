import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, addToWatchlist, setSortBy, setSearchQuery, fetchMovieDetails } from '../features/movieSlice';

const MovieList = () => {
  const dispatch = useDispatch();
  const { movies, status, error, sortBy, watchlist, searchQuery } = useSelector((state) => state.movies);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies());
    }
  }, [status, dispatch]);

  const handleSort = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleMovieClick = (movieId) => {
    dispatch(fetchMovieDetails(movieId));
  };

  const filteredAndSortedMovies = [...movies]
    .filter(movie => 
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'rating-high') {
        return b.vote_average - a.vote_average;
      } else if (sortBy === 'rating-low') {
        return a.vote_average - b.vote_average;
      }
      return 0;
    });

  const isInWatchlist = (movieId) => {
    return watchlist.some(movie => movie.id === movieId);
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Rechercher un film..."
          value={searchQuery}
          onChange={handleSearch}
          className="netflix-input w-full sm:w-64"
        />
        <select 
          className="netflix-select w-full sm:w-auto"
          value={sortBy}
          onChange={handleSort}
        >
          <option value="none">Trier par...</option>
          <option value="rating-high">Note (Plus haute)</option>
          <option value="rating-low">Note (Plus basse)</option>
        </select>
      </div>

      <div className="movie-grid">
        {filteredAndSortedMovies.map((movie) => (
          <div 
            key={movie.id} 
            className="movie-card"
            onClick={() => handleMovieClick(movie.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="movie-card-overlay">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{movie.title}</h3>
                <div className="flex items-center mb-3">
                  <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-yellow-500">{movie.vote_average.toFixed(1)}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(addToWatchlist(movie));
                  }}
                  className={`w-full py-2 px-4 rounded transition-colors ${
                    isInWatchlist(movie.id)
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {isInWatchlist(movie.id) ? 'Dans la watchlist' : 'Ajouter à la watchlist'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;