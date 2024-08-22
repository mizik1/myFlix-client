import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "../moviecard-view/moviecard-view";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { LogoffView } from "../logoff-view/logoff-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to store the filter input

  useEffect(() => {
    if (token) {
      fetch("https://great-movies-flix-ecc6317feb54.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch movies");
          }
          return response.json();
        })
        .then((data) => setMovies(data))
        .catch((error) => {
          console.error("Error fetching movies:", error);
        });
    }
  }, [token]);

  // Logoff handler
  const handleLogoff = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Filter movies based on the search query
  const filteredMovies = movies.filter((movie) => movie.Title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Router>
      <NavigationBar />
      <Container>
        {/* Search Bar */}
        <Row className="justify-content-center mb-4">
          <Col xs={12} sm={8} md={6} lang="{4}">
            <Form>
              <Form.Control
                type="text"
                placeholder="Search for movies by title"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
              />
            </Form>
          </Col>
        </Row>

        <Routes>
          <Route path="/" element={user ? <Navigate to="/movies" /> : <Navigate to="/login" />} />
          <Route
            path="/login"
            element={
              !user ? (
                <LoginView
                  onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                  }}
                />
              ) : (
                <Navigate to="/movies" />
              )
            }
          />
          <Route
            path="/signup"
            element={
              !user ? (
                <SignupView
                  onSignedUp={(user, token) => {
                    setUser(user);
                    setToken(token);
                  }}
                />
              ) : (
                <Navigate to="/movies" />
              )
            }
          />
          <Route
            path="/movies"
            element={
              user ? (
                <Row>
                  {/* Render the filtered movies */}
                  {filteredMovies.map((movie) => (
                    <Col key={movie._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                      <MovieCard movie={movie} />
                    </Col>
                  ))}
                </Row>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/movies/:movieId" element={user ? <MovieView movies={movies} /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <ProfileView user={user} /> : <Navigate to="/login" />} />
          <Route path="/logoff" element={<LogoffView onLogoff={handleLogoff} />} />
        </Routes>
      </Container>
    </Router>
  );
};
