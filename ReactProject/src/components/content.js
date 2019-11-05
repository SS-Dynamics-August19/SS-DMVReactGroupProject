import React from "react";
import { Switch } from "react-router-dom";
import subpages from "../subpages/subpages.js";
//import stores from "../stores/dataStores.js";

const content = function(props) {
    return (
        <div className="content">
            <Switch>
                {renderRoutes(props)}
            </Switch>
        </div>
    );
};

const renderRoutes = function(props) {
    let ret = [];
    for (const subpage of subpages) {
        let JSX;

        // TODO    this commented code intended to preform login validation. Uncomment when ready to implement or delete if page validation has been implemented.

        //if (stores.user.data.authorization.includes(subpage.getPermission())) {
            JSX = subpage.toJSX(props);
        //} else {
        //    JSX = subpage.toForbiddenJSX();
        //}

        ret.push(JSX);
    }
    return ret;
};

export default content;
