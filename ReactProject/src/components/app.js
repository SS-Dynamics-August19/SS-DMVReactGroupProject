"use strict"

import React from 'react';

import Header  from './header.js';
import Content from './content.js';
import Footer  from './footer.js';


export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login:       undefined,
            currentPath: "/"
        }
    }

    render() {
        return(
            <div className="mainColumn">
                <Header login={this.state.login} currentPath={this.state.currentPath} />
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