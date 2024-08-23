import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export const AddFavoriteView = ({ onAddFavorite, token }) => {
  // Accept token as a prop
  const [movieData, setMovieData] = useState({
    Title: "",
    Description: "",
    Genre: "",
    DirectorName: "",
    imageURL: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the data to the backend
    fetch("https://your-api-endpoint.com/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Use the token from props
      },
      body: JSON.stringify({
        Title: movieData.Title,
        Description: movieData.Description,
        Genre: movieData.Genre,
        Director: {
          Name: movieData.DirectorName,
        },
        imageURL: movieData.imageURL,
        Featured: false, // Default to false
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Movie added successfully!");
          onAddFavorite(); // Call any necessary handler to refresh or update the UI
        } else {
          throw new Error("Failed to add movie");
        }
      })
      .catch((error) => {
        console.error("Error adding movie:", error);
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Add a New Movie</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="Title"
                value={movieData.Title}
                onChange={handleInputChange}
                placeholder="Enter movie title"
                required
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="Description"
                value={movieData.Description}
                onChange={handleInputChange}
                placeholder="Enter movie description"
                required
              />
            </Form.Group>

            <Form.Group controlId="formGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                name="Genre"
                value={movieData.Genre}
                onChange={handleInputChange}
                placeholder="Enter movie genre"
                required
              />
            </Form.Group>

            <Form.Group controlId="formDirectorName">
              <Form.Label>Director Name</Form.Label>
              <Form.Control
                type="text"
                name="DirectorName"
                value={movieData.DirectorName}
                onChange={handleInputChange}
                placeholder="Enter director's name"
                required
              />
            </Form.Group>

            <Form.Group controlId="formImageURL">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="imageURL"
                value={movieData.imageURL}
                onChange={handleInputChange}
                placeholder="Enter movie image URL"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Add Movie
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
