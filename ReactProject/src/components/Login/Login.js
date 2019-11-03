import React from "react";
import { State, ExternalURL } from "../../constants/DataLoaderConstants.js";
import DataLoader from "../../actions/DataLoader.js";
import stores from "../../stores/dataStores.js";


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
        password: "",
      }
    };

    //this.submit = this.submit.bind(this);
    this.usernameFieldChange = this.usernameFieldChange.bind(this);
    this.passwordFieldChange = this.passwordFieldChange.bind(this);
  }


  componentDidMount() {
    if(this.needsToLoad()) this.loadFromCRM();
  }

  needsToLoad() {
    return (stores["user"].data.readState != State.SUCCESS);
  }

  /**
   * *Bind the login button to a trigger event
   */
  submitCredentials() {
    /***
     * Will be tied to the login button from the form
     */

    console.log(this.props);
    let tableData = stores["user"].data.records;

    if (tableData.some(ob => ob.madmv_name)) {
      tableData.forEach(obj => {
        if (this.state.information.username == obj.madmv_name)
        {
          if (this.state.information.password == obj.madmv_password)
          {
            new DataLoader().signalLogIn(obj.madmv_securityroles);
          }
        }
      })
    }
  }

  logOut() {
    new DataLoader().signalLogOut();
  }

  loadFromCRM() {
    let datatype = "user";
    let query = this.generateQuery();
    new DataLoader(query, datatype).load();
  }

  generateQuery() {
    let rowKey = "madmv_name";
    let datatype = "user";
    let columns = [
      { header: "Password"         , key: "madmv_password"              },
      { header: "Security"         , key: "madmv_securityroles"              }];

    let query = ExternalURL.DYNAMICS_PREFIX + datatype + ExternalURL.DYNAMICS_SUFFIX + rowKey;
    for (let i = 0; i < columns.length; i++) {
        let key = columns[i].key;
        query += "," + key;

    }
    
    return query;
  }

  /**
   * *Bind the input field to information.username
   * @param event ~ onChangeEvent
   * ? Will set state work or should we just mutate state directly
   */
  usernameFieldChange(event) {
    /**
     * had to set password to empty string as well, otherwise it is set to undefined and becomes an uncontrolled input which throws an error
     */
    event.preventDefault();
    this.setState({information: {[event.currentTarget.name]: event.currentTarget.value, password: this.state.information.password}}); 
  }

  /**
   * *Bind the input field to information.password
   * @param event ~ onChangeEvent
   * had to keep password and username seperate since setstate undefines the other values.
   */
  passwordFieldChange(event) {
    /**
     * had to set username to empty string as well, otherwise it is set to undefined and becomes an uncontrolled input which throws an error
     */
    event.preventDefault();
    this.setState({information: {[event.currentTarget.name]: event.currentTarget.value, username: this.state.information.username}});
  }

  render() {
    if (stores["user"].data.loggedIn == false)
    {
      return (
        <div>
          {this.getErrorMessage()}
          {this.getForm()}
        </div>
      );
    } else
    {
      return (
        <div>
          {this.getLogOutButton()}
        </div>
      );
    }
  }

  getErrorMessage() {
    return "";
  }

  getLogOutButton() {
    return (
      <button
        type="button"
        className="button"
        onClick={this.logOut.bind(this)}
      >
        Logout
    </button>
    )
  }

  getForm() {
    return (
      <div className="shrink-wrap">
        <div className="form">
          <div className="form-group">
            <input
              type="text"
              name="username"
              onChange={this.usernameFieldChange}
              value={this.state.information.username}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.passwordFieldChange}
              value={this.state.information.password}
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
