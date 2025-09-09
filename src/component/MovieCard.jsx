const MovieCard = ({ movie }) => {
  const addToWatchlist = () => {
    let savedMovies = JSON.parse(localStorage.getItem("watchlist")) || [];
    if (!savedMovies.some((m) => m.id === movie.id)) {
      savedMovies.push(movie);
      localStorage.setItem("watchlist", JSON.stringify(savedMovies));
      alert("Added to Watchlist!");
    } else {
      alert("Already in Watchlist!");
    }
  };

  return (
    <div className="movie-card">
      <h3>{movie.title}</h3>
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      <button onClick={addToWatchlist}>Add to Watchlist</button>
    </div>
  );
};

export default MovieCard;
