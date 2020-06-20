import { Note } from "./Note";

export interface NoteRowProps{
    note: Note,
    index: number,
    openRow(index: number):void,
    markCompleted(note: Note, index: number):void,
    deleteNote(note: Note, index: number):void,
  }