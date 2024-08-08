import React, { useEffect, useState } from "react";
import { MovieCard } from "../moviecard-view/moviecard-view";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]); // empty movie array
  const [isSigningUp, setIsSigningUp] = useState(false);

  // This retrieves the movies from the movie-api
  useEffect(() => {
    if (token) {
      const fetchMovies = async () => {
        fetch("https://great-movies-flix-ecc6317feb54.herokuapp.com/movies", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data); // Log the data to check the structure
            setMovies(data);
          })
          .catch((error) => console.log(error));
      };
      fetchMovies();
    }
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  if (!user) {
    return isSigningUp ? (
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <SignupView
              onSignedUp={(user, token) => {
                setUser(user);
                setToken(token);
                setIsSigningUp(false);
              }}
            />
            <button onClick={() => setIsSigningUp(false)}>Already have an account? Log in</button>
          </Col>
        </Row>
      </Container>
    ) : (
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
            <button onClick={() => setIsSigningUp(true)}>Don't have an account? Sign up</button>
          </Col>
        </Row>
      </Container>
    );
  }

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
  }

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <button onClick={handleLogout} className="btn btn-primary">
            Logout
          </button>
        </Col>
      </Row>
      <Row>
        {movies.map((movie) => (
          <Col key={movie._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <MovieCard onMovieClick={setSelectedMovie} movie={movie} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
