import axios from "axios";
import React, { Component } from "react";
import { getHttp, noteUrl } from "../../auth/auth";
import { Note } from "../../interfaces/Note";
import { removeCompletedNotes, sortNotes } from "../../utilities/Filters";
import AddNote from "./AddNote";
import NoteCounter from "./NoteCounter";
import NoteDetail from "./NoteDetail";
import { NotesTable } from "./NotesTable";
import Search from "./Search";

interface noteState {
  allNotes: Note[];
  // displayNotes: Note[];
  noteCount: number;
  marked: boolean;
  selectedNote: Note;
}

interface NoteProps{
  // getAllNotes(): Note[],
  // insertNote(note: Note): Promise<Note>,
  // allNotes: Note[];
  // note: Note;
  isLoggedIn: boolean

}

export default class NotePageWrapper extends Component<NoteProps, noteState> {


  constructor(props: any) {
    super(props);

    this.state = {
      allNotes: [],
      // displayNotes: [],
      noteCount: 0,
      marked: false,
      selectedNote: {},
    };
    
  }

  componentDidUpdate = (preProps:any) =>{
    if(preProps !== this.props){
      console.log("in the notePageWrapper after update!!!!!!!!!");

      if(this.props.isLoggedIn){

        this.getAllNotes().then((resp) => {
          let notes: Note[] = resp;
          this.updateState(notes);
        });
      } else{
        let notes:Note[] = [];
        this.updateState(notes);
      }

      
    }
  }

  componentDidMount = () =>{


    if(this.props.isLoggedIn){
      this.getAllNotes().then((resp) => {
            let notes: Note[] = resp;
            this.updateState(notes);
          });
    }else{
      let notes: Note[] = []
      this.updateState(notes)
    }
  }

  getAllNotes = () => {
    if (!this.props.isLoggedIn) {
      console.error("Not logged in or something. cant get all notes");

      // this.router.navigateByUrl('login');
    } else {
      return axios.get<Note[]>(noteUrl, getHttp()).then((resp) => {
        let notes = sortNotes(resp.data);

        return notes;
      });
    }
  }

  search = (search: string) => {

      if (search === "" || search === null) {
        this.getAllNotes().then((resp) => {
          this.updateState(resp);
        });
      }else {

        axios.get<Note[]>(noteUrl + "/search/" + search, getHttp()).then(response => {
            let notes = sortNotes(response.data)
            this.updateState(notes);
          });
      }
  }

  countCompletedNotes = (notes: Note[]) => {
    let count = 0;
    if (notes) {
      count = removeCompletedNotes(notes).length;
    }

    return count;
  }

  showMarked = (event: any) => {
    this.setState({
      marked: event.target.checked,
    });
  }

  updateNote = (note: Note) => {
    let notes = this.state.allNotes.slice();

    //handle delete
    if (note.deleted) {
      axios.delete(noteUrl + "/" + note.id, getHttp()).then(() => {
        notes.splice(note.index, 1);
        this.updateState(sortNotes(notes));
      });
      //handle new note
    } else if (note.index === -1) {
      axios.post(noteUrl, note, getHttp()).then((resp) => {
        notes.unshift(resp.data);
        this.updateState(sortNotes(notes));
      });
      // this.props.insertNote(note);
//handle updating existing note
    } else {
      axios
        .put(noteUrl + "/" + note.id, note, getHttp())
        .then((resp) => {
          notes[note.index] = resp.data;

          this.updateState(sortNotes(notes), note);
        });
    }
  }

  updateState = (notes: Note[], note?: Note) => {

    if(this.state.selectedNote.id){
      for(let i = 0; i < notes.length; i++){
        if(note.id === notes[i].id){
          note = {...notes[i]};
          break;
        }
      }
      this.setState({
        allNotes: notes.slice(),
        noteCount: this.countCompletedNotes(notes),
        selectedNote: note
      });
    }

    this.setState({
      allNotes: notes.slice(),
      noteCount: this.countCompletedNotes(notes),
    });
  }

  toggleNoteView = (note: Note) => {
    this.setState({selectedNote: {...note}})
  }

  showNotesPage = () => {
    if(this.props.isLoggedIn){
      return (<div className="note-wrapper-page">
        <div className="row">
          <NoteCounter count={this.state.noteCount}></NoteCounter>
          <Search search={this.search}></Search>
        </div>

        <div className="row">
          <div className="col">
            <label>Show Marked</label>
            <input
              type="checkbox"
              onClick={this.showMarked}
              defaultChecked={false}
              className="left-spacing"
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <NotesTable
              notes={this.state.allNotes}
              updateNote={this.updateNote}
              showCompleted={this.state.marked}
              toggleNoteView={this.toggleNoteView}
            ></NotesTable>
          </div>
        </div>

        <div className="row">
          <AddNote updateNote={this.updateNote}></AddNote>
        </div>
      </div>)
    } else{
      return (<h1>PLEASE LOGIN</h1>)
    }
  }

  

  render() {
    if(this.state.selectedNote.id){

      return <NoteDetail selectedNote={this.state.selectedNote} 
      toggleNoteView={this.toggleNoteView}
      updateNote={this.updateNote}></NoteDetail>;

    } else{

      return (
        <div>
        {this.showNotesPage()}
      </div>
    );
  }
  }
}


// const mapStateToProps = (state: any)=> ({
//   allNotes: state.noteReducer.notes,
//   note: state.noteReducer.note,
  
//   // allNotes: state.notes,
//   // displayNotes: Note[];
//   noteCount: 0,
//   marked: true,
// })

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     // dispatching plain actions
//     // getAllNotes: () => dispatch({ type: GET_NOTES }),
//     getAllNotes: () => dispatch(getAllNotes),
//     insertNote: () => dispatch({ type: INSERT_NOTE }),
//     // reset: () => dispatch({ type: 'RESET' })
//     // dispatch
//   }
// }

// export default connect(mapStateToProps, {getAllNotes, insertNote} )(NotePageWrapper)
// export default connect(mapStateToProps, mapDispatchToProps)(NotePageWrapper)
