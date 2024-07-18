import React from "react";
import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      <img src={movie.imageURL} alt={movie.Title} />
      <h2>{movie.Title}</h2>
      <p>{movie.Description}</p>
    </div>
  );
};

// Prop types
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      BirthDate: PropTypes.string.isRequired,
      DeathDate: PropTypes.string,
    }).isRequired,
    imageURL: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
    movieid: PropTypes.number.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
