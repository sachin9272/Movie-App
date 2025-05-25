import React, { useState, useEffect, useRef, useCallback } from 'react';
import MovieCarousel from '../components/MovieCarousel';
import { FaMoon, FaSun } from 'react-icons/fa';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const observer = useRef();

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

  // Fetch search results
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm.trim() === '') {
        setSearchResults([]);
        setPage(1);
        return;
      }

      try {
        const response = await fetch(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}&page=${page}`
        );
        const data = await response.json();

        if (page === 1) {
          setSearchResults(data.results || []);
        } else {
          setSearchResults((prev) => [...prev, ...(data.results || [])]);
        }

        setHasMore(data.page < data.total_pages);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [searchTerm, page]);

  // Reset on search term change
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Navbar */}
      <header className="flex flex-col md:flex-row justify-between items-center px-8 py-6 border-b border-gray-700 gap-4 md:gap-0">
        <h1 className="text-2xl font-bold text-red-500">MovieMania</h1>

        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-red-500 w-full md:w-1/3"
        />
      </header>

      {/* Hero Section */}
      {searchTerm.trim() === '' && (
        <section className="text-center px-6 py-20">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">Stream. Discover. Enjoy.</h2>
          <p className="mt-6 text-lg max-w-xl mx-auto">
            Watch your favorite movies and shows anytime, anywhere.
          </p>
          <button className="mt-8 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full text-white font-semibold text-lg transition">
            Explore Now
          </button>
        </section>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <section className="px-6 py-10">
          <h3 className="text-2xl font-bold mb-4">Search Results</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {searchResults.map((movie, index) => {
              if (index === searchResults.length - 1) {
                return (
                  <div
                    ref={lastMovieRef}
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
                    <div className="p-4">
                      <h4 className="text-lg font-semibold">{movie.title}</h4>
                      <p className="text-sm text-gray-400">{movie.release_date}</p>
                    </div>
                  </div>
                );
              }

              return (
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
                  <div className="p-4">
                    <h4 className="text-lg font-semibold">{movie.title}</h4>
                    <p className="text-sm text-gray-400">{movie.release_date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Movie Carousels */}
      {searchTerm.trim() === '' && (
        <>
          <MovieCarousel
            title="Trending Now"
            fetchUrl={`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`}
          />
          <MovieCarousel
            title="Top Rated"
            fetchUrl={`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`}
          />
          <MovieCarousel
            title="Upcoming"
            fetchUrl={`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`}
          />
        </>
      )}

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} MovieMania. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
