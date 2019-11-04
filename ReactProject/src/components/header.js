import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import subpages from "../subpages/subpages.js";
import stores from "../stores/DataStores.js";

let header = function(props) {
  return (
    <div>
      <div className="header">
        <h1>React MS Dynamics DMV Staff Portal</h1>
      </div>
      <nav>
        <ul className="list-inline">{renderNavItems(props)} <span className="username">{stores["user"].data.user}</span></ul>
      </nav>
    </div>
  );
};

header.propTypes = {
  currentPath: PropTypes.string,
  navCallback: PropTypes.func.isRequired
};

const renderNavItems = function(props) {
  let ret = [];
  for (let i = 0; i < subpages.length; i++) {
    let subpage = subpages[i];
    subpage.active = subpage.href === props.currentPath;
    let JSX = toJSX(subpage, props);
    ret.push(JSX);
  }

  return ret;
};

const toJSX = function(subpage, props) {
  let label = subpage.getLabel(props);

  if (subpage.isActive(props)) {
    return (
      <li key={label} className="active-nav-list">
        {label}
      </li>
    );
  }

  return (
    <Link
      key={label}
      to={subpage.path}
      replace
      onClick={function() {
        props.navCallback(subpage.path);
      }}
    >
      <li className="nav-list"> {label} </li>
    </Link>
  );
};

toJSX.propTypes = {
  navCallback: PropTypes.func.isRequired
};

export default header;
