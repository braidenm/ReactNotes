// import { Note } from "../interfaces/Note";
import {GET_NOTES, SEARCH, DELETE_NOTE, UPDATE_NOTE, INSERT_NOTE} from "../actions/types"
// import NotePageWrapper from "../components/notes/NotePageWrapper";
import { NoteReducerState } from "../interfaces/NoteReducer";


const initialState: NoteReducerState = {
    notes: [],
    note:  {}
};

// const notesReducer = (state: any = {}, action: any): Note[] => {
    
// }

export default function(state: NoteReducerState = initialState, action: any) {

    switch(action.type){
        case GET_NOTES:
            console.log("WOO in the reducer");
            
            return {
                ...state,
                notes: action.payload
            };

        case SEARCH:
            return state;

        case DELETE_NOTE:
            return state;

        case UPDATE_NOTE:
            return state;

        case INSERT_NOTE:
        console.log("inside indert note");

            return {
                ...state,
                note: action.payload,

            };

        default:
            return state;
    }
};