import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';

const MovieCarousel = ({ title, fetchUrl, favorites, toggleFavorite }) => {
  const [movies, setMovies] = useState([]);
  const baseImgUrl = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(fetchUrl);
        setMovies(response.data.results || []);
        console.log(`Fetched movies for ${title}:`, response.data.results);
      } catch (error) {
        console.error(`Error fetching movies for ${title}:`, error);
      }
    };
    fetchData();
  }, [fetchUrl, title]);

  return (
    <div className="px-6 my-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
        {movies.map((movie) => {
          const isFavorited = favorites.some((fav) => fav.id === movie.id);
          return (
            <div key={movie.id} className="min-w-[150px] relative">
              {movie.poster_path ? (
                <img
                  src={`${baseImgUrl}${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-lg hover:scale-105 transition"
                />
              ) : (
                <div className="w-[150px] h-[225px] bg-gray-700 flex items-center justify-center text-gray-400 rounded-lg">
                  No Image
                </div>
              )}
              <button
                onClick={() => {
                  toggleFavorite(movie);
                  console.log(`Toggled favorite for ${movie.title}. Favorited: ${!isFavorited}`);
                }}
                className={`absolute top-2 right-2 p-2 rounded-full bg-black bg-opacity-50 z-10 ${
                  isFavorited ? 'text-red-500' : 'text-white'
                } hover:text-red-600 transition-colors`}
                title={isFavorited ? 'Remove from favourites' : 'Add to favourites'}
              >
                <FaHeart />
                {console.log('Heart button rendered for:', movie.title, 'Favorited:', isFavorited)}
              </button>
              <div className="p-4">
                <h2 className="text-lg font-semibold truncate">{movie.title}</h2>
                <div className="flex justify-between gap-4">
                  <p className="text-gray-400 text-sm">{movie.release_date?.split('-')[0] || 'N/A'}</p>
                  <p className="text-yellow-400 text-sm">⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieCarousel;