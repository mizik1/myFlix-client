import React, { useEffect, useState } from "react";
import { MovieCard } from "../moviecard-view/moviecard-view";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]); // empty movie array

  useEffect(() => {
    const fetchMovies = async () => {
      fetch("https://great-movies-flix-ecc6317feb54.herokuapp.com/movies")
        .then((response) => response.json())
        .then((data) => {
          setMovies(data);
        })
        .catch((error) => console.log(error));
    };
    fetchMovies();
  }, []);

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie._id} onMovieClick={setSelectedMovie} movie={movie} />
      ))}
    </div>
  );
};
