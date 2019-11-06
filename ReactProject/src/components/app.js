"use strict";

import React from "react";

import Header from "./header.js";
import Content from "./content.js";
import Footer from "./footer.js";
import {ForCreator} from '../stores/StoreForCreators'
import stores from "../stores/DataStores.js";

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
            store.addChangeListener(this._onStoreChange.bind(this, store.type));
        }
        ForCreator.addChangeListener(this._createRecord.bind(this));
    }

    componentWillUnmount() {
        for (let type in stores) {
            let store = stores[type];
            store.removeChangeListener(this._onStoreChange.bind(this, store.type));
            ForCreator.removeChangeListener(this._createRecord.bind(this));
        }
    }

    _createRecord(){
        this.setState({status: ForCreator.newCreation()})
    }
    _onStoreChange() {
        this.forceUpdate();
    }
}
