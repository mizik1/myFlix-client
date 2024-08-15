import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export const MovieView = ({ movie, onAddFavorite }) => {
  // Check if the movie object exists before rendering the movie details
  if (!movie) {
    return <div>Loading...</div>; // Show a loading message or spinner if the movie data is not yet available
  }

  return (
    <div>
      <h1>{movie.Title}</h1>
      <img src={movie.imageURL} alt={movie.Title} />
      <p>{movie.Description}</p>
      <p>Genre: {movie.Genre}</p>
      <p>Director: {movie.Director.Name}</p>
      <p>Director's Bio: {movie.Director.Bio}</p>
      <p>Director's Birth Date: {movie.Director.BirthDate}</p>
      <p>Director's Death Date: {movie.Director.DeathDate ? movie.Director.DeathDate : "N/A"}</p>

      <Link to="/movies" className="btn btn-warning">
        Back
      </Link>
      <Button variant="primary" onClick={() => onAddFavorite(movie._id)} className="ms-3">
        Add to favorites
      </Button>
    </div>
  );
};
