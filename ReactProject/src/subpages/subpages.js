import Subpage from './Subpage.js';
import Constants from '../constants/SubpageConstants.js';

import Login from '../components/Login/Login.js';
import customersView from '../components/views/CustomersView.js';

const subpages = [
    new Subpage(Login,         Constants.REACT_COMPONENT, "/",          function(props) { return (props.login === undefined ? "Log In" : "Log Out") }),
    new Subpage(customersView, Constants.FUNCTIONAL,      "/Customers", "Customers")
];
export default subpages;
