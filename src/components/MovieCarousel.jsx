import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieCarousel = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const baseImgUrl = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
    };
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="px-6 my-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
        {movies.map(movie => (
          <div key={movie.id} className="min-w-[150px]">
            <img
              src={`${baseImgUrl}${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg hover:scale-105 transition"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold truncate">{movie.title}</h2>
              <p className="text-gray-400 text-sm">{movie.release_date?.split('-')[0]}</p>
              <p className="text-yellow-400 text-sm mt-1">⭐ {movie.vote_average.toFixed(1)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
