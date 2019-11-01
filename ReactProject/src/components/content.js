import React from 'react';
import {Switch} from 'react-router-dom';
import subpages from '../subpages/subpages.js';

const content = function(props) {
    return (
        <div className="content">
            <Switch>
                {renderRoutes(props)}
            </Switch>
        </div>
    );
}

const renderRoutes = function(props) {
    let ret = [];
    for (let i = 0; i < subpages.length; i++) {
        ret.push(subpages[i].toJSX(props));
    }
    return ret;
}

export default content;