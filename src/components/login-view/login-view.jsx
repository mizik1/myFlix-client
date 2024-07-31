import React, { useState } from "react";

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

    // Sends post request to my API using fetch then response is parsed to JSON with token
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
          // Store user and token in localStorage
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);

          // Call the onLoggedIn function passed on as a prop
          onLoggedIn(data.user, data.token);
        } else {
          // Handle login failure
          setError("Login failed. Please check your credentials.");
        }
      })
      // catch any errors that happened during the fetch request
      .catch((error) => {
        setError("An error occurred. Please try again later.");
      });
  };

  // handle form submission. Username input and Password input
  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
