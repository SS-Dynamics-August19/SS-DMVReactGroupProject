import React from "react";
import subpages from "../subpages/subpages.js";
import stores from "../stores/stores.js";
import { authContext } from '../adalConfig.js';

let header = function() {
    let logoutButton = "";
    //if (stores.user.data.loggedIn === true) {
        logoutButton = (
            <button type="button" className="button" onClick={() => authContext.logOut()}>
                Logout
            </button>
        );
    //}

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
        let JSX = subpage.toNavJSX();
        ret.push(JSX);
    }

    return ret;
};

export default header;
