"use strict"

import React from 'react';

import Header  from './header.js';
import Content from './content.js';
import Footer  from './footer.js';
import Optionset from './optionset.js';


export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login:       undefined,
            currentPath: "/",
        }
    }

    render() {
        return(
            <div className="mainColumn">
                <Header login={this.state.login} currentPath={this.state.currentPath} />
                <Optionset opset={[{name: "test1", value: "test1"}, {name: "test2", value: "test2"}, {name: "test3", value: "test3"}, {name: "test4", value: "test4"}]} value={""} updateValue={(retValue)=>{alert(retValue);}} />
                <Content {...this.state} />
                <Footer />
            </div>
        );
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }
}