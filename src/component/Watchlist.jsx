import { useState, useEffect } from "react";
import MovieCard2 from "./MovieCard2";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    // Load watchlist with ratings
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(savedWatchlist.map(movie => ({
      ...movie,
      rating: movie.rating || 0
    })));
  }, []);

  const removeFromWatchlist = (id) => {
    const updatedList = watchlist.filter((movie) => movie.id !== id);
    setWatchlist(updatedList);
    localStorage.setItem("watchlist", JSON.stringify(updatedList));
  };

  const handleRating = (movieId, rating) => {
    const updatedList = watchlist.map(movie => 
      movie.id === movieId ? { ...movie, rating } : movie
    );
    setWatchlist(updatedList);
    localStorage.setItem("watchlist", JSON.stringify(updatedList));
  };

  const StarRating = ({ rating, onRate }) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => onRate(star)}
            className={`star ${star <= rating ? 'filled' : ''}`}
          >
            {star <= rating ? '★' : '☆'}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2>📌 Your Watchlist</h2>
      <div className="movie-grid">
        {watchlist.length === 0 ? (
          <p>No movies added yet!</p>
        ) : (
          watchlist.map((movie) => (
            <div key={movie.id} className="watchlist-item">
              <MovieCard2 movie={movie} />
              <StarRating 
                rating={movie.rating} 
                onRate={(rating) => handleRating(movie.id, rating)} 
              />
              <button className="watchlistButton" onClick={() => removeFromWatchlist(movie.id)}>
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Watchlist;