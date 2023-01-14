import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const loginReducer = useSelector((state) => state.loginReducer);

  const logoutHandler = () => {
    setIsLoggedIn(false);
    navigate("/");
    localStorage.clear();
  };

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      setIsLoggedIn(true);
    }
  },[]);

  return (
    <header>
      <Navbar className="navbar" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand className="white-text">Swachh Bharat</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="nav-bar-options">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {isLoggedIn ? (
                <Nav.Link className="white-text p-1 mx-3">
                  {loginReducer.user.name.split(" ")[0]}
                </Nav.Link>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="white-text py-1 mx-3">Login</Nav.Link>
                </LinkContainer>
              )}

              {isLoggedIn ? (
                <LinkContainer to="/">
                  <Nav.Link
                    onClick={logoutHandler}
                    className="white-text p-1 mx-3"
                  >
                    Logout
                  </Nav.Link>
                </LinkContainer>
              ) : (
                <LinkContainer to="/register">
                  <Nav.Link className="white-text mx-3">Register</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
