import React, { Component } from "react";
import { Link } from "react-router-dom";
import {checkLogin} from "../auth/auth"

export default class Home extends Component {

    showButton = () => {
        if(checkLogin()){
            return (<Link to="/notes" className="btn btn-outline-primary">See Your Notes</Link>);
        } else {
            return (<Link to="/register" className="btn btn-outline-primary">Register</Link>);
        }
    }

  render() {
    return (
      <div>
          
          <div className="col-lg-12 welcome">
            <h1>Welcome to The Note App</h1>
            <h3>Remember things by writing them down</h3>
            <hr />
            
            {this.showButton()}
            
          </div>
      </div>
    );
  }
}
