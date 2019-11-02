import React from "react";

/**
 * Create layout for a login page
 * ? Component's set, but will it take params / What else would be stored outside of the username and password
 * Todo: talk with team about state of the component
 */

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      information: {
        //should change on field change to match user input
        username: "",
        password: ""
      }
    };
  }

  /**
   * *Bind the login button to a trigger event
   */
  submitCredentials() {
    /***
     * Will be tied to the login button from the form
     */
  }

  /**
   * *Bind the input field to information.username
   * @param event ~ onChangeEvent
   * ? Will set state work or should we just mutate state directly
   */
  usernameFieldChange() {
    /**
     * Will set the username in the information object
     */
  }

  /**
   * *Bind the input field to information.password
   * @param event ~ onChangeEvent
   * ? Will set state work or should we just mutate state directly
   */
  passwordFieldChange() {
    /**
     * Will set the password in the information object
     */
  }

  render() {
    return (
      <div>
        {this.getErrorMessage()}
        {this.getForm()}
      </div>
    );
  }

  getErrorMessage() {
    return "";
  }

  getForm() {
    return (
      <div className="shrink-wrap">
        <div className="form">
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={this.usernameFieldChange.bind(this)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.passwordFieldChange.bind(this)}
            />
          </div>
          <button
            type="button"
            className="button"
            onClick={this.submitCredentials.bind(this)}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}
