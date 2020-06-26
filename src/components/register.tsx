import axios from "axios";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { baseUrl, login, updateCredentials } from "../auth/auth";
import { User } from "../interfaces/User";

interface RegisterState {
  goToNotes: boolean;
  message: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
}

interface RegisterProps {
  setIsLoggedIn(isLoggedIn: boolean): void;
  isLoggedIn: boolean
}

export default class Register extends Component<RegisterProps, RegisterState> {

  constructor(props: any) {
    super(props);

    this.state = {
      goToNotes: false,
      message: "",
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
    };
  }


  componentDidUpdate = (preProps:any) =>{
    if(preProps !== this.props){
        this.setState({goToNotes: true});
    }
  }

  handleFirstName = (event: any) => {
    this.setState({ message: "", firstName: event.target.value });
  };

  handleLastName = (event: any) => {
    this.setState({ message: "", lastName: event.target.value });
  };

  handleUserName = (event: any) => {
    this.setState({ message: "", username: event.target.value });
  };

  handlePassword = (event: any) => {
    this.setState({ message: "", password: event.target.value });
  };

  handleEmail = (event: any) => {
    this.setState({ message: "", email: event.target.value });
  };

  clearMessage = (event: any) => {
    if (this.state.message) {
      this.setState({ message: "" });
    }
  };

  register = (event: any) => {
    event.preventDefault();
    let isValid = event.target.checkValidity();

    if (isValid) {

      let user: User = { ...this.state };

      axios.post<User>(baseUrl + "register", user).then((response) => {
        if (response.data.username === "notUnique") {
          this.setState({ message: "Username Already In Use" });
        } else {
          login(user.username, user.password)
            .then((response) => {
              updateCredentials(user.username, user.password);

              this.props.setIsLoggedIn(true);
              this.setState({goToNotes: true});
            })
            .catch((error) => {
              this.setState({
                message: "There Was an Error",
              });
            });
        }
      });

    } else {
      event.target.reportValidity();
    }
  };

  render() {
    if (this.state.goToNotes) {
      return <Redirect to="/notes" />;
    } else {
      return (

        <div>
          <div className="row ">
            {/* <div className="col-sm-4"></div> */}
            <div className="col-lg-12 registerContent">
              <div>
                <h4 className="errorMess">{this.state.message}</h4>
              </div>

              <h3>Register</h3>

              <form onSubmit={this.register}>

                <table className="table table-striped">
                  <tbody>

                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-lg-3 table-Spaceing">
                            <label>First Name:</label>
                          </div>
                          <div className="col-lg-9">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="First Name"
                              name="firstName"
                              onChange={this.handleFirstName}
                              required
                            />
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-lg-3 table-Spaceing">
                            <label>Last Name:</label>
                          </div>
                          <div className="col-lg-9">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Last Name"
                              name="lastName"
                              onChange={this.handleLastName}
                              required
                            />
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-lg-3 table-Spaceing">
                            <label>Email:</label>
                          </div>
                          <div className="col-lg-9">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Email"
                              name="email"
                              onChange={this.handleEmail}
                              required
                            />
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-lg-3 table-Spaceing">
                            <label>Username:</label>
                          </div>
                          <div className="col-lg-9">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Username"
                              name="username"
                              onChange={this.handleUserName}
                              required
                            />
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-lg-3 table-Spaceing">
                            <label>Password:</label>
                          </div>
                          <div className="col-lg-9">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Password"
                              name="password"
                              onChange={this.handlePassword}
                              required
                            />
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <input
                          type="submit"
                          value="Register"
                          className="btn btn-outline-primary"
                        />
                      </td>
                    </tr>

                  </tbody>

                </table>
                
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}
