import React, { Component } from "react";
import {
  login,
  updateCredentials
} from "../auth/auth";

interface LoginState {
  invalidLogin: String;
  isLoggedIn: boolean;
  userName: string;
  password: string;
}
interface LoginProps {
  setIsLoggedIn(isLoggedIn: boolean): void;
  isLoggedIn: boolean;
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
  }

  componentDidUpdate = (preProps: any) => {
    if (preProps !== this.props) {
      this.setState({ isLoggedIn: this.props.isLoggedIn });
    }
  };

  onUserName = (event: any) => {
    this.setState({ userName: event.target.value});
  };

  onPassword = (event: any) => {
    this.setState({ password: event.target.value});
  };

  clearMessage = () => {
    this.setState({invalidLogin: ""});
  }

  login = (event: any) => {
    login(this.state.userName, this.state.password)
      .then((res) => {
        updateCredentials(this.state.userName, this.state.password);

        this.setState({ isLoggedIn: true }, () => {
          this.props.setIsLoggedIn(true);
        });
      })
      .catch((error) => {
        this.setState({
          invalidLogin: "Invalid Login. Try Again",
          isLoggedIn: false,
        });
      });
  };

  logout = () => {
    localStorage.removeItem("credentials");

    this.setState(
      {
        isLoggedIn: false,
        userName: "",
        password: "",
        invalidLogin: "",
      },
      () => {
        this.props.setIsLoggedIn(false);
      }
    );
  };

  showLogIn = () => {
    if (!this.state.isLoggedIn) {
      return (
        <div>
          <form>
            <input
              type="text"
              onChange={this.onUserName}
              onClick={this.clearMessage}
              placeholder="Username"
              name="username"
            />
            <input
              type="password"
              onChange={this.onPassword}
              onClick={this.clearMessage}
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
          <input
            type="button"
            onClick={this.logout}
            value="log out"
            className="btn btn-outline-primary"
          />
        </div>
      );
    }
  };

  render() {
      return (
      <div>
        
          <div>{this.showLogIn()}</div>
          {this.state.invalidLogin ? <h1 className="invalid">{this.state.invalidLogin}</h1> : '' }

      </div>)
  }
}
