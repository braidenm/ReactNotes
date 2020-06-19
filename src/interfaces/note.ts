import { User } from './user'

export interface Note {

  id?: number;
  title?: string;
  details?: string;
  completed?: boolean;
  created?: string;
  updated?: string;
  user?: User;


}
