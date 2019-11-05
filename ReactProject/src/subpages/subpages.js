import Subpage from "./Subpage.js";
import Constants from "../constants/SubpageConstants.js";

import Login            from "../components/Login/Login.js";
import customersView    from "../components/views/CustomersView.js";
import applicationsView from "../components/views/ApplicationsView.js";
import vehiclesView     from "../components/views/VehiclesView.js";

const subpages = [
    new Subpage(Login,            Constants.REACT_COMPONENT, "/",             "Log In/Out",   "user"),
    new Subpage(customersView,    Constants.FUNCTIONAL,      "/Customers",    "Customers",    "customer"),
    new Subpage(vehiclesView,     Constants.FUNCTIONAL,      "/Vehicles",     "Vehicles",     "vehicle"),
    new Subpage(applicationsView, Constants.FUNCTIONAL,      "/Applications", "Applications", "application")
];
export default subpages;
