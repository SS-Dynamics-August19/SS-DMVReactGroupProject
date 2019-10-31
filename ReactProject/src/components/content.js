import React from 'react';
import {Switch, Route} from 'react-router-dom';
import subpages from '../subpages/subpages.js';

const content = function() {
    return (
        <div className="content">
            <Switch>
                {renderRoutes()}
            </Switch>
        </div>
    );
}

const renderRoutes = function() {
    let ret = [];
    for (let i = 0; i < subpages.length; i++) {
        let subpage = subpages[i];
        let JSX  = toJSX(subpage);
        ret.push(JSX);
    }
    return ret;
}

const toJSX = function(subpage) {
    return (
        <Route key={subpage.label} exact path={subpage.path} component={subpage.component} />
    );
}

export default content;