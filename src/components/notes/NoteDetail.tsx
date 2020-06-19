import React, { Component } from "react";

export default class NoteDetail extends Component {
  render() {
    return (
      <div>
        <div className="col-sm-6 notes">
          <br />
          <div>
            <br />

            <form>
              <input
                className="form-control"
                id="addTitle"
                type="text"
                name="title"
                placeholder="title"
              />
              <button type="submit" className="btn btn-outline-primary">
                Add
              </button>
            </form>
          </div>

          <div>
            <h3>selected.title</h3>
            <hr />
            <p>selected.details</p>
            <hr />
            <button className="btn btn-outline-primary">Edit</button>
            <button className="btn btn-outline-success">Show Table</button>
            <br />
          </div>

          <form>
            Title: <input className="form-control" type="text" name="title" />
            Details:{" "}
            <textarea className="form-control" name="details"></textarea>
            <input
              className="btn btn-outline-secondary"
              type="button"
              name="cancel"
              value="Cancel"
            />
            <input
              type="button"
              className="btn btn-outline-primary"
              name="updateNote"
              value="Save"
            />
          </form>
          <br />
        </div>
      </div>
    );
  }
}
