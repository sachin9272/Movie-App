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

1. Landing Page ![Screenshot 2025-05-26 015737](https://github.com/user-attachments/assets/077227c5-e8dd-48de-87f3-d89e788a2c6f)
2. Movie Search ![Screenshot 2025-05-26 015852](https://github.com/user-attachments/assets/2f1dc523-fb9e-447a-a26f-94b91891588c)
3. Movie Filter ![Screenshot 2025-05-26 020014](https://github.com/user-attachments/assets/86950a4b-57c4-47c3-9dad-b2c09795ec1a)
4. Favourite Movie ![Screenshot 2025-05-26 020028](https://github.com/user-attachments/assets/52adcc05-a9b0-4f95-b3f6-658b24c76c22)
5. Trending Movie ![Screenshot 2025-05-26 020046](https://github.com/user-attachments/assets/ade544ff-38e2-4789-b15e-18ebb88c1bd0)

## 📬 Contact

For questions or feedback, feel free to [open an issue](https://github.com/sachin9272/Movie-App/issues)  
or reach out via email at **sachinsingh9272@gmail.com**.

