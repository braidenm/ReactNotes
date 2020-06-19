import React, { Component } from "react";
import { Note } from "../../interfaces/note";


export default class NoteRow extends Component<Note> {

  // constructor(props: Note){
  //   super(props);

  //   this.state = {}
    
  // }


  render() {
    return (
      <tr>
        <td className="title">{this.props.title}</td>
        <td>
          <input type="checkbox" />
        </td>
        <td>{this.props.updated}</td>
        <td>
          {" "}
          <button className="btn btn-danger">X</button>
        </td>
      </tr>
    );
  }
}
