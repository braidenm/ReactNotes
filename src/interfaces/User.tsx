import { Note } from "./Note";

export interface User {

  id?: number;
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: string;
  email?: string;
  enabled?: boolean;
  role?: string;
  notes?: Note[];

}
