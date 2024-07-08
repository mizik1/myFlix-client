import React from "react";

export const MovieCard = ({ movie }) => {
  return (
    <div>
      <img src={movie.imageURL} alt={movie.Title} />
      <h2>{movie.Title}</h2>
      <p>{movie.Description}</p>
    </div>
  );
};
