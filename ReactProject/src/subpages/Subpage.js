import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Constants from "../constants/SubpageConstants.js";

/**Usage:
 * 
 * When adding a new Subpage to the site, add an entry for it in subpages.js.
 * 
 * Additionally, there may be other steps necessary depending on which other helper classes you use.
 * For example, the page will need an entry in stores/dataStores.js if it uses a DataStore. */
export default class Subpage {
    /**@param {React.Component | Function} componentReference The class extending React.Component, or function which renders this Subpage.
     * @param {string} componentType Either constants/SubpageConstants.js:subpageType.REACT_COMPONENT, or FUNCTIONAL, corresponding to the above.
     * @param {string} path The URL path for this subpage. For example, "/vehicle" would render at "http://localhost:9090/#/vehicle".
     * @param {string} navLabel String for the navbar label. */
    constructor(componentReference, componentType, path, navLabel) {
        this.component          = componentReference;
        this.type               = componentType;
        this.path               = path;
        this.label              = navLabel;
    }

    getLabel() {
        return this.label;
    }

    toNavJSX() {
        if(this.label !== undefined) return (
            <Switch>
                <Route key={this.path + " Active"}
                    exact
                    path={this.path}>
                    <li className="active-nav-list"> {this.label} </li>
                </Route>
                <Route key={this.path + " Inactive"}>
                    <Link key={this.label} to={this.path} replace>
                        <li className="nav-list"> {this.label} </li>
                    </Link>
                </Route>
            </Switch>
        );
    }

    toJSX(props) {
        return (
            <Route
                key={this.path}
                exact
                path={this.path}
                {...this.getRenderObject(props)}
                {...props}
            />
        );
    }

    getRenderObject(props) {
        let Component = this.component;
        switch (this.type) {
            case Constants.FUNCTIONAL:
                return { render: this.component.bind(this.component, props) };
            case Constants.REACT_COMPONENT:
                return { component: Component };
        }
    }
}
