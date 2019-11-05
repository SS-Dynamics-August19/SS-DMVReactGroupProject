import React from "react";
//import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import subpages from "../subpages/subpages.js";
import stores from "../stores/DataStores.js";

let header = function() {
    let logoutButton = "";
    if (stores.user.data.loggedIn === true) {
        logoutButton = (
            <button type="button" className="button">
                Logout
            </button>
        );
    }

    return (
        <div>
            <div className="header">
                <h1>React MS Dynamics DMV Staff Portal</h1>
            </div>
            <nav>
                <ul className="list-inline">
                    {renderNavItems()}
                    <span className="username">
                        {stores.user.data.user}{logoutButton}
                    </span>
                </ul>
            </nav>
        </div>
    );
};

const renderNavItems = function() {
    let ret = [];
    for (let i = 0; i < subpages.length; i++) {
        let subpage = subpages[i];
        let JSX = toJSX(subpage);
        ret.push(JSX);
    }

    return ret;
};

const toJSX = function(subpage) {
    let label = subpage.getLabel();
    return (
        <Link key={label} to={subpage.path} replace>
            <li className="nav-list"> {label} </li>
        </Link>
    );
};

export default header;
