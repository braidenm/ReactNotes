import React, { Component } from "react";
import { NotesTable } from "./NotesTable";
import NoteCounter from "./NoteCounter";
import Search from "./Search";
import AddNote from "./AddNote";
import { Note } from "../../interfaces/Note";
import { removeCompletedNotes, sortNotes } from "../../utilities/Filters";
import { User } from "../../interfaces/User";
import axios from "axios";
import { connect } from "react-redux";
import { getAllNotes, insertNote } from '../../actions/noteActions'
import { GET_NOTES, INSERT_NOTE } from "../../actions/types";
import {checkLogin, noteUrl, getHttp } from "../../auth/auth"
import { notDeepStrictEqual } from "assert";

interface noteState {
  allNotes: Note[];
  // displayNotes: Note[];
  noteCount: number;
  marked: boolean;
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
    };


    
    this.componentDidMount = this.componentDidMount.bind(this);
    this.countCompletedNotes = this.countCompletedNotes.bind(this);
    this.showMarked = this.showMarked.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.updateState = this.updateState.bind(this);
    this.search = this.search.bind(this);
    this.showNotesPage = this.showNotesPage.bind(this);
  }

  componentDidUpdate(preProps:any){
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

  componentDidMount() {
    // let userName = "admin";
    // let password = "password";
    
    // console.log(this.props.stores);
    
    // this.login(userName, password)
    //   .then(() => {
    //     return this.getAllNotes();
    //     // return this.props.getAllNotes();
    //   })
    //   .then((resp) => {
    //     let notes: Note[] = resp;
    //     this.updateState(notes);
    //   });

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

  getAllNotes() {
    if (!this.props.isLoggedIn) {
      console.error("Not logged in or something. cant get all notes");

      // this.router.navigateByUrl('login');
    } else {
      return axios.get<Note[]>(noteUrl, getHttp()).then((resp) => {
        let notes = resp.data.sort((a, b) => {
          if (a.updated > b.updated) {
            return -1;
          }
          return 1;
        });

        return notes;
      });
    }
  }

  search(search: string) {
    if (!this.props.isLoggedIn) {
      console.error("Not logged in or something. cant get all notes");
      // this.router.navigateByUrl('login');
    } else {

      if (search === "" || search === null) {
        this.getAllNotes().then((resp) => {
          this.updateState(resp);
        });
      }else {

        axios.get<Note[]>(noteUrl + "/search/" + search, getHttp()).then(response => {
            let notes = response.data.sort((a, b) => {
              if (a.updated > b.updated) {
                return -1;
              }
              return 1;
            });
            this.updateState(notes);
          });
      }
    }
  }

  countCompletedNotes(notes: Note[]) {
    let count = 0;
    if (notes) {
      count = removeCompletedNotes(notes).length;
    }

    return count;
  }

  showMarked(event: any) {
    this.setState({
      marked: event.target.checked,
    });
  }

  updateNote(note: Note, index: number) {
    let notes = this.state.allNotes.slice();

    if (note.deleted) {
      axios.delete(noteUrl + "/" + note.id, getHttp()).then(() => {
        notes.splice(index, 1);
        this.updateState(sortNotes(notes));
      });
    } else if (index === -1) {
      axios.post(noteUrl, note, getHttp()).then((resp) => {
        notes.unshift(resp.data);
        this.updateState(sortNotes(notes));
      });
      // this.props.insertNote(note);
    } else {
      axios
        .put(noteUrl + "/" + note.id, note, getHttp())
        .then((resp) => {
          notes[index] = resp.data;

          this.updateState(sortNotes(notes));
        });
    }
  }

  updateState(notes: Note[]) {
    this.setState({
      allNotes: notes.slice(),
      noteCount: this.countCompletedNotes(notes),
    });
  }

  showNotesPage(state: any){
    if(this.props.isLoggedIn){
      return (<div>
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
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <NotesTable
              notes={this.state.allNotes}
              updateNote={this.updateNote}
              showCompleted={this.state.marked}
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
    return (
      <div style={{ marginTop: "5%", marginBottom: "3%" }}>
        {this.showNotesPage(this.state)}
      </div>
    );
  }
}

  //*****************
  //Auth Stuff
  //******************

//   // private baseUrl = environment.baseUrl;
//   private baseUrl = "http://localhost:8085/";
//   private noteUrl = this.baseUrl + "api/notes";

//   // P U B L I C  M E T H O D S

//   login(username: any, password: any) {
//     // Make credentials
//     const credentials = this.generateBasicAuthCredentials(username, password);
//     // Send credentials as Authorization header (this is spring security convention for basic auth)
//     const httpOptions = {
//       headers: {
//         Authorization: `Basic ${credentials}`,
//         "X-Requested-With": "XMLHttpRequest",
//       },
//     };
//     // create request to authenticate credentials
//     return axios.get<User>(this.baseUrl + "authenticate", httpOptions)
//       .then((res) => {
//         localStorage.setItem("credentials", credentials);
//         return res;
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   updateCredentials(username: string, password: string) {
//     const credentials = this.generateBasicAuthCredentials(username, password);
//     localStorage.setItem("credentials", credentials);
//   }

//   // register(user: any) {
//   //   // create request to register a new account
//   //   return this.http.post<User>(this.baseUrl + 'register', user)
//   //   .pipe(
//   //       catchError((err: any) => {
//   //         console.log(err);
//   //         return throwError('AuthService.register(): error registering user.');
//   //       })
//   //     );
//   // }

//   logout() {
//     localStorage.removeItem("credentials");
//   }

//   checkLogin() {
//     if (localStorage.getItem("credentials")) {
//       return true;
//     }
//     return false;
//   }

//   getCredentials() {
//     return localStorage.getItem("credentials");
//   }

//   // P R I V A T E  M E T H O D S

//   private generateBasicAuthCredentials(username: string, password: string) {
//     return btoa(`${username}:${password}`);
//   }

//   private getHttp() {
//     const credentials = this.getCredentials();
//     return {
//       headers: {
//         Authorization: `Basic ${credentials}`,
//         "Content-Type": "application/json",
//         "X-Requested-With": "XMLHttpRequest",
//       },
//     };

//   }
// }

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
