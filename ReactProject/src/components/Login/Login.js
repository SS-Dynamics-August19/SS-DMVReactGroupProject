import React from "react";
import { State, ExternalURL } from "../../constants/DataLoaderConstants.js";
import DataLoader from "../../actions/DataLoader.js";
import stores from "../../stores/dataStores.js";
//import ApplicationActions from "../../actions/ApplicationActions.js";


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
  constructor(props) {
    super(props);
    this.state = {
      information: {
        //should change on field change to match user input
        username: "",
        password: ""
      },
      dataType: "user"
    };

    //console.log("log in is in beginning of constructor");

    let query = this.generateQuery();
    //console.log(1);
    this.mydataloader = new DataLoader(query, this.state.dataType);
    //console.log(2);
    if(this.needsToLoad()) {
    //console.log(2.5);

      this.loadFromCRM();
    }
     // console.log(3);
    this.usernameFieldChange = this.usernameFieldChange.bind(this);
    //console.log(4);
    this.passwordFieldChange = this.passwordFieldChange.bind(this);
    //console.log(5);
    this.attemptLogin = this.attemptLogin.bind(this);
    //console.log(6);
    this.logOut = this.logOut.bind(this);
    //console.log(7);
    
    
    //console.log("log in is in end of constructor");

  }

  render() {
    //console.log("log in is in render");
    return <div>{this.getContent()}</div>;
  }

  getContent() {
    let state = stores[this.state.dataType].data.readState;
    switch (state) {
      case State.DEFAULT:
        return this.getDefaultContent();
      case State.STARTED:
        return this.getStartedContent();
      case State.SUCCESS:
        return this.getSuccessContent();
    }
    return this.getStartedContent();
  }

    getDefaultContent() {
        return (
            <div className="alert alert-danger" role="alert">
                Loading did not start.
            </div>
        );
    }

    getStartedContent() {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div> 
            </div>
        );
    }

    getSuccessContent() {
      //console.log("Rendering Login success mode. " + this.state.dataType + " records:");
      //console.log(stores[this.state.dataType].data.records);

      if (stores[this.state.dataType].data.loggedIn == false)
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


  componentDidMount() {
    //console.log("log in is in componentDidMount");
  }

  componentWillMount() {
    //console.log("log in is in componentWillMount");
  }



  

  needsToLoad() {
    //console.log("Should it need to load?");
    //console.log("I don't even know anymore.");
    //console.log(stores);
    //console.log(stores.user);
    //console.log(stores.user === stores[this.state.dataType]);
    //console.log(stores.user.data);
    //console.log(stores.user.data.readState);
    //console.log(State);
    //console.log(State.SUCCESS);
    return (stores[this.state.dataType].data.readState === State.DEFAULT_STATE);
    
  }

  /**
   * *Bind the login button to a trigger event
   */
  attemptLogin() {
    event.preventDefault();
    let tableData = stores[this.state.dataType].data.records;

    if (tableData.some(ob => ob.madmv_name)) {
      tableData.forEach(obj => {
        if (this.state.information.username == obj.madmv_name)
        {
          if (this.state.information.password == obj.madmv_password)
          {
            this.mydataloader.signalLogIn(obj.madmv_securityroles, obj.madmv_name); // log in if user and pass are correct and match
          }
        }
      })
    }
  }

  // log out resets authorization string to "user" because that is required to log in and sets loggedin boolen to false
  logOut() {
    this.mydataloader.signalLogOut();
  }

  //testDelete() {
  //  let id = "919bc5c6-43ff-e911-a811-000d3a36880e"
  //  ApplicationActions.deleteApplication(id);
  //}

  loadFromCRM() {
    this.mydataloader.load();
  }

  generateQuery() {
    let rowKey = "madmv_name";
    let columns = [
      { header: "Password"         , key: "madmv_password"              },
      { header: "Security"         , key: "madmv_securityroles"              }];

    let query = ExternalURL.DYNAMICS_PREFIX + this.state.dataType + ExternalURL.DYNAMICS_SUFFIX + rowKey;
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

  getErrorMessage() {
    return "";
  }

  getLogOutButton() {
    return (
      <div>
      <button
        type="button"
        className="button"
        onClick={this.logOut}
      >
        Logout
    </button>


    </div>
    )
  }

  /*
      <button
        type="delete"
        className="delete"
        onClick={this.testDelete}
      >
        Delete
    </button>
    */

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
            onClick={this.attemptLogin}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}
