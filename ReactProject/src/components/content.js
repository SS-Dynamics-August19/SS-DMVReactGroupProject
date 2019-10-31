import React from 'react';
import {Switch, Route} from 'react-router-dom';
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
        let subpage = subpages[i];
        let JSX  = toJSX(subpage, props);
        ret.push(JSX);
    }
    return ret;
}

const toJSX = function(subpage, props) {
    return (
        <Route key={subpage.label} exact path={subpage.path}
            render={getRender(subpage, props)} />
    );
}

const getRender = function(subpage, props) {
    let component = subpage.component;
    
    let renderFunction;
    if (typeof component === "function") {
        renderFunction = component;
    } else {
        renderFunction = subpage.component.render;
    }
    
    if(renderFunction === undefined) return;

    return renderFunction.bind(component, props);
}

export default content;