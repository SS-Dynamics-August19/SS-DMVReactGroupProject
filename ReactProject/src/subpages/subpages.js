import React from 'react';
import Login from '../components/login.js';

class Subpage {
    constructor(componentReference, path, navLabel) {
        this.component = componentReference;
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
}

const subpages = [
    new Subpage(Login, "/", function(props) { return (props.login === undefined ? "Log In" : "Log Out") }),
    new Subpage("", "/Applications", "Applications")
];

export default subpages;