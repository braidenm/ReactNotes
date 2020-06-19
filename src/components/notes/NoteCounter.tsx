import React, { Component } from "react";

export default class NoteCounter extends Component {
  render() {
    return (
        <div className="col-lg-6">
          <h1>
            title <span className="count">count</span>{" "}
          </h1>
        </div>
    );
  }
}
