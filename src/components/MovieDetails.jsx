import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearSelectedMovie, addToWatchlist } from '../features/movieSlice';

const MovieDetails = () => {
  const dispatch = useDispatch();
  const { selectedMovie, selectedMovieStatus, watchlist } = useSelector((state) => state.movies);

  if (selectedMovieStatus === 'loading') {
    return (
      <div className="fixed inset-0 bg-black/75 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!selectedMovie) return null;

  const isInWatchlist = watchlist.some(movie => movie.id === selectedMovie.id);

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50">
      <div className="bg-[#181818] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={() => dispatch(clearSelectedMovie())}
            className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="relative">
            <div className="w-full h-[400px] relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent z-[1]" />
              <img
                src={`https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`}
                alt={selectedMovie.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="relative z-[2] px-8 pb-8 -mt-32">
              <h2 className="text-4xl font-bold mb-4">{selectedMovie.title}</h2>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-yellow-500 text-lg">{selectedMovie.vote_average.toFixed(1)}</span>
                </div>
                <span className="text-gray-400">({selectedMovie.vote_count} votes)</span>
                <span className="text-gray-400">{selectedMovie.runtime} min</span>
                <span className="text-gray-400">{selectedMovie.release_date}</span>
              </div>
              
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">{selectedMovie.overview}</p>
              
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-2">Budget</h3>
                  <p className="text-2xl">${(selectedMovie.budget / 1000000).toFixed(1)}M</p>
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-2">Recettes</h3>
                  <p className="text-2xl">${(selectedMovie.revenue / 1000000).toFixed(1)}M</p>
                </div>
              </div>
              
              <button
                onClick={() => dispatch(addToWatchlist(selectedMovie))}
                className={`netflix-button w-full py-3 text-lg ${
                  isInWatchlist ? 'bg-green-600 hover:bg-green-700' : ''
                }`}
              >
                {isInWatchlist ? 'Dans la watchlist' : 'Ajouter à la watchlist'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;