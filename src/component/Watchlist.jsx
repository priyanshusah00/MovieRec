import { useState, useEffect } from "react";
import MovieCard2 from "./MovieCard2";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    setWatchlist(JSON.parse(localStorage.getItem("watchlist")) || []);
  }, []);

  const removeFromWatchlist = (id) => {
    const updatedList = watchlist.filter((movie) => movie.id !== id);
    setWatchlist(updatedList);
    localStorage.setItem("watchlist", JSON.stringify(updatedList));
  };

  return (
    <div>
      <h2>📌 Your Watchlist</h2>
      <div className="movie-grid">
        {watchlist.length === 0 ? (
          <p>No movies added yet!</p>
        ) : (
          watchlist.map((movie) => (
            <div key={movie.id}>
              <MovieCard2 movie={movie} />
              <button className="watchlistButton" onClick={() => removeFromWatchlist(movie.id)}>Remove</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Watchlist;
