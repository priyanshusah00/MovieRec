import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  // Add new state variables
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("popularity");

  // Update useEffect to handle pagination and loading states
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}&page=${currentPage}`);
        setMovies(response.data.results);
        setError(null);
      } catch (err) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage]);

  // Add sorting function
  const sortMovies = (movies) => {
    switch (sortBy) {
      case "title":
        return [...movies].sort((a, b) => a.title.localeCompare(b.title));
      case "rating":
        return [...movies].sort((a, b) => b.vote_average - a.vote_average);
      case "release_date":
        return [...movies].sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
      default:
        return movies;
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <div className="controls">
        <input
          type="text"
          placeholder="🔍Search movies..."
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="popularity">Sort by Popularity</option>
          <option value="rating">Sort by Rating</option>
          <option value="title">Sort by Title</option>
          <option value="release_date">Sort by Release Date</option>
        </select>
      </div>

      <div className="movie-grid">
        {sortMovies(movies)
          .filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase()))
          .map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>

      <div className="pagination">
        <button 
          onClick={() => setCurrentPage(prev => prev - 1)}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button 
          onClick={() => setCurrentPage(prev => prev + 1)}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;