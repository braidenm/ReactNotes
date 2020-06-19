import React, { Component } from "react";
import NoteRow from "./NoteRow";
import { Note } from "../../interfaces/note";

interface noteTableProps{
  notes: Note[],
}

interface noteTableState{
  noteRows: Component[],
}

export class NotesTable extends Component<noteTableProps, noteTableState> {


  constructor(props: noteTableProps) {
    super(props);

    this.state = { 
      noteRows: [],
    };

    console.log(props.notes[0]);
    
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount(){
    let rowComponent: any = [];

    this.props.notes.forEach((note: Note) => {
      rowComponent.push(<NoteRow key={note.id} {...note}></NoteRow>);
         });

    this.setState({noteRows: rowComponent});
  }

  render() {

    return (
      <div className="notesBody">
        <table
          className="table table-striped table-hover"
          style={{ border: "solid" }}
        >
          <thead className="thead-dark">
            <tr>
              <th>Title</th>
              <th>Mark</th>
              <th>Last Updated</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{this.state.noteRows}</tbody>
        </table>
      </div>
    );
  }

}
