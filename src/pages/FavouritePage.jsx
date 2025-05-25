import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const FavouritePage = ({ favorites, removeFavorite }) => {
  useEffect(() => {
    console.log('FavouritePage mounted. Favorites:', favorites);
    console.log('localStorage favoriteMovies:', localStorage.getItem('favoriteMovies'));

    return () => {
      console.log('FavouritePage unmounted. Favorites:', favorites);
      console.log('localStorage favoriteMovies on unmount:', localStorage.getItem('favoriteMovies'));
    };
  }, [favorites]);

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <header className="flex flex-col md:flex-row justify-between items-center px-8 py-6 border-b border-gray-700 gap-4 md:gap-0">
        <h1 className="text-2xl font-bold text-red-500">MovieMania</h1>
        <Link
          to="/"
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white text-sm"
        >
          Back to Home
        </Link>
      </header>

      {/* Favorites Section */}
      <section className="px-6 py-10">
        <h3 className="text-2xl font-bold mb-4">Favourite Movies</h3>
        {favorites.length === 0 ? (
          <p className="text-gray-400">No favourite movies yet. Add some from the home page!</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {favorites.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-900 rounded-lg overflow-hidden shadow-md"
              >
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-700 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
                <div className="p-4 min-h-[120px] flex flex-col">
                  <h2 className="text-lg text-white font-semibold truncate">{movie.title}</h2>
                  <div className='flex justify-between px-6'>
                    <p className="text-gray-400 text-sm">{movie.release_date?.split('-')[0] || 'N/A'}</p>
                    <p className="text-yellow-500 text-sm mt-1">⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</p>
                  </div>
                  <button
                    onClick={() => removeFavorite(movie.id)}
                    className="mt-2 px-2 py-1 bg-red-600 hover:bg-red-700 rounded-md text-white text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-gray-400">
        <p>© {new Date().getFullYear()} MovieMania. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FavouritePage;