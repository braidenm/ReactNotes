// import { configureStore } from "@reduxjs/toolkit";
import React, { Component } from "react";
import { Provider } from "react-redux";
import "./App.css";
import NavBar from "./components/NavBar";
// import Container from "react-bootstrap/Nav";
import Row from "react-bootstrap/Nav";
import NotePageWrapper from "./components/notes/NotePageWrapper";
import store from "./store"


// let state = {};
interface AppState{
  isLoggedIn: boolean
}

export default class App extends Component<{}, AppState>{

  constructor(props: any){
      super(props);

      this.state = {
        isLoggedIn: false
      }

      this.setIsLoggedIn = this.setIsLoggedIn.bind(this);
  }

  setIsLoggedIn(isLoggedIn: boolean){
    console.log("in app setIsLoggedIn");
    
      this.setState({isLoggedIn})
  }
  
render(){
  return (
    
    // <Provider store={store}>
      <div className="app">
        <div className="container">
          <Row style={{ marginBottom: "10%" }}>
            <div className="col-lg-12">
              <NavBar setIsLoggedIn={this.setIsLoggedIn}></NavBar>
            </div>
          </Row>

          <Row>
            <div className="col-lg-8 offset-lg-2 notes">
              <NotePageWrapper isLoggedIn={this.state.isLoggedIn}></NotePageWrapper>
            </div>
          </Row>
        </div>
      </div>
    // </Provider>
  );
}
}

// export default App;
