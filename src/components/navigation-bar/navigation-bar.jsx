import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Navbar.Brand as={Link} to="/">
        MyFlix
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/movies">
            Movies
          </Nav.Link>
          <Nav.Link as={Link} to="/profile">
            Profile
          </Nav.Link>
          <Nav.Link as={Link} to="/add-favorite">
            Add Movie
          </Nav.Link>
          {!user && (
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          )}
          {user && (
            <Nav.Link as={Link} to="/logoff">
              Logoff
            </Nav.Link>
          )}{" "}
          {/* Logoff link shown only when user is logged in */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
