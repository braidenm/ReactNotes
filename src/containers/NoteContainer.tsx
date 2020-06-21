import { Dispatch } from "react";
import { connect,  } from "react-redux";
import NotePageWrapper from "../components/notes/NotePageWrapper";
// import {getAllNotes} from '../actions/noteActions'

interface StateFromProps {
    label: string;
    clickCount: number;
  }
  
  interface DispatchFromProps {
    handleClick: () => void;
  }

// const mapStateToProps = (state: State) => ({
//     clickCount: state.clickCount
//   });
  
//   const mapDispatchToProps = (dispatch: Dispatch<>) => ({
//     handleClick: () => dispatch.handleClick()
//   });
  
//   export default connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(NotePageWrapper);