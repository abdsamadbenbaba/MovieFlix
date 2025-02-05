import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import MovieList from './components/MovieList';
import Watchlist from './components/Watchlist';
import MovieDetails from './components/MovieDetails';

function App() {
  const [showWatchlist, setShowWatchlist] = useState(false);

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-[#141414]">
        <nav className="bg-[#141414] shadow-lg sticky top-0 z-50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <h1 className="text-red-600 text-3xl font-bold">MovieFlix</h1>
              <button
                onClick={() => setShowWatchlist(!showWatchlist)}
                className="netflix-button"
              >
                {showWatchlist ? 'Films Populaires' : 'Ma Watchlist'}
              </button>
            </div>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-8">
          {showWatchlist ? <Watchlist /> : <MovieList />}
          <MovieDetails />
        </main>
      </div>
    </Provider>
  );
}

export default App