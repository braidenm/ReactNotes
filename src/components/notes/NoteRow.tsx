import React, { Component } from "react";
import { Note } from "../../interfaces/Note";
import { formatNoteDate } from "../../utilities/Filters";

interface NoteRowState{
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
