import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const NavBar = props => {
  return (
    <>
      <Navbar bg="light" variant="light" className="fixed-top">
        <Navbar.Brand href="/" style={{ fontSize: "1.5em", color: "#FA8D19" }}>
          LifeSkills
        </Navbar.Brand>
        <Nav className="mr-auto">
          {localStorage.getItem("authToken") ? (
            <>
              <Nav.Link href="/homepage">School Calendar</Nav.Link>
              <Nav.Link href="/profile">My Dashboard</Nav.Link>

              {JSON.parse(localStorage.getItem("isStudent")) ? null : (
                <Nav.Link href="/givepoints">Give Points</Nav.Link>
              )}

              <Nav.Link onClick={props.handleLogout}>Sign Out</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/login">Log In</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar>
    </>
  );
};

export default NavBar;
