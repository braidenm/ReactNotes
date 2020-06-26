import React, { Component } from "react";
import { User } from "../../interfaces/User";
import axios from "axios";
import { userUrl, getHttp, updateCredentials } from "../../auth/auth";
import EditProfile from "./EditProfile";

interface ProfileWrapperState {
  user: User;
  editUser: User;
  editView: boolean;
}

interface ProfileWrapperProps {
  isLoggedIn: boolean;
  setIsLoggedIn(bool: boolean): void;
}

export default class ProfileWrapper extends Component<ProfileWrapperProps, ProfileWrapperState> {
  constructor(props: ProfileWrapperProps) {
    super(props);

    this.state = {
      user: {},
      editUser: {},
      editView: false,
    };
  }

  componentDidMount = () => {
    axios.get<User>(userUrl + "/loggedIn", getHttp()).then((response) => {
      this.setState({ user: { ...response.data } });
    });
  };

  getUser = (id: number) => {
    return axios.get<User[]>(userUrl + "/" + id, getHttp());
  };

  updateUser = (user: User) => {


    this.updateUserApiCall(user).then( response => {

        // updateCredentials(user.username, user.password);
       
        this.setState({ user: { ...response.data }, editView: false });

    }).catch(() => {
        console.error("error in updating user");
    })
    
  };

  updateUserApiCall = (user: User) => {
    return axios.put<User>(userUrl + "/" + user.id, user, getHttp());
  };

  updateView = () => {
    this.setState({ editView: !this.state.editView });
  };

  deactivate = () => {
    if (window.confirm("Are you sure you want to be Deactiviated?")) {
      let tempUser = { ...this.state.user };

      tempUser.enabled = false;

      this.setState({ user: tempUser }, () => {
        this.updateUserApiCall(this.state.user)
          .then(() => {
            localStorage.removeItem("credentials");
            this.props.setIsLoggedIn(false);
          })
          .catch(() => {
            console.log("error updating user");
          });
      });
    }
  }

  render() {
    if (this.state.editView) {

      return <EditProfile updateUser={this.updateUser} user={this.state.user} updateView={this.updateView}></EditProfile>

    } else {

      return (
        <div className="row">
          <div className="col-sm-8 offset-sm-2 profile">
            <h1>Profile</h1>
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td>
                    Name: {this.state.user.firstName} {this.state.user.lastName}
                  </td>
                </tr>
                <tr>
                  <td>User Name: {this.state.user.username}</td>
                </tr>
                <tr>
                  <td>Email: {this.state.user.email}</td>
                </tr>
              </tbody>
            </table>
            <button
              type="button"
              onClick={this.updateView}
              className="btn btn-outline-primary detail-buttons"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={this.deactivate}
              className="btn btn-outline-danger detail-buttons"
            >
              de-activate
            </button>
          </div>
        </div>
      );
    }
  }
}
