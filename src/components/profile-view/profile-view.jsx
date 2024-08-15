import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export const ProfileView = ({ user, favoriteMovie }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User data:", user);
  }, [user]);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2>Profile</h2>
          <p>
            <strong>User Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Birthdate:</strong> {moment(user.birthday).format("MMMM Do, YYYY")}
          </p>
          <p>
            <strong>Favorite Movies:</strong>
            {favoriteMovie && favoriteMovie.length > 0 ? (
              <ul>
                {favoriteMovie.map((movie) => (
                  <li key={movie._id}>{movie.Title}</li>
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
