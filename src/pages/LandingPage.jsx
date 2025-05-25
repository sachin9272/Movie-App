import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import MovieCarousel from '../components/MovieCarousel'
import { FaHeart } from 'react-icons/fa';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const LandingPage = ({ favorites, toggleFavorite }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [yearRange, setYearRange] = useState({ min: '', max: '' });
  const [ratingRange, setRatingRange] = useState({ min: '', max: '' });
  const [error, setError] = useState(null);
  const observer = useRef();
  const debounceTimeout = useRef(null);

  // Fetch genres on component mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
        const data = await response.json();
        console.log('Fetched genres:', data.genres);
        setGenres(data.genres || []);
      } catch (error) {
        console.error('Error fetching genres:', error);
        setGenres([{ id: 28, name: 'Action' }, { id: 35, name: 'Comedy' }, { id: 18, name: 'Drama' }]);
      }
    };
    fetchGenres();
  }, []);

  const lastMovieRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  // Debounced fetch function
  const fetchSearchResults = useCallback(async () => {
    if (searchTerm.trim() === '' && !selectedGenre && !yearRange.min && !yearRange.max && !ratingRange.min && !ratingRange.max) {
      setSearchResults([]);
      setPage(1);
      setError(null);
      return;
    }

    try {
      const endpoint = searchTerm.trim() ? 'search/movie' : 'discover/movie';
      const url = new URL(`${BASE_URL}/${endpoint}`);
      url.searchParams.append('api_key', API_KEY);
      if (searchTerm.trim()) url.searchParams.append('query', searchTerm);
      if (selectedGenre) url.searchParams.append('with_genres', selectedGenre);
      if (yearRange.min) url.searchParams.append('primary_release_date.gte', `${yearRange.min}-01-01`);
      if (yearRange.max) url.searchParams.append('primary_release_date.lte', `${yearRange.max}-12-31`);
      if (ratingRange.min) url.searchParams.append('vote_average.gte', ratingRange.min);
      if (ratingRange.max) url.searchParams.append('vote_average.lte', ratingRange.max);
      url.searchParams.append('page', page);

      console.log('Fetching URL:', url.toString());
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch movies');
      const data = await response.json();
      console.log('API response:', data);

      if (page === 1) {
        setSearchResults(data.results || []);
      } else {
        setSearchResults((prev) => [...prev, ...(data.results || [])]);
      }

      setHasMore(data.page < data.total_pages);
      console.log('hasMore:', data.page < data.total_pages, 'Current page:', data.page, 'Total pages:', data.total_pages);
      setError(null);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError('Failed to load movies. Please try again later.');
    }
  }, [searchTerm, page, selectedGenre, yearRange, ratingRange]);

  // Fetch search results with debouncing
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      fetchSearchResults();
    }, 300); // 300ms debounce

    return () => clearTimeout(debounceTimeout.current);
  }, [fetchSearchResults]);

  // Reset page on filter or search term change
  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedGenre, yearRange, ratingRange]);

  // Reset filters
  const resetFilters = () => {
    setSelectedGenre('');
    setYearRange({ min: '', max: '' });
    setRatingRange({ min: '', max: '' });
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Navbar */}
      <header className="flex flex-col md:flex-row justify-between items-center px-8 py-6 border-b border-gray-700 gap-4 md:gap-0">
        <h1 className="text-2xl font-bold text-red-500">MovieMania</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-red-500 w-full md:w-64"
          />
          <Link
            to="/favourite"
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white text-sm"
          >
            Favourites
          </Link>
        </div>
      </header>

      {/* Filter Section */}
      <section className="px-6 py-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Filters</h3>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md text-white text-sm"
          >
            Reset Filters
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={selectedGenre}
            onChange={(e) => {
              console.log('Selected genre ID:', e.target.value);
              setSelectedGenre(e.target.value);
            }}
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-red-500"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min Year"
              value={yearRange.min}
              onChange={(e) => setYearRange({ ...yearRange, min: e.target.value })}
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-red-500 w-1/2"
            />
            <input
              type="number"
              placeholder="Max Year"
              value={yearRange.max}
              onChange={(e) => setYearRange({ ...yearRange, max: e.target.value })}
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-red-500 w-1/2"
            />
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min Rating"
              value={ratingRange.min}
              onChange={(e) => setRatingRange({ ...ratingRange, min: e.target.value })}
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-red-500 w-1/2"
              step="0.1"
              min="0"
              max="10"
            />
            <input
              type="number"
              placeholder="Max Rating"
              value={ratingRange.max}
              onChange={(e) => setRatingRange({ ...ratingRange, max: e.target.value })}
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-red-500 w-1/2"
              step="0.1"
              min="0"
              max="10"
            />
          </div>
        </div>
      </section>

      {/* Hero Section */}
      {searchTerm.trim() === '' && !selectedGenre && !yearRange.min && !yearRange.max && !ratingRange.min && !ratingRange.max && (
        <section className="text-center px-6 py-20">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">Stream. Discover. Enjoy.</h2>
          <p className="mt-6 text-lg max-w-xl mx-auto">
            Watch your favourite movies and shows anytime, anywhere.
          </p>
          <button className="mt-8 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full text-white font-semibold text-lg transition">
            Explore Now
          </button>
        </section>
      )}

      {/* Search Results */}
      {error && (
        <section className="px-6 py-10">
          <p className="text-red-500">{error}</p>
        </section>
      )}
      {searchResults.length === 0 && !error && (searchTerm || selectedGenre || yearRange.min || yearRange.max || ratingRange.min || ratingRange.max) && (
        <section className="px-6 py-10">
          <p className="text-gray-400">
            No movies found. Try adjusting your search or filters.
          </p>
        </section>
      )}
      {searchResults.length > 0 && (
        <section className="px-6 py-10">
          <h3 className="text-2xl font-bold mb-4">Search Results</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {searchResults.map((movie, index) => {
              console.log('Rendering movie:', movie.title, 'Vote Average:', movie.vote_average);
              const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
              const isFavorited = favorites.some((fav) => fav.id === movie.id);

              if (index === searchResults.length - 1) {
                return (
                  <div
                    ref={lastMovieRef}
                    key={movie.id}
                    className="bg-gray-900 rounded-lg overflow-hidden shadow-md relative"
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
                    <button
                      onClick={() => toggleFavorite(movie)}
                      className={`absolute top-2 right-2 p-2 rounded-full bg-black bg-opacity-50 z-10 ${
                        isFavorited ? 'text-red-500' : 'text-white'
                      } hover:text-red-600 transition-colors`}
                      title={isFavorited ? 'Remove from favourites' : 'Add to favourites'}
                    >
                      <FaHeart />
                      {console.log('Heart button rendered for:', movie.title, 'Favorited:', isFavorited)}
                    </button>
                    <div className="p-4 min-h-[100px]">
                      <h2 className="text-lg font-semibold truncate">{movie.title}</h2>
                      <p className="text-gray-400 text-sm">{movie.release_date?.split('-')[0] || 'N/A'}</p>
                      <p className="text-yellow-500 text-sm mt-1">⭐ {rating}</p>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={movie.id}
                  className="bg-gray-900 rounded-lg overflow-hidden shadow-md relative"
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
                  <button
                    onClick={() => toggleFavorite(movie)}
                    className={`absolute top-2 right-2 p-2 rounded-full bg-black bg-opacity-50 z-10 ${
                      isFavorited ? 'text-red-500' : 'text-white'
                    } hover:text-red-600 transition-colors`}
                    title={isFavorited ? 'Remove from favourites' : 'Add to favourites'}
                  >
                    <FaHeart />
                    {console.log('Heart button rendered for:', movie.title, 'Favorited:', isFavorited)}
                  </button>
                  <div className="p-4 min-h-[100px]">
                    <h2 className="text-lg font-semibold text-white truncate">{movie.title}</h2>
                    <div className='flex justify-between px-6 mt-2'>
                        <p className="text-gray-400 text-sm">{movie.release_date?.split('-')[0] || 'N/A'}</p>
                        <p className="text-yellow-500 text-sm mt-1">⭐ {rating}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Movie Carousels */}
      {searchTerm.trim() === '' && !selectedGenre && !yearRange.min && !yearRange.max && !ratingRange.min && !ratingRange.max && (
        <>
          <MovieCarousel
            title="Trending Now"
            fetchUrl={`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
          <MovieCarousel
            title="Top Rated"
            fetchUrl={`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
          <MovieCarousel
            title="Upcoming"
            fetchUrl={`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        </>
      )}

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-gray-400">
        <p>© {new Date().getFullYear()} MovieMania. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;