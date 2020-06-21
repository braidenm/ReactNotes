import React, { Component } from "react";
import axios from "axios";
import {
  generateBasicAuthCredentials,
  getHttp,
  checkLogin,
  baseUrl,
} from "../auth/auth";
import { User } from "../interfaces/User";

interface LoginState {
  invalidLogin: String;
  isLoggedIn: boolean;
  userName: string;
  password: string;
}
interface LoginProps {
  setIsLoggedIn(isLoggedIn: boolean): void;
}

export default class Login extends Component<LoginProps, LoginState> {
  constructor(props: any) {
    super(props);

    this.state = {
      invalidLogin: "",
      isLoggedIn: false,
      userName: "",
      password: "",
    };

    this.onUserName = this.onUserName.bind(this);
    this.onPassword = this.onPassword.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.showLogIn = this.showLogIn.bind(this);
    this.showLogOut = this.showLogOut.bind(this);
  }

  onUserName(event: any) {
    this.setState({ userName: event.target.value });
  }

  onPassword(event: any) {
    this.setState({ password: event.target.value });
  }

  login(event:any) {
      console.log('hello');
      
    // Make credentials
    const credentials = generateBasicAuthCredentials(
      this.state.userName,
      this.state.password
    );
    // Send credentials as Authorization header (this is spring security convention for basic auth)
    const httpOptions = {
      headers: {
        Authorization: `Basic ${credentials}`,
        "X-Requested-With": "XMLHttpRequest",
      },
    };
    // create request to authenticate credentials
    return axios
      .get<User>(baseUrl + "authenticate", httpOptions)
      .then((res) => {
          console.log('in the the then');
          
        localStorage.setItem("credentials", credentials);


        this.setState({ isLoggedIn: true }, () => {this.props.setIsLoggedIn(true)} );
        

        // return res;
      })
      .catch((error) => {
        this.setState({
          invalidLogin: "Invalid Login. Try Again",
          isLoggedIn: false,
        });
      });
  }

  logout() {
    localStorage.removeItem("credentials");


    this.setState({
      isLoggedIn: false,
      userName: "",
      password: "",
      invalidLogin: "",
    }, () => {this.props.setIsLoggedIn(false)} );

    // this.props.setIsLoggedIn(false);
  }

  showLogIn() {
    if (!this.state.isLoggedIn) {
      return (
        <div>
          <form>
            <input
              type="text"
              onChange={this.onUserName}
              placeholder="Username"
              name="username"
            />
            <input
              type="password"
              onChange={this.onPassword}
              placeholder="Password"
              name="password"
            />
            <input
              type="button"
              value="Login"
              className="btn btn-outline-primary"
              onClick={this.login}
            />
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <input type='button' onClick={this.logout} value="log out" className="btn btn-outline-primary"/>
        </div>
      );
    }

  }

  showLogOut() {
    return (
      <div>
        <button className="btn btn-outline-primary">Logout</button>
      </div>
    );
  }

  render() {
    return <div>{this.showLogIn()}</div>


    {
      /* {this.state.isLoggedIn && this.showLogIn}{!this.state.isLoggedIn && this.showLogIn}</div>; */
    }
  }
}
