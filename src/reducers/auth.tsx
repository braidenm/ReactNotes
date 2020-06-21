import { User } from "../interfaces/User";

const authReducer = (state: User = {}, action: any): User => {
  switch (action.type) {
    case "LOGIN":
      return state;
    default:
      return state;
  }
};

export default authReducer;
