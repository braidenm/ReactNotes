import React, { Component } from "react";
import { Note } from "../../interfaces/Note";
import { formatNoteDate } from "../../utilities/Filters";
// import { Note } from "../../interfaces/Note";

interface NoteRowState{
  // note: Note;
  // title: string,
  // completed: boolean,
  // updated: Date,
  strikeOut: string;
}

export interface NoteRowProps{
  note: Note,
  index: number,
  toggleNoteView(note: Note):void,
  markCompleted(note: Note):void,
  deleteNote(note: Note):void,
}

export default class NoteRow extends Component<NoteRowProps, NoteRowState> {

  constructor(props: NoteRowProps){
    super(props);

    this.state = {
      // note: {},
      // title: '',
      // completed: false,
      // updated: null,
      strikeOut: ''
    }
    
  }

  componentDidMount = () =>{
    this.updateNoteView();
  }

  componentDidUpdate = (prevProps: any) => {
    if (prevProps.note !== this.props.note) {
       this.updateNoteView();
    }
  }

  updateNoteView = () => {
    let strikeOut = this.props.note.completed ? 'strikeout' : '';


    this.setState({strikeOut: strikeOut})
    

    // this.setState({title: this.props.note.title,
    //                 completed: this.props.note.completed,
    //                 updated: new Date(this.props.note.updated)
    //               strikeOut: strikeOut})
  }

  openRow = () => {
    this.props.toggleNoteView(this.props.note);
  }

  markCompleted = () => {
    let note = {...this.props.note};

    note.completed = !note.completed;

    this.props.markCompleted(note)
  }

  deleteNote = () => {
    this.props.deleteNote(this.props.note);
  }


  render() {
    return (
      <tr className={this.state.strikeOut}>
        <td className="title" onClick={this.openRow}>{this.props.note.title}</td>
        <td>
          <input type="checkbox" checked={this.props.note.completed} onChange={this.markCompleted}/>
        </td>
        <td>{formatNoteDate(this.props.note).updated}</td>
        <td>
          {" "}
          <button className="btn btn-danger" onClick={this.deleteNote}>X</button>
        </td>
      </tr>
    );
  }
}
