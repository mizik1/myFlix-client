import React from "react";
import { useParams, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MovieView = ({ movies, onAddFavorite }) => {
  const { movieId } = useParams(); // Extract the movieId from the URL parameters
  const movie = movies.find((movie) => movie._id === movieId); // Find the movie by its ID

  // Check if the movie object exists before rendering the movie details
  if (!movie) {
    return <div>Loading...</div>; // Show a loading message or spinner if the movie data is not yet available
  }

  return (
    <Row className="justify-content-center mt-5">
      {" "}
      {/* Center the content horizontally */}
      <Col md={6} xs={12}>
        {" "}
        {/* 50% width on medium and larger screens, full width on smaller screens */}
        <h1>{movie.Title}</h1>
        <img src={movie.imageURL} alt={movie.Title} className="img-fluid" /> {/* Ensure image is responsive */}
        <p className="mt-4">
          {" "}
          {/*adds a top margin to the description */}
          <strong>Description:</strong> {movie.Description}
        </p>
        <p>
          <strong>Genre:</strong> {movie.Genre}
        </p>
        <p>
          <strong>Director:</strong> {movie.Director.Name}
        </p>
        <p>
          <strong>Director's Biography:</strong> {movie.Director.Bio}
        </p>
        <p>
          <strong>Director's Birth Date:</strong> {movie.Director.BirthDate}
        </p>
        <p>
          <strong>Director's Death Date:</strong> {movie.Director.DeathDate ? movie.Director.DeathDate : "N/A"}
        </p>
        <Link to="/movies" className="btn btn-warning">
          Back
        </Link>
        <Button variant="primary" onClick={() => onAddFavorite(movie._id)} className="ms-3">
          Add to my favorites
        </Button>
      </Col>
    </Row>
  );
};
