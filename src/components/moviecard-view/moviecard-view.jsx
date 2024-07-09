import React from "react";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div onClick={() => onMovieClick(movie)}>
      <h2>{movie.Title}</h2>
    </div>
  );
};
