import { Note } from "./Note";

export interface NoteReducerState{
    notes: Note[],
    note: Note
}