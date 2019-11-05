import React from "react";
import { Switch } from "react-router-dom";
import subpages from "../subpages/subpages.js";

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
        let JSX = subpage.toJSX(props);
        ret.push(JSX);
    }
    return ret;
};

export default content;
