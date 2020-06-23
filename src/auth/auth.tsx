import axios from "axios";
import { User } from "../interfaces/User";
 
 
 // private baseUrl = environment.baseUrl;
 export const baseUrl = "http://localhost:8085/";
 export const noteUrl = baseUrl + "api/notes";



export const getCredentials = () => {
    return localStorage.getItem("credentials");
  }

  export const generateBasicAuthCredentials = (username: string, password: string) => {
    return btoa(`${username}:${password}`);
  }

  export const getHttp = () => {
    const credentials = getCredentials();
    return {
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    };

  }

  export const checkLogin = () => {
    if (localStorage.getItem("credentials")) {
      return true;
    }
    return false;
  }

  export const updateCredentials = (username: string, password: string) => {
    const credentials = generateBasicAuthCredentials(username, password);
    localStorage.setItem("credentials", credentials);
  }

  export const login = (userName: string, password: string) => {

    //specifically not updating creditials in case it is not valid
  const credentials = generateBasicAuthCredentials(userName,password);

  // Send credentials as Authorization header (this is spring security convention for basic auth)
  const httpOptions = {
    headers: {
      Authorization: `Basic ${credentials}`,
      "X-Requested-With": "XMLHttpRequest",
    },
  };
  // create request to authenticate credentials
  return axios.get<User>(baseUrl + "authenticate", httpOptions)}