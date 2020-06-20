import { Note } from "../interfaces/Note";

export const removeCompletedNotes = (notes: Note[]): Note[] => {
    const result: Note[] = [];
    
    for (const note of notes) {
        if (!note.completed) {
          result.push(note);
        }
    }
    return result;
  }

  export const formatNoteDate = (note: Note): Note => {
    let copiedNote = {...note};
    copiedNote.updated = Intl.DateTimeFormat('en-US',{
      year: 'numeric',
      month: 'short',
      day: '2-digit' }).format(new Date(note.updated));


    return copiedNote;
  }