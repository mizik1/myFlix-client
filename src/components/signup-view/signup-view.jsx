import React, { useState } from "react";

export const SignupView = ({ onSignedUp }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: name,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    // Sends post request to my API using fetch then response is parsed to JSON with token
    fetch("https://great-movies-flix-ecc6317feb54.herokuapp.com/users", {
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

          // Call the onSignedUp function passed on as a prop
          onSignedUp(data.user, data.token);
        } else {
          // Handle signup failure
          setError("Signup failed. Please check your details.");
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
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required aria-label="Name" />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required aria-label="Password" />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required aria-label="Email" />
      </label>
      <label>
        Birthday:
        <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} required aria-label="Birthday" />
      </label>
      <button type="submit" aria-label="Submit your signup information">
        Submit
      </button>
    </form>
  );
};
