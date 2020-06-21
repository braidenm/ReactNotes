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