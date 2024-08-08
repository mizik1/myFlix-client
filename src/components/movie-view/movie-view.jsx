import React from "react";
import Button from "react-bootstrap/Button";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <h1>{movie.Title}</h1>
      <img src={movie.imageURL} alt={movie.Title} />
      <p>{movie.Description}</p>
      <p>Genre: {movie.Genre}</p>
      <p>Director: {movie.Name}</p>
      <p>{movie.Bio}</p>
      <Button variant="secondary" onClick={onBackClick}>
        Back
      </Button>
    </div>
  );
};
