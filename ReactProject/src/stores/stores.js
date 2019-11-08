import CRMQueryListenerDataStore from "./CRMQueryListenerDataStore.js";
import GenericDataStore from "./GenericDataStore.js";

const defaultLoginState = {
    loggedIn: false,
    authorization: "",
    user: "Please Log In"
};
const loginEventHandlers = {
    user_logged_in: function(action) {
        this.data.authorization = action.data.authorization;
        this.data.user = "Logged in as " + action.data.user;
        this.data.loggedIn = true;
    },
    user_logged_out: function() {
        this.data.authorization = "";
        this.data.user = "Please Log In";
        this.data.loggedIn = false;
    }
};

const stores = {
    activity:    new CRMQueryListenerDataStore("activity"),
    customer:    new CRMQueryListenerDataStore("customer"),
    application: new CRMQueryListenerDataStore("application"),
    vehicle:     new CRMQueryListenerDataStore("vehicle"),
    user:        new CRMQueryListenerDataStore("user"),
    login:       new GenericDataStore("login", defaultLoginState, loginEventHandlers)
};
export default stores;