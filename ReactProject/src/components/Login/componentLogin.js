import React from 'react'

/**
 * Create layout for a login page 
 * ? Component's set, but will it take params / What else would be stored outside of the username and password
 * Todo: talk with team about state of the component
 */

export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            information : {//should change on field change to match user input
            username : '',
            password : ''
            }
        }
    }


    /**
     * *Bind the login button to a trigger event
     */
    submitCredintials() {
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
        let errMsg = '';//space for an error message
        let form = (//create form with input fields for name and password with a button for a submit event
            <div className="base-container">
                <div className="header">Register</div>
                <div className="content">
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" placeholder="username.." onChange={this.usernameFieldChange.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Username</label>
                            <input type="password" name="password" placeholder="password.." onChange={this.passwordFieldChange.bind(this)}/>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button type="button" className="btn" onClick={this.submitCredintials.bind(this)}>Login</button>
                </div>
            </div>
        );
        return (   
            <div>
                {errMsg}
                {form}
            </div>    
        );
    }
}