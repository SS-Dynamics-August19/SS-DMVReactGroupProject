import React from "react";
import { Route } from "react-router-dom";
import Constants from "../constants/SubpageConstants.js";

export default class Subpage {
  constructor(componentReference, componentType, path, navLabel) {
    this.component = componentReference;
    this.type      = componentType     ;
    this.path      = path              ;
    this.label     = navLabel          ;
  }

  getLabel(props) {
    if (typeof this.label === "function") {
      return this.label(props);
    } else if (typeof this.label === "string") {
      return this.label;
    }
    return "";
  }

  isActive(props) {
    return props.currentPath == this.path;
  }

  toJSX(props) {
    if (this.type === Constants.FUNCTIONAL) {
      return (
        <Route
          key={this.label}
          exact
          path={this.path}
          render={this.component.bind(this.component, props)}
        />
      );
    } else if (this.type === Constants.REACT_COMPONENT) {
      let Component = this.component;
      return (
        <Route
          key={this.label}
          exact
          path={this.path}
          component={() => <Component {...props} />}
        />
      );
    }
  }
}
