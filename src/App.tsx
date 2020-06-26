// import { configureStore } from "@reduxjs/toolkit";
import React, { Component } from "react";
// import Container from "react-bootstrap/Nav";
import Row from "react-bootstrap/Nav";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import About from "./components/About";
import AdminWrapper from "./components/admin/AdminWrapper";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import NotePageWrapper from "./components/notes/NotePageWrapper";
import ProfileWrapper from "./components/profile/profileWrapper";
import Register from "./components/register";

// let state = {};
interface AppState {
  isLoggedIn: boolean;
}

export default class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isLoggedIn: false,
    };

    this.setIsLoggedIn = this.setIsLoggedIn.bind(this);
  }

  setIsLoggedIn(isLoggedIn: boolean) {
    console.log("in app setIsLoggedIn");

    this.setState({ isLoggedIn });
  }

  componentWillUnmount = () => {
    localStorage.removeItem("credentials");
  };

  render() {
    return (
      // <Provider store={store}>
      <div className="app">
          <Router>
            <div className="container">

              <Row style={{ marginBottom: "15%" }}>
                <div className="col-lg-12">
                  <NavBar
                    setIsLoggedIn={this.setIsLoggedIn}
                    isLoggedIn={this.state.isLoggedIn}
                  ></NavBar>
                </div>
              </Row>
            </div>
          <div className="container">
            <Row>
              <Switch>
                <Route path="/notes">
                  <div className="col-lg-8 offset-lg-2 notes">
                    {this.state.isLoggedIn ? (
                      <NotePageWrapper isLoggedIn={this.state.isLoggedIn} 
                      />) : (<Redirect to="/" />)}
                  </div>
                </Route>

                <Route path="/home">
                  <div className="col-lg-8 offset-lg-2">
                    <Home></Home>
                  </div>
                </Route>

                <Route path="/profile">
                  <div className="col-lg-8 offset-lg-2 ">
                    {this.state.isLoggedIn ? (
                      <ProfileWrapper
                        setIsLoggedIn={this.setIsLoggedIn}
                        isLoggedIn={this.state.isLoggedIn}
                      />) : (<Redirect to="/register" />)}
                  </div>
                </Route>

                <Route path="/register">
                  <div className="col-lg-8 offset-lg-2">
                    <Register
                      setIsLoggedIn={this.setIsLoggedIn}
                      isLoggedIn={this.state.isLoggedIn}
                    ></Register>
                  </div>
                </Route>

                <Route path="/admin">
                  <AdminWrapper></AdminWrapper>
                </Route>

                <Route path="/about">
                  <div className="col-lg-8 offset-lg-2">
                    <About></About>
                  </div>
                </Route>

                <Redirect from="/" to="/home" />
              </Switch>
            </Row>
          </div>
        </Router>
      </div>
      // </Provider>
    );
  }
}

// export default App;
