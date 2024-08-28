import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export const AddFavoriteView = ({ onAddFavorite, token }) => {
  const [movieData, setMovieData] = useState({
    Title: "",
    Description: "",
    Genre: "",
    DirectorName: "",
    DirectorBio: "",
    DirectorBirthDate: "",
    imageURL: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://great-movies-flix-ecc6317feb54.herokuapp.com/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        Title: movieData.Title,
        Description: movieData.Description,
        Genre: movieData.Genre,
        Director: {
          Name: movieData.DirectorName,
          Bio: movieData.DirectorBio,
          BirthDate: movieData.DirectorBirthDate,
        },
        imageURL: movieData.imageURL,
        Featured: false,
      }),
    })
      .then((response) => {
        console.log("Response:", response);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Failed to add movie: ${response.statusText}`);
        }
      })
      .then((data) => {
        console.log("Movie added:", data);
        alert("Movie added successfully!");
        if (onAddFavorite) {
          onAddFavorite(); // Update UI after adding movie
        }
      })
      .catch((error) => {
        console.error("Error adding movie:", error);
        alert(`Error adding movie: ${error.message}`);
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

            <Form.Group controlId="formDirectorBio">
              <Form.Label>Director Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="DirectorBio"
                value={movieData.DirectorBio}
                onChange={handleInputChange}
                placeholder="Enter director's bio"
                required
              />
            </Form.Group>

            <Form.Group controlId="formDirectorBirthDate">
              <Form.Label>Director Birth Date</Form.Label>
              <Form.Control
                type="date"
                name="DirectorBirthDate"
                value={movieData.DirectorBirthDate}
                onChange={handleInputChange}
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
