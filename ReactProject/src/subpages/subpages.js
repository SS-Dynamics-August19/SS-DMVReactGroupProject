import Subpage from "./Subpage.js";
import Constants from "../constants/SubpageConstants.js";

//import Login             from "../components/Login/Login.js";
import Activities        from "../components/views/ActivitiesHome.js";
import customersView     from "../components/views/CustomersView.js";
import applicationsView  from "../components/views/ApplicationsView.js";
import historyView  from "../components/views/HistoryView.js";
import vehiclesView      from "../components/views/VehiclesView.js";
import {CreateApplication} from '../components/Creators/ApplicationCreator.js';
import CustomerDetails   from "../components/views/CustomerDetailsView.js";
import ApplicationDetails from "../components/views/ApplicationDetailsView.js";
import VehicleDetails    from "../components/views/VehicleDetailsView.js";
import URLParamsEchoDemo from "../components/Test or Demo/URLParamsEchoDemo.js";
import testLookupFormControl from "../components/Test or Demo/TestLookupFormControl.js"


const subpages = [
    // Using params in URL route:
    //     As the example in Test below, include "/:myParamName" at the end of the route URL.
    //     The code will then be able to read from this.props.match.params.myParamName
    //     For mutliple params, just chain them. Ex:  "/RouteURL/:param1/:param2"
    //     In this example, /RouteURL/Hello/World would render your component with
    //         this.props.match.params == {param1: "Hello", param2: "World"}
    //
    //                                               cations",    "application"),
    //                                                                                   (optional - if absent, will not render a nav tab)
    //          Component Reference,   Type of reference,         URL route to use,      Label for nav tab
    new Subpage(Activities,            Constants.REACT_COMPONENT, "/",         "Activities"),
    new Subpage(customersView,         Constants.FUNCTIONAL,      "/Customers",          "Customers"),
    new Subpage(vehiclesView,          Constants.FUNCTIONAL,      "/Vehicles",           "Vehicles"),
    new Subpage(applicationsView,      Constants.FUNCTIONAL,      "/Applications",       "Applications"),
    new Subpage(historyView,           Constants.FUNCTIONAL,      "/History",            "History"),
    new Subpage(CreateApplication,     Constants.REACT_COMPONENT, "/NewApplication",     "Start New Application"),
    new Subpage(CustomerDetails,       Constants.REACT_COMPONENT, "/CustomerDetails/:id"),
    new Subpage(ApplicationDetails,    Constants.REACT_COMPONENT, "/ApplicationDetails/:id"),
    new Subpage(VehicleDetails,        Constants.REACT_COMPONENT, "/VehicleDetails/:id"),
    new Subpage(URLParamsEchoDemo,     Constants.REACT_COMPONENT, "/Echo/:echoText"),
    new Subpage(testLookupFormControl, Constants.FUNCTIONAL,      "/TestLookup"),
];
export default subpages;
