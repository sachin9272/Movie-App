import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import FavouritePage from './pages/FavouritePage';
import Footer from './components/Footer';

const App = () => {
  // Initialize favorites synchronously from localStorage
  const initialFavorites = (() => {
    try {
      const stored = localStorage.getItem('favoriteMovies');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('App: Error parsing initial favorites from localStorage:', error);
      return [];
    }
  })();

  const [favorites, setFavorites] = useState(initialFavorites);

  // Log initial state
  useEffect(() => {
    console.log('App: Initial favorites on mount:', favorites);
    console.log('App: localStorage favoriteMovies on mount:', localStorage.getItem('favoriteMovies'));
  }, []);

  // Update localStorage when favorites change, but skip initial empty state
  useEffect(() => {
    try {
      console.log('App: Saving favorites to localStorage:', favorites);
      localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
      console.log('App: localStorage favoriteMovies after save:', localStorage.getItem('favoriteMovies'));
    } catch (error) {
      console.error('App: Error saving favorites to localStorage:', error);
    }
  }, [favorites]);

  // Toggle favorite movie
  const toggleFavorite = (movie) => {
    const movieData = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    };
    setFavorites((prev) => {
      const isFavorited = prev.some((fav) => fav.id === movie.id);
      const newFavorites = isFavorited
        ? prev.filter((fav) => fav.id !== movie.id)
        : [...prev, movieData];
      console.log('App: Toggled favorite. New favorites:', newFavorites);
      return newFavorites;
    });
  };

  // Remove favorite movie
  const removeFavorite = (movieId) => {
    setFavorites((prev) => {
      const newFavorites = prev.filter((fav) => fav.id !== movieId);
      console.log('App: Removed favorite. New favorites:', newFavorites);
      return newFavorites;
    });
  };

  return (
    <Router basename="/Movie-App">
      <Routes>
        <Route
          path="/"
          element={<LandingPage favorites={favorites} toggleFavorite={toggleFavorite} />}
        />
        <Route
          path="/favourite"
          element={<FavouritePage favorites={favorites} removeFavorite={removeFavorite} />}
        />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;