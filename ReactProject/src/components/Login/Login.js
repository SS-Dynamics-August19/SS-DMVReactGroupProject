import React from "react";
import { State, ExternalURL } from "../../constants/DataLoaderConstants.js";
import DataLoader from "../../actions/DataLoader.js";
import stores from "../../stores/dataStores.js";


/**
 * Initial login/logout functionality added
 * Test Info
 * user1 pass1 (vehicle/application)
 * user2 pass2 (customer/application)
 * user3 pass3 (all access)
 * user4 pass4 (no access)
 */




/**
 * (old comments)
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


  componentDidMount() {
    if(this.needsToLoad()) this.loadFromCRM();
  }

  needsToLoad() {
    return (stores["user"].data.readState != State.SUCCESS);
  }

  /**
   * *Bind the login button to a trigger event
   */
  attemptLogin() {
    let tableData = stores["user"].data.records;

    if (tableData.some(ob => ob.madmv_name)) {
      tableData.forEach(obj => {
        if (this.state.information.username == obj.madmv_name)
        {
          if (this.state.information.password == obj.madmv_password)
          {
            new DataLoader().signalLogIn(obj.madmv_securityroles); // log in if user and pass are correct and match
          }
        }
      })
    }
  }

  // log out resets authorization string to "user" because that is required to log in and sets loggedin boolen to false
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
   */
  usernameFieldChange(event) {
    event.preventDefault();
    this.setState({information: {[event.currentTarget.name]: event.currentTarget.value, password: this.state.information.password}}); 
  }

  /**
   * *Bind the input field to information.password
   * @param event ~ onChangeEvent
   */
  passwordFieldChange(event) {
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
              onChange={this.usernameFieldChange.bind(this)}
              value={this.state.information.username}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.passwordFieldChange.bind(this)}
              value={this.state.information.password}
            />
          </div>
          <button
            type="button"
            className="button"
            onClick={this.attemptLogin.bind(this)}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}
