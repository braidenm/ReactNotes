import axios from "axios";
import React, { Component } from "react";
import { getHttp, updateCredentials, userUrl } from "../../auth/auth";
import { User } from "../../interfaces/User";

interface EditProfileState {
  editUser: User;
  editUserPassword: string;
  showUpdatePasssword: boolean;
  passwordInputToggle: string;
}

interface EditProfileProps {
  user: User;
  updateUser(user: User): void;
  updateView(): void;
}

export default class EditProfile extends Component<EditProfileProps, EditProfileState> {

  constructor(props: EditProfileProps) {
    super(props);

    this.state = {
      editUser: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: "",
      },
      editUserPassword: "",
      showUpdatePasssword: false,
      passwordInputToggle: "password",
    };
  }

  componentDidMount = () => {
      
    this.setState({ editUser: { ...this.props.user } });
  };

  //only saving the password because of the need to reset credetials in the header
  //the password is not stored in state after this screen 
  savePassword = () => {
    this.updateUserPassword(
      this.state.editUserPassword,
      this.state.editUser.id
    ).then((response) => {
      let tempUser = { ...response.data };
      tempUser.password = this.state.editUserPassword;

      updateCredentials(this.props.user.username, this.state.editUserPassword);

      this.setState({ editUser: tempUser, showUpdatePasssword: false });
    });
  };

  //this is to show whether to update the passsord or not
  toggleShowUpdatePassword = () => {
    this.setState({
      showUpdatePasssword: !this.state.showUpdatePasssword,
      editUserPassword: "",
    });
  };

  //this hides the user entry password or shows it in plain text
  togglePasswordInputView = () => {
    if (this.state.passwordInputToggle === "password") {
      this.setState({ passwordInputToggle: "text" });
    } else {
      this.setState({ passwordInputToggle: "password" });
    }
  };

  saveEdit = (event: any) => {

    event.preventDefault();
    let isValid = event.target.checkValidity();

    if (isValid) {
      this.props.updateUser(this.state.editUser);
    } else {
      event.target.reportValidity();
    }
  };

  cancelEdit = () => {
    this.props.updateView();
  };

  updateUserPassword = (password: string, id: number) => {
    return axios.put<User>(userUrl + "/password/" + id, password, getHttp());
  };

  handleFirstName = (event: any) => {
    let tempUser = { ...this.state.editUser };

    tempUser.firstName = event.target.value;

    this.setState({ editUser: { ...tempUser } });
  };

  handleLastName = (event: any) => {
    let tempUser = { ...this.state.editUser };

    tempUser.lastName = event.target.value;

    this.setState({ editUser: { ...tempUser } });
  };

  handleUserName = (event: any) => {
    let tempUser = { ...this.state.editUser };

    tempUser.username = event.target.value;

    this.setState({ editUser: { ...tempUser } });
  };

  handleEmail = (event: any) => {
    let tempUser = { ...this.state.editUser };

    tempUser.email = event.target.value;

    this.setState({ editUser: { ...tempUser } });
  };

  handlePassword = (event: any) => {
    this.setState({ editUserPassword: event.target.value }, this.maxLength);
  }

  maxLength = () => {
    if (this.state.editUserPassword.length > 25) {
      this.setState({editUserPassword : this.state.editUserPassword.slice(0, 25)});
      alert('max length is 25 characters');
    }
}

  render() {
    if (this.state.showUpdatePasssword) {
      return (
        <div className="row">
          <div className="col-sm-8 offset-sm-2 profile">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td>Password:</td>
                  <td className="row">
                    <div>
                      <input
                        type={this.state.passwordInputToggle}
                        className="form-control passwordBox"
                        required
                        value={this.state.editUserPassword}
                        name="password"
                        onChange={this.handlePassword}
                      />
                    </div>
                    <div>
                      <span>
                        <button
                          className="fa fa-eye passwordIcon"
                          type="button"
                          title="Show Password"
                          onClick={this.togglePasswordInputView}
                        ></button>
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <button
              type="button"
              onClick={this.toggleShowUpdatePassword}
              className="btn btn-outline-secondary detail-buttons"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={this.savePassword}
              className="btn btn-outline-success detail-buttons"
            >
              Save
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="col-sm-8 offset-sm-2 profile">
            <h1>Profile</h1>
            <form onSubmit={this.saveEdit}>
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
                            onChange={this.handleFirstName}
                            value={this.state.editUser.firstName}
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
                            onChange={this.handleLastName}
                            value={this.state.editUser.lastName}
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
                            onChange={this.handleEmail}
                            value={this.state.editUser.email}
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
                            onChange={this.handleUserName}
                            value={this.state.editUser.username}
                            disabled
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
                          <button
                            onClick={this.toggleShowUpdatePassword}
                            className="btn btn-outline-primary"
                            type="button"
                          >
                            Update Password
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <button
                type="button"
                className="btn btn-outline-secondary detail-buttons"
                onClick={this.cancelEdit}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-outline-success detail-buttons"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      );
    }
  }
}
