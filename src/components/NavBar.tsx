import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
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
        <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <Link to="/notes">
            <Navbar.Brand>Notes</Navbar.Brand>
          </Link>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <div className="nav-spacing">
                <NavLink to="/home">Home</NavLink>
              </div>
              <div className="nav-spacing">
                <NavLink to="/profile">Profile</NavLink>
              </div>
              <div className="nav-spacing">
                <NavLink to="/about">About</NavLink>
              </div>
              <div className="nav-spacing">
                <NavLink to="/admin">Admin</NavLink>
              </div>

            <ul className="nav navbar-nav right">
              <li>
                <Login setIsLoggedIn={this.props.setIsLoggedIn} isLoggedIn={this.props.isLoggedIn}></Login>
              </li>
            </ul>
          </div>
        </Navbar>

        {/* <h1>{this.state.dog}</h1> */}
      </div>
    );
  }
}

export default NavBar;
