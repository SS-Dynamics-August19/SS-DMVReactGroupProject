import React from 'react';
import {Link} from 'react-router-dom';
import subpages from '../subpages/subpages.js';

const header = function(props) {
    return(
        <div>
            <div className="header">
                <h1>React MS Dynamics DMV Staff Portal</h1>
            </div>
            <div className="nav">
                <nav>
                    <ul className="list-inline">
                        {renderNavItems(props)}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

const renderNavItems = function(props) {
    let ret = [];
    for (let i = 0; i < subpages.length; i++) {
        let subpage = subpages[i];
        subpage.active = (subpage.href === props.currentPage);
        let JSX  = toJSX(subpage, props)
        ret.push(JSX);
    }

    return ret;
}

const toJSX = function(subpage, props) {
    let label = subpage.getLabel(props);

    if(subpage.isActive(props)) {
        return (
            <li key={label} className="active-nav-list"> {label} </li>
        );
    }

    return (
        <Link key={label} to={subpage.path} replace>
            <li className="nav-list"> {label} </li>
        </Link>
    );
}

export default header;