import React, { Component } from "react";
import { NotesTable } from "./NotesTable";
import NoteCounter from "./NoteCounter";
import Search from "./Search";
import AddNote from "./AddNote";
import { Note } from "../../interfaces/note";

interface noteState {
    notes: Note[],
    hello: String
}
export default class NotePageWrapper extends Component<{}, noteState> {

    constructor(props: any){
        super(props);

        this.state = {
            notes: [],
            hello: 'hello'
        };

          this.componentWillMount = this.componentWillMount.bind(this);
    };

    componentWillMount(){
        let notes: Note[] = [
            {
              id: 1,
              title: "hello",
              details: "more hello",
              completed: false,
              created: '',
              updated: '',
            },
            {
              id: 2,
              title: "hola",
              details: "more hola",
              completed: false,
              created: '',
              updated: '',
            },
            {
              id: 3,
              title: "aloha",
              details: "more aloha",
              completed: false,
              created: '',
              updated: '',
            }
          ]

          this.setState({notes: notes});
    }

    // notes: Note[] = 
  render() {
    

    return (
      <div style={{ marginTop: "3%", marginBottom: "3%" }}>
        <div className="row">
          <NoteCounter></NoteCounter>
          <Search></Search>
        </div>

        <div className="row">
          <div className="col">
            <label>Show Marked</label>
            <input type="checkbox" />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <NotesTable notes={this.state.notes}></NotesTable>
          </div>
        </div>

        <div className="row">
          <AddNote></AddNote>
        </div>
      </div>
    );
  }
}
