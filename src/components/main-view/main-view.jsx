import React, { useEffect, useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "../moviecard-view/moviecard-view";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { LogoffView } from "../logoff-view/logoff-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { AddFavoriteView } from "../add-favorite-view/add-favorite-view";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const fetchMovies = useCallback(() => {
    fetch("https://great-movies-flix-ecc6317feb54.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const sortedMovies = data.sort((a, b) => a.Title.localeCompare(b.Title));
        setMovies(sortedMovies);

        if (user.FavoriteMovies && user.FavoriteMovies.length > 0) {
          const favoriteMoviesList = sortedMovies.filter((movie) => user.FavoriteMovies.includes(movie._id));
          setFavoriteMovies(favoriteMoviesList);
        }
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token, user]);

  useEffect(() => {
    if (token) {
      fetchMovies();
    }
  }, [token, user, fetchMovies]);

  const handleLogoff = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const handleAddFavorite = (movieId) => {
    fetch(`https://great-movies-flix-ecc6317feb54.herokuapp.com/users/${user._id}/favorites/${movieId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add movie to favorites");
        }
        return response.json();
      })
      .then(() => {
        fetchMovies(); // Refresh movies after adding to favorites
        fetchUpdatedUserData(); // Refresh user data after adding to favorites
        alert("Movie added to favorites!");
      })
      .catch((error) => {
        console.error("Error adding movie to favorites:", error);
      });
  };

  const fetchUpdatedUserData = () => {
    fetch(`https://great-movies-flix-ecc6317feb54.herokuapp.com/users/name/${user.Username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        setUser(updatedUser);
      })
      .catch((error) => {
        console.error("Error fetching updated user data:", error);
      });
  };

  const handleRemoveFavorite = (movieId) => {
    fetch(`https://great-movies-flix-ecc6317feb54.herokuapp.com/users/${user._id}/favorites/${movieId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove movie from favorites");
        }
        return response.json();
      })
      .then(() => {
        fetchMovies(); // Refresh movies after removing from favorites
        fetchUpdatedUserData(); // Refresh user data after removing from favorites
        alert("Movie removed from favorites!");
      })
      .catch((error) => {
        console.error("Error removing movie from favorites:", error);
      });
  };

  const filteredMovies = movies.filter((movie) => movie.Title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Router>
      <NavigationBar user={user} />
      <Container>
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
                <>
                  <Row className="justify-content-center mb-4">
                    <Col xs={12} sm={8} md={6}>
                      <Form>
                        <Form.Control
                          type="text"
                          placeholder="Search for movies by title"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </Form>
                    </Col>
                  </Row>

                  <Row>
                    {filteredMovies.map((movie) => (
                      <Col key={movie._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </Row>
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/movies/:movieId"
            element={user ? <MovieView movies={movies} onAddFavorite={handleAddFavorite} /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={
              user ? (
                <ProfileView user={user} favoriteMovie={favoriteMovies} onRemoveFavorite={handleRemoveFavorite} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/logoff" element={<LogoffView onLogoff={handleLogoff} />} />
          <Route
            path="/add-favorite"
            element={
              user ? (
                <AddFavoriteView movies={movies} token={token} onAddFavorite={handleAddFavorite} fetchMovies={fetchMovies} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Container>
    </Router>
  );
};
