import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export const ProfileView = ({ user, favoriteMovie, onRemoveFavorite }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User data:", user);
    console.log("Favorite Movies:", favoriteMovie);
  }, [user, favoriteMovie]);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2>Profile</h2>
          <p>
            <strong>User Name:</strong> {user.Username}
          </p>
          <p>
            <strong>Email:</strong> {user.Email}
          </p>
          <p>
            <strong>Birthdate:</strong> {moment(user.birthday).format("MMMM Do, YYYY")}
          </p>
          <p>
            <strong>Favorite Movies:</strong>
            {favoriteMovie && favoriteMovie.length > 0 ? (
              <ul className="list-unstyled favorite-movies-list">
                {favoriteMovie.map((movie) => (
                  <li key={movie._id} className="favorite-movie-item">
                    <span className="movie-title">{movie.Title}</span>
                    <button
                      className="delete-button"
                      onClick={() => onRemoveFavorite(movie._id)} // Call the function when clicked
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              "No favorite movies selected"
            )}
          </p>
          <Button variant="primary" onClick={() => navigate("/movies")}>
            Back to Movies
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
