import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Login from "./Login";
// import Button from "react-bootstrap/Button";

interface NavBarProps {
  setIsLoggedIn(isLoggedIn: boolean): void;
  isLoggedIn: boolean;
}
class NavBar extends Component<NavBarProps> {
  // state = {
  //   dog: "",
  // };

  render() {
    return (
      <div>
        <Navbar expand="lg" className="navbar-dark bg-dark fixed-top">
          <Link to="/notes">
            <Navbar.Brand>Notes</Navbar.Brand>
          </Link>
          <Navbar.Toggle />

          <Navbar.Collapse id="navbarNavDropdown">
              <div className="nav-spacing">
                <NavLink to="/home">Home</NavLink>
              </div>
              <div className="nav-spacing">
                <NavLink to="/profile">Profile</NavLink>
              </div>
              <div className="nav-spacing">
                <NavLink to="/about">About</NavLink>
              </div>
              {/* <div className="nav-spacing">
                <NavLink to="/admin">Admin</NavLink>
              </div> */}

            <ul className="nav navbar-nav right">
              <li>
                <Login
                  setIsLoggedIn={this.props.setIsLoggedIn}
                  isLoggedIn={this.props.isLoggedIn}
                ></Login>
              </li>
            </ul>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
