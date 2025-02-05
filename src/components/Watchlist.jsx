import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWatchlist } from '../features/movieSlice';

const Watchlist = () => {
  const dispatch = useDispatch();
  const { watchlist } = useSelector((state) => state.movies);

  if (watchlist.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-gray-400">Votre watchlist est vide</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {watchlist.map((movie) => (
        <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-auto"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">{movie.title}</h3>
            <p className="text-gray-400 text-sm mb-2">{movie.release_date}</p>
            <div className="flex items-center mb-3">
              <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-yellow-500">{movie.vote_average.toFixed(1)}</span>
            </div>
            <button
              onClick={() => dispatch(removeFromWatchlist(movie.id))}
              className="w-full py-2 px-4 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
            >
              Retirer de la watchlist
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Watchlist;