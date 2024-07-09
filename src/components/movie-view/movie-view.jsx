import React from "react";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <h1>{movie.Title}</h1>
      <img src={movie.imageURL} alt={movie.Title} />
      <p>{movie.Description}</p>
      <p>Genre: {movie.Genre}</p>
      <p>Director: {movie.Name}</p>
      <p>{movie.Bio}</p>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

// This piece sets the order of how the chosen movie will be diplayed.
