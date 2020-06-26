/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from "react";
import me from "../photos/me.jpg";

export default class About extends Component {
  render() {
    return (
      <div className=" aboutSection">
        <div className="row">
          <div className="col-lg-10 offset-sm-2 ">
            <div className="row">
              <div className="col-lg-10" >
                <h3>About</h3>
                <br />
                <p>Welcome to Note App! Where you can remember things!</p>
                <br />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-10">
                <p>
                  Web-app designed to use a MySQL database with Java using SpringBoot and
                  viewed from REACT. See more details at GitHub:{" "}
                  <a target="_blank"  href="https://github.com/braidenm/Notes">
                    <strong>Repository</strong>
                  </a>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-10">
                <br />
                <h3>Created By:</h3>
                <br />
              </div>
            </div>

            <div className="row">
              <div className="col-lg-10">
                <img src={me} alt="me" style={{ width: "70%", height: "90%" }} />
                <br />
                <strong>Braiden Miller</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
