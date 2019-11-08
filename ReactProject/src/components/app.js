"use strict";

import React from "react";

import Header from "./header.js";
import Content from "./content.js";
import Footer from "./footer.js";
import {ForCreator} from '../stores/StoreForCreators'
import stores from "../stores/stores.js";

export default class App extends React.Component {
    render() {
        return (
            <div className="mainColumn">
                <Header />
                <Content {...this.state} />
                <Footer />
            </div>
        );
    }

    setPath(path) {
        this.setState({ currentPath: path });
    }

    componentDidMount() {
        for (let type in stores) {
            let store = stores[type];
            store.setOnChanged(this._onStoreChange.bind(this));
        }
        ForCreator.addChangeListener(this._createRecord.bind(this));
    }

    componentWillUnmount() {
        for (let type in stores) {
            let store = stores[type];
            store.removeOnChanged();
        }
        ForCreator.removeChangeListener(this._createRecord.bind(this));
    }

    _createRecord(){
        this.setState({status: ForCreator.newCreation()})
    }
    _onStoreChange() {
        this.forceUpdate();
    }
}
