import React, { Component } from "react";
import { NotesTable } from "./NotesTable";
import NoteCounter from "./NoteCounter";
import Search from "./Search";
import AddNote from "./AddNote";
import { Note } from "../../interfaces/Note";
import { removeCompletedNotes } from "../../utilities/Filters";
import { User } from "../../interfaces/User";
import axios from "axios";

interface noteState {
  allNotes: Note[];
  // displayNotes: Note[];
  noteCount: number;
  marked: boolean;
}

export default class NotePageWrapper extends Component<{}, noteState> {
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
  }

  componentDidMount() {
    let userName = "admin";
    let password = "password";

    this.login(userName, password)
      .then(() => {
        return this.getAllNotes();
      })
      .then((resp) => {
        let notes: Note[] = resp;
        this.updateState(notes);
      });
  }

  getAllNotes() {
    if (!this.checkLogin) {
      console.error("Not logged in or something. cant get all notes");

      // this.router.navigateByUrl('login');
    } else {
      return axios.get<Note[]>(this.noteUrl, this.getHttp()).then((resp) => {
        let notes = resp.data.sort((a, b) => {
          if (a.updated > b.updated) {
            return -1;
          }
          return 1;
        });

        // notes.forEach((note) => {
        //   note = formatNoteDate(note);
        // });
        return notes;
      });
    }
  }

  search(search: string) {
    if (!this.checkLogin) {
      console.error("Not logged in or something. cant get all notes");
      // this.router.navigateByUrl('login');
    } else {

      if (search === "" || search === null) {
        this.getAllNotes().then((resp) => {
          this.updateState(resp);
        });
      }else {

        axios.get<Note[]>(this.noteUrl + "/search/" + search, this.getHttp()).then(response => {
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
      axios.delete(this.noteUrl + "/" + note.id, this.getHttp()).then(() => {
        notes.splice(index, 1);
        this.updateState(notes);
      });
    } else if (index === -1) {
      axios.post(this.noteUrl, note, this.getHttp()).then((resp) => {
        notes.unshift(resp.data);
        this.updateState(notes);
      });
    } else {
      axios
        .put(this.noteUrl + "/" + note.id, note, this.getHttp())
        .then((resp) => {
          notes[index] = resp.data;
          this.updateState(notes);
        });
    }
  }

  updateState(notes: Note[]) {
    this.setState({
      allNotes: notes.slice(),
      noteCount: this.countCompletedNotes(notes),
    });
  }

  render() {
    return (
      <div style={{ marginTop: "5%", marginBottom: "3%" }}>
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
      </div>
    );
  }

  //Auth Stuff

  // private baseUrl = environment.baseUrl;
  private baseUrl = "http://localhost:8085/";
  private noteUrl = this.baseUrl + "api/notes";

  // P U B L I C  M E T H O D S

  login(username: any, password: any) {
    // Make credentials
    const credentials = this.generateBasicAuthCredentials(username, password);
    // Send credentials as Authorization header (this is spring security convention for basic auth)
    const httpOptions = {
      headers: {
        Authorization: `Basic ${credentials}`,
        "X-Requested-With": "XMLHttpRequest",
      },
    };
    // create request to authenticate credentials
    return axios
      .get<User>(this.baseUrl + "authenticate", httpOptions)
      .then((res) => {
        localStorage.setItem("credentials", credentials);
        return res;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateCredentials(username: string, password: string) {
    const credentials = this.generateBasicAuthCredentials(username, password);
    localStorage.setItem("credentials", credentials);
  }

  // register(user: any) {
  //   // create request to register a new account
  //   return this.http.post<User>(this.baseUrl + 'register', user)
  //   .pipe(
  //       catchError((err: any) => {
  //         console.log(err);
  //         return throwError('AuthService.register(): error registering user.');
  //       })
  //     );
  // }

  logout() {
    localStorage.removeItem("credentials");
  }

  checkLogin() {
    if (localStorage.getItem("credentials")) {
      return true;
    }
    return false;
  }

  getCredentials() {
    return localStorage.getItem("credentials");
  }

  // P R I V A T E  M E T H O D S

  private generateBasicAuthCredentials(username: string, password: string) {
    return btoa(`${username}:${password}`);
  }

  private getHttp() {
    const credentials = this.getCredentials();
    return {
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    };
  }
}
