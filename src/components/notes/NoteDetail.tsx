import React, { Component } from "react";
import { Note } from "../../interfaces/Note";

interface NoteDetailState {
  showEdit: boolean;
  editingNote: Note;
  selectedNote: Note;
}
interface NoteDetailProps {
  selectedNote: Note;
  toggleNoteView(note: Note): void;
  updateNote(note: Note): void;
}

export default class NoteDetail extends Component<
  NoteDetailProps,
  NoteDetailState
> {
  constructor(props: NoteDetailProps) {
    super(props);

    this.state = {
      showEdit: false,
      editingNote: {},
      selectedNote: {
        title: ' ',
        details: ' '
      },
    };
  }

  componentDidUpdate = (preProps: NoteDetailProps) => {
    if(preProps !== this.props){
      let tempNote = { ...this.props.selectedNote };

      tempNote.title = tempNote.title ? tempNote.title: '';
      tempNote.details = tempNote.details ? tempNote.details: '';
  
      this.setState({
        selectedNote: { ...tempNote },
        editingNote: { ...tempNote },
        showEdit: false
      });
    }
  }

  componentDidMount = () => {
    let tempNote = { ...this.props.selectedNote };

    tempNote.title = tempNote.title ? tempNote.title: '';
    tempNote.details = tempNote.details ? tempNote.details: '';

    this.setState({
      selectedNote: { ...tempNote },
      editingNote: { ...tempNote },
    });
  };

  toggleEdit = () => {
    this.setState({ showEdit: !this.state.showEdit });
  };

  showTable = () => {
    this.props.toggleNoteView({});
  };

  changeDetails = (event: any) => {
    let tempNote = { ...this.state.editingNote };

    tempNote.details = event.target.value;

    this.setState({ editingNote: { ...tempNote } });
  };

  changeTitle = (event: any) => {
    let tempNote = { ...this.state.editingNote };

    tempNote.title = event.target.value;

    this.setState({ editingNote: { ...tempNote } });
  };

  cancel = () => {
    this.setState({
      editingNote: { ...this.state.selectedNote },
      showEdit: false,
    });
  };

  save = () => {
    this.props.updateNote(this.state.editingNote);
  };

  render() {
    if (this.state.showEdit) {
      return (
        <div className="note-wrapper-page">
          <form className="form-group" onSubmit={(event) => {event.preventDefault()}}>

            <label>Title:</label>
            <input
              onChange={this.changeTitle}
              className="form-control"
              style={{margin: '0%', marginBottom: '4%'}}
              type="text"
              name="title"
              value={this.state.editingNote.title}
            />

            <label>Details:</label>
            <textarea
              onChange={this.changeDetails}
              className="form-control"
              name="details"
              value={this.state.editingNote.details}
            ></textarea>

            <input
              className="btn btn-outline-secondary"
              type="button"
              name="cancel"
              value="Cancel"
              onClick={this.cancel}
            />
            <input
              type="button"
              className="btn btn-outline-primary"
              name="updateNote"
              value="Save"
              onClick={this.save}

            />
          </form>
        </div>
      );
    } else {
      return (
        <div className="note-wrapper-page">
          <h3>{this.state.selectedNote.title}</h3>
          <hr />
          <p>{this.state.selectedNote.details}</p>
          <hr />
          <button onClick={this.toggleEdit} className="btn btn-outline-primary detail-buttons">
            Edit
          </button>
          <button onClick={this.showTable} className="btn btn-outline-success detail-buttons" >
            Show Table
          </button>
        </div>
      );
    }
  }
}
