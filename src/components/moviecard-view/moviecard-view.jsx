import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  // Check if movie.imageURL exists, if not use a placeholder image
  const imageSrc = movie.imageURL ? movie.imageURL : "path/to/placeholder.jpg";

  return (
    <Card className="h-100">
      {/* Adjusted the style of Card.Img to ensure the image is fully visible */}
      <Card.Img
        variant="top"
        src={imageSrc}
        style={{
          height: "200px", // Set a fixed height for the image
          objectFit: "contain", // Ensure the image is fully visible inside the fixed height
          objectPosition: "center", // Center the image within the container
        }}
        alt={movie.Title}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{movie.Title}</Card.Title>
        <Button variant="primary" onClick={() => onMovieClick(movie)} className="mt-auto">
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    imageURL: PropTypes.string, // Make this optional
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
