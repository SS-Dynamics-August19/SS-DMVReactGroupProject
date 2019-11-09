import Subpage from "./Subpage.js";
import Constants from "../constants/SubpageConstants.js";

import Login             from "../components/Login/Login.js";
import Activities        from "../components/views/ActivitiesHome.js";
import customersView     from "../components/views/CustomersView.js";
import applicationsView  from "../components/views/ApplicationsView.js";
import vehiclesView      from "../components/views/VehiclesView.js";
import CustomerDetails   from "../components/views/CustomerDetailsView.js";
import URLParamsEchoDemo from "../components/Test or Demo/URLParamsEchoDemo.js";

const subpages = [
    // Subpage with no navbar link/tab:
    //     mySubpage.setNoNavigation() - Makes it so this Subpage will never appear in the navbar.
    //
    // Using params in URL route:
    //     As the example in Test below, include "/:myParamName" at the end of the route URL.
    //     The code will then be able to read from this.props.match.params.myParamName
    //     For mutliple params, just chain them. Ex:  "/RouteURL/:param1/:param2"
    //     In this example, /RouteURL/Hello/World would render your component with
    //         this.props.match.params == {param1: "Hello", param2: "World"}
    //
    //                                                                              (optional)         (optional)
    //          Component Reference, Type of reference,         URL route to use,   Label for nav tab, login permission required
    new Subpage(Login,               Constants.REACT_COMPONENT, "/",                "Log In/Out"),
    new Subpage(Activities,          Constants.REACT_COMPONENT,      "/Activities",       "Activities"),
    new Subpage(customersView,       Constants.FUNCTIONAL,      "/Customers",       "Customers",       "customer"),
    new Subpage(vehiclesView,        Constants.FUNCTIONAL,      "/Vehicles",        "Vehicles",        "vehicle"),
    new Subpage(applicationsView,    Constants.FUNCTIONAL,      "/Applications",    "Applications",    "application"),
    new Subpage(CustomerDetails,     Constants.REACT_COMPONENT, "/CustomerDetails/:id",  null,             "customer").setNoNavigation(),
    new Subpage(URLParamsEchoDemo,   Constants.REACT_COMPONENT, "/Echo/:echoText").setNoNavigation()
];
export default subpages;
