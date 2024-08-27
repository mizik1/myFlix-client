import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://great-movies-flix-ecc6317feb54.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          setError("Login failed. Please check your credentials.");
        }
      })
      .catch(() => {
        setError("An error occurred. Please try again later.");
      });
  };

  return (
    <Row className="justify-content-center mt-5">
      <Col xs={12} sm={8} md={6} lg={4}>
        <Form onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3 mb-3">
            Login
          </Button>

          {/* Sign Up Button */}
          <div className="mt-3">
            <Link to="/signup">
              <Button variant="secondary">Sign Up</Button>
            </Link>
          </div>
        </Form>
      </Col>
    </Row>
  );
};
