import React, { Component } from 'react';
import { Note } from '../../interfaces/Note';
import { preventDefault } from "../../utilities/Utilities";


interface AddNoteProps{
  updateNote(note: Note, index: number): void;
}

interface AddNoteState{
  title: string
}


export default class AddNote extends Component<AddNoteProps, AddNoteState> {

constructor(props: any){
  super(props);
  this.state = { 
    title: ''
  }

  this.addNote = this.addNote.bind(this);
  this.onChangeTitle = this.onChangeTitle.bind(this);
}
   

  addNote(){
    let note: Note = {
      // id:  Math.floor(Math.random() * (10000 - 7)) + 7,
      title: this.state.title,
      completed: false,
      deleted: false
    }

    //-1 to indicate it is a new note
    this.props.updateNote(note, -1)

    this.setState({title: ''});

  }

  onChangeTitle(event:any){
      this.setState({title: event.target.value})
  }

  


  render() {
    return (
      <div className="col">
      <form onSubmit={preventDefault}>
        <div className="col-lg-12">
          <input
            className="form-control"
            type="text"
            value={this.state.title}
            placeholder="title"
            onChange={this.onChangeTitle}
          />
        </div>
        <div className="col-lg-3">
          <button onClick={this.addNote} type="button" className="btn btn-outline-primary">
            Add
          </button>
        </div>
      </form >
    </div>
    )
  }
}

