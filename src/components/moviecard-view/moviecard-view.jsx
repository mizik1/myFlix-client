import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  const imageSrc = movie.imageURL ? movie.imageURL : "path/to/placeholder.jpg";

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={imageSrc} className="object-fit-contain" alt={movie.Title} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{movie.Title}</Card.Title>
        <Link to={`/movies/${movie._id}`} className="mt-auto btn btn-primary">
          Open
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    imageURL: PropTypes.string, // Optional image
  }).isRequired,
};
