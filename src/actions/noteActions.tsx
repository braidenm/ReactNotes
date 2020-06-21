import {
  GET_NOTES,
  SEARCH,
  DELETE_NOTE,
  UPDATE_NOTE,
  INSERT_NOTE,
} from "../actions/types";
import { Dispatch } from "redux";
import { Note } from "../interfaces/Note";
import axios from "axios";

const baseUrl = "http://localhost:8085/";
const noteUrl = baseUrl + "api/notes";

const getHttp = () => {
  const credentials = getCredentials();
  return {
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  };
};

const getCredentials = () => {
  return localStorage.getItem("credentials");
};

// export const getAllNotes = () => (dispatch: any) => {
//   console.log("MADE IT!!!");
//   axios.get<Note[]>(noteUrl, getHttp()).then((resp) => {
//     let notes = resp.data.sort((a, b) => {
//       if (a.updated > b.updated) {
//         return -1;
//       }
//       return 1;
//     });

//     dispatch({ type: GET_NOTES});
// //   });
// };

export const getAllNotes = () => (dispatch: any) => {
  console.log("MADE IT!!!");

  axios.get<Note[]>(noteUrl, getHttp()).then((resp) => {
    let notes = resp.data.sort((a, b) => {
      if (a.updated > b.updated) {
        return -1;
      }
      return 1;
    });

    dispatch({ type: GET_NOTES, payload: notes });
  });
};

export const insertNote = (note: Note[]) => (dispatch: any) => {
  console.log("MADE IT!!!");

  axios.post(noteUrl, note, getHttp()).then((resp) => {
    dispatch({
      type: INSERT_NOTE,
      payload: resp,
    });
    // notes.unshift(resp.data);
    // this.updateState(sortNotes(notes));
  });

  //   axios.get<Note[]>(noteUrl, getHttp()).then((resp) => {
  //     let notes = resp.data.sort((a, b) => {
  //       if (a.updated > b.updated) {
  //         return -1;
  //       }
  //       return 1;
  //     });

  // dispatch({ type: GET_NOTES, payload: notes });
  //   });
};
