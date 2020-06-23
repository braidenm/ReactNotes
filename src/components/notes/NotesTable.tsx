import React, { Component } from "react";
import { Note } from "../../interfaces/Note";
import NoteRow, { NoteRowProps } from "./NoteRow";

interface noteTableProps {
  notes: Note[];
  updateNote(note: Note): void;
  showCompleted: boolean;
  toggleNoteView(note: Note): void
}

interface noteTableState {
  noteRows: Component[];
  selectedNoteId: number;
}

export class NotesTable extends Component<noteTableProps, noteTableState> {
  constructor(props: noteTableProps) {
    super(props);

    this.state = {
      noteRows: [],
      selectedNoteId: 0,
    };
  }

  componentDidMount = () => {
    this.updateDisplayNotes(this.props.notes);
  };

  componentDidUpdate = (prevProps: any) => {
    if (prevProps !== this.props) {
      this.updateDisplayNotes(this.props.notes);
    }
  };

  //pass in 0 to see all notes
  // getSelectedNote = (noteId: number) => {
  //   this.setState({ selectedNoteId: noteId });
  // };

  updateDisplayNotes = (notes: Note[]) => {
    let rowComponent: any = [];

    notes.forEach((note: Note, index: number) => {
      //if the toggle for show completed is true show all otherwise only show not completed notes
      if (this.props.showCompleted || !note.completed) {
        let noteRowProps: NoteRowProps = {
          index: index,
          note: note,
          toggleNoteView: this.props.toggleNoteView,
          markCompleted: this.markCompleted,
          deleteNote: this.deleteNote,
        };

        rowComponent.push(<NoteRow key={note.id} {...noteRowProps}></NoteRow>);
      }
    });

    this.setState({ noteRows: rowComponent });
  };

  



  markCompleted = (note: Note) => {
    this.props.updateNote(note);
  };

  deleteNote = (note: Note) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      note.deleted = true;
      this.props.updateNote(note);
    }
  };

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
