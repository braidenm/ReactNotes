import React, { Component } from "react";
import NoteRow from "./NoteRow";
import { Note } from "../../interfaces/Note";
import { NoteRowProps } from "../../interfaces/NoteRowProps";

interface noteTableProps {
  notes: Note[];
  updateNote(note: Note, index: number): void;
  showCompleted: boolean;

}

interface noteTableState {
  noteRows: Component[];
}

export class NotesTable extends Component<noteTableProps, noteTableState> {
  constructor(props: noteTableProps) {
    super(props);

    this.state = {
      noteRows: [],
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    // this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.updateDisplayNotes = this.updateDisplayNotes.bind(this);
    this.markCompleted = this.markCompleted.bind(this);
    this.markCompleted = this.markCompleted.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.openRow = this.openRow.bind(this);
  }

  componentDidMount() {
    this.updateDisplayNotes(this.props.notes);
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps !== this.props) {
      this.updateDisplayNotes(this.props.notes);
    }
  }

  updateDisplayNotes(notes: Note[]) {
    let rowComponent: any = [];

    notes.forEach((note: Note, index: number) => {
      //if the toggle for show completed is true show all otherwise only show not completed notes
      if (this.props.showCompleted || !note.completed) {
        let noteRowProps: NoteRowProps = {
          index: index,
          note: note,
          openRow: this.openRow,
          markCompleted: this.markCompleted,
          deleteNote: this.deleteNote,
        };
  
        rowComponent.push(<NoteRow key={note.id} {...noteRowProps}></NoteRow>);
      }
    });

    this.setState({ noteRows: rowComponent });
  }

  openRow(index: number) {
    console.log("open row: " + index);
  }

  markCompleted(note: Note, index: number) {
    this.props.updateNote(note, index);
  }

  deleteNote(note: Note, index: number) {
    if(window.confirm("Are you sure you want to delete this note?")){
        note.deleted = true;
        this.props.updateNote(note, index);
    }
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
