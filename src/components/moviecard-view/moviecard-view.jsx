import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  const imageSrc = movie.imageURL ? movie.imageURL : "path/to/placeholder.jpg";

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={imageSrc} style={{ height: "200px", objectFit: "cover" }} alt={movie.Title} />
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
