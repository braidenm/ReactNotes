import { combineReducers } from "redux";
import auth from "./auth";
import note from "./note";

const rootReducer = combineReducers({
  authReducer: auth,
  noteReducer: note,
});

export default rootReducer;
