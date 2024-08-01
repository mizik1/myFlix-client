import React, { useEffect, useState } from "react";
import { MovieCard } from "../moviecard-view/moviecard-view";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

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
      <SignupView
        onSignedUp={(user, token) => {
          setUser(user);
          setToken(token);
          setIsSigningUp(false);
        }}
      />
    ) : (
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
    );
  }

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      {movies.map((movie) => (
        <MovieCard key={movie._id} onMovieClick={setSelectedMovie} movie={movie} />
      ))}
    </div>
  );
};
