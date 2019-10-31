import Subpage from './Subpage.js';

import Login         from '../components/login.js';
import CustomersView from '../components/views/CustomersView.js';

const subpages = [
    new Subpage(Login,         "/",          function(props) { return (props.login === undefined ? "Log In" : "Log Out") }),
    new Subpage(CustomersView, "/Customers", "Customers")
];
export default subpages;