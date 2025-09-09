import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(API_URL).then((response) => setMovies(response.data.results));
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="🔍Search movies..."
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <div className="movie-grid">
        {movies
          .filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase()))
          .map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default Home;
