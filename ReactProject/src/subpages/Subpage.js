import React from 'react';
import {Route} from 'react-router-dom';
import Constants from '../constants/SubpageConstants.js';

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
     * @param {string | Function} navLabel String or a function(props) which returns a string for the navbar label. */
    constructor(componentReference, componentType, path, navLabel) {
        this.component = componentReference;
        this.type      = componentType;
        this.path      = path;
        this.label     = navLabel;
    }

    getLabel(props) {
        if(typeof this.label === "function") {
            return this.label(props);
        } else if (typeof this.label === "string") {
            return this.label;
        }
        return "";
    }

    isActive(props) {
        return (props.currentPath == this.path);
    }

    toJSX(props) {
        if (this.type === Constants.FUNCTIONAL) {
            return (
                <Route key={this.label} exact path={this.path}
                    render={this.component.bind(this.component, props)} />
            );
        } else if (this.type === Constants.REACT_COMPONENT) {
            let Component = this.component;
            return (
                <Route key={this.label} exact path={this.path}
                    component={() => <Component {...props} />} />
            );
        }
    }
}