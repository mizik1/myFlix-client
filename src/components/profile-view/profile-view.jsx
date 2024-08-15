import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

export const ProfileView = ({ user, favoriteMovie }) => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2>Profile</h2>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Birthdate:</strong> {new Date(user.birthday).toLocaleDateString()}
          </p>
          <p>
            <strong>Favorite Movie:</strong> {favoriteMovie ? favoriteMovie.Title : "No favorite movie selected"}
          </p>
          <Button variant="primary" onClick={() => navigate("/movies")}>
            {" "}
            {/* Navigate to /movies */}
            Back to Movies
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
