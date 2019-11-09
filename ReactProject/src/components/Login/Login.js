import React from "react";
import { State, ExternalURL } from "../../constants/DataLoaderConstants.js";
import DataLoader from "../../actions/DataLoader.js";
import stores from "../../stores/stores.js";
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

const CRM_DATA_TYPE = "user";
const QUERY_COLUMNS = [ "madmv_name", "madmv_password", "madmv_securityroles" ];
export default class Login extends React.Component {
    render() {
        return <div>{this.getContent()}</div>;
    }

    constructor(props) {
        super(props);
        this.state = {
            information: {
                username: "",
                password: ""
            }
        };
        
        let query = DataLoader.generateDynamicsQuery(CRM_DATA_TYPE, ...QUERY_COLUMNS);
        this.myDataLoader = new DataLoader(query, CRM_DATA_TYPE);
        if(this.needsToLoad()) 
            this.myDataLoader.load();

        this.usernameFieldChange = this.usernameFieldChange.bind(this);
        this.passwordFieldChange = this.passwordFieldChange.bind(this);
        this.attemptLogin = this.attemptLogin.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    getContent() {
        let state = stores.user.data.readState;
        switch (state) {
            case State.DEFAULT:
                return this.getDefaultContent();
            case State.STARTED:
                return this.getStartedContent();
            case State.SUCCESS:
                return this.getSuccessContent();
            case State.FAILURE:
                return this.getFailureContent();
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

    getFailureContent() {
        return (
            <div className="alert alert-danger" role="alert">
                Error while loading!
            </div>
        );
    }

    getSuccessContent() {
        if (stores.login.data.loggedIn == false) {
            return (
                <div>
                    {this.getErrorMessage()}
                    {this.getForm()}
                </div>
            );
        } else {
            return (
                <div>
                    {this.getLogOutButton()}
                </div>
            );
        }
    }

    needsToLoad() {
        return (stores.user.data.readState === State.DEFAULT_STATE);
    }

    /**
     * *Bind the login button to a trigger event
     */
    attemptLogin() {
        event.preventDefault();
        let tableData = stores.user.data.records;

        for(let record of tableData) {
            if(this.credentialsMatch(record)) {
                this.signalLogin(record);
                return;
            }
        }
    }

    credentialsMatch(record) {
        let attempt = this.state.information;
        return (
            attempt.username == record.madmv_name &&
            attempt.password == record.madmv_password
        );
    }

    signalLogin(record) {
        let loggedInSignal = {
            actionType: 'user_logged_in',
            data: { authorization: record.madmv_securityroles, user: record.madmv_name }
        };
        DataLoader.signal(loggedInSignal);
    }

    // log out resets authorization string to "" and sets loggedin boolen to false
    logOut() {
        let loggedOutSignal = { actionType: 'user_logged_out' };
        DataLoader.signal(loggedOutSignal);
    }
    
    generateQuery() {
        return ExternalURL.generateDynamicsQuery(CRM_DATA_TYPE, ...QUERY_COLUMNS);
    }

    /**
     * *Bind the input field to information.username
     * @param event ~ onChangeEvent
     */
    usernameFieldChange(event) {
        event.preventDefault();
        this.setState({ information: { [event.currentTarget.name]: event.currentTarget.value, password: this.state.information.password } });
    }

    /**
     * *Bind the input field to information.password
     * @param event ~ onChangeEvent
     */
    passwordFieldChange(event) {
        event.preventDefault();
        this.setState({ information: { [event.currentTarget.name]: event.currentTarget.value, username: this.state.information.username } });
    }

    getErrorMessage() {
        return "";
    }

    getLogOutButton() {
        return (
            <button type="button" className="button" onClick={this.logOut}>
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
                            placeholder="Username"
                            onChange={this.usernameFieldChange} />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.passwordFieldChange} />
                    </div>
                    <button type="button" className="button" onClick={this.attemptLogin}>
                        Login
                    </button>
                </div>
            </div>
        );
    }
}