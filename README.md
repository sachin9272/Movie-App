## Movie App 📽️



Movie App is a modern, responsive web application built with React, allowing users to discover, search, and favorite movies using the TMDB API. With an intuitive UI styled with Tailwind CSS, users can explore trending, top-rated, and upcoming movies, apply advanced filters, and save favorites that persist across sessions using localStorage. The app supports client-side routing with React Router and is optimized for deployment to platforms like GitHub Pages, Netlify, and Vercel.

## 🚀Features

Movie Discovery: Browse trending, top-rated, and upcoming movies in sleek horizontal carousels.
Search & Filter: Search by title and filter by genre, release year, or rating.
Favorites System: Add/remove movies to a favorites list, stored in localStorage for persistence.
Responsive Design: Mobile-first layout with Tailwind CSS.
Client-Side Routing: Seamless navigation between home (/) and favorites (/favourite) pages.
Deployment-Ready: Configured for subdirectory hosting (e.g., /Movie-App/) with routing fixes.

## 🌐Demo
https://sachin9272.github.io/Movie-App/

## ⚙️Installation

1. Clone the Repository:

```bash
git clone https://github.com/sachin9272/Movie-App.git
cd Movie-App
```

2. Install Dependencies:

```bash
npm install
```

3. Set Up Environment Variables:

```bash
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
```

4. Run Locally:

```bash
npm run dev
```

## 🚀 Usage

### 🏠 Home Page (`/`):

- 🎞️ Explore movie carousels for trending, top-rated, and upcoming titles.
- 🔍 Use the search bar to find movies by title.
- 🧰 Apply filters (genre, year range, rating) to refine results.
- ❤️ Click the heart button to add/remove movies from favorites.

### ⭐ Favorites Page (`/favourite`):

- 🖼️ View favorited movies in a grid layout.
- ❌ Click "Remove" to delete a movie from favorites.
- 🔙 Navigate back to the home page via the "Back to Home" button.

### 💾 Favorites Persistence:

- 🗃️ Favorites are saved in `localStorage` under `favoriteMovies`.
- 🔄 Persist across page refreshes and browser sessions.


## ✅ Prerequisites

- **Node.js**: Version 16 or higher  
- **npm**: Version 8 or higher  
- **TMDB API Key**: Obtain from [The Movie Database (TMDB)](https://www.themoviedb.org/)




## 📸Screenshots

1. Landing Page ![Screenshot 2025-05-27 000849](https://github.com/user-attachments/assets/aa6f4a0e-1211-4fe2-a44c-5df05132ba74)
2. Movie Search ![Screenshot 2025-05-27 000922](https://github.com/user-attachments/assets/dbecdec2-9664-4fb7-a2cf-a2e1c734246e)
3. Movie Filter ![Screenshot 2025-05-27 001634](https://github.com/user-attachments/assets/0dcd6c8f-9611-4d78-8fd7-d417678e9df4)
4. Favourite Movie ![Screenshot 2025-05-27 000943](https://github.com/user-attachments/assets/02c46f19-02ae-4540-be7c-beaa859811df)
5. Trending Movie ![Screenshot 2025-05-27 001003](https://github.com/user-attachments/assets/a071e06f-17dc-48f2-9303-bbd5f6fdef96)


## 📬 Contact

For questions or feedback, feel free to [open an issue](https://github.com/sachin9272/Movie-App/issues)  
or reach out via email at **sachinsingh9272@gmail.com**.

