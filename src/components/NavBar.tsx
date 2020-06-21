import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Login from "./Login";
// import Button from "react-bootstrap/Button";

class NavBar extends Component<{ setIsLoggedIn(isLoggedIn: boolean): void }> {
  // state = {
  //   dog: "",
  // };

  render() {
    return (
      <div>
        <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <Navbar.Brand>Notes</Navbar.Brand>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Nav.Link>
                  Home <span className="sr-only">(current)</span>
                </Nav.Link>
              </li>
              <li className="nav-item">
                <Nav.Link>Profile</Nav.Link>
              </li>
              <li className="nav-item">
                <Nav.Link>About</Nav.Link>
              </li>
              <li className="nav-item">
                <Nav.Link></Nav.Link>
              </li>
            </ul>
            <ul className="nav navbar-nav right">
              <li className="nav-item ">
                <Login setIsLoggedIn={this.props.setIsLoggedIn}></Login>
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
