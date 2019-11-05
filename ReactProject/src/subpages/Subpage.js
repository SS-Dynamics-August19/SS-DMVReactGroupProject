import React from "react";
import { Route, Link } from "react-router-dom";
import stores from "../stores/dataStores.js";
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
    constructor(componentReference, componentType, path, navLabel, requiredPermission) {
        this.component          = componentReference;
        this.type               = componentType;
        this.path               = path;
        this.label              = navLabel;
        this.requiredPermission = requiredPermission;
        this.hasNavigation      = true;
    }

    setNoNavigation() {
        this.hasNavigation = false;
        return this;
    }

    getLabel() {
        return this.label;
    }

    toNavJSX() {
        let label = this.getLabel();
        if(this.hasNavigation && this.isAuthorized()) return (
            <Link key={label} to={this.path} replace>
                <li className="nav-list"> {label} </li>
            </Link>
        );
    }

    toJSX(props) {
        if (this.isAuthorized()) {
            return this.authorizedJSX(props);
        } else {
            return this.toForbiddenJSX();
        }
    }

    isAuthorized() {
        if(this.requiredPermission === undefined) return true;
        return (stores.user.data.authorization.includes(this.requiredPermission));
    }

    authorizedJSX(props) {
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

    toForbiddenJSX() {
        return (
            <Route
                key={this.label}
                exact
                path={this.path}
                render={() => <div> You are not authorized to view this page. </div>}
            />
        );
    }
}
