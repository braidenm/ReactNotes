import React from "react";

export default function AddNote() {
  return (
    <div className="col">
      <form>
        <div className="col-lg-12">
          <input
            className="form-control"
            id="addTitle"
            type="text"
            name="title"
            placeholder="title"
          />
        </div>
        <div className="col-lg-3">
          <button type="submit" className="btn btn-outline-primary">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
