// import { configureStore } from "@reduxjs/toolkit";
// import { createStore } from 'redux'
import React from "react";
// import { Provider } from "react-redux";
import "./App.css";
import NavBar from "./components/NavBar";
// import rootReducer from "./Reducers";
// import Container from "react-bootstrap/Nav";
import Row from "react-bootstrap/Nav";
import NotePageWrapper from "./components/notes/NotePageWrapper";

// const store = createStore(rootReducer);

function App() {
  return (
    // <Provider store={store}>
    <div className="app">
      <div className="container">
        <Row style={{ marginBottom: "7%" }}>
          <div className="col-lg-12">
            <NavBar></NavBar>
          </div>
        </Row>

        <Row>
          <div className="col-lg-8 offset-lg-2 notes">
            <NotePageWrapper></NotePageWrapper>
          </div>
        </Row>
      </div>
    </div>

    // </Provider>
  );
}

export default App;
