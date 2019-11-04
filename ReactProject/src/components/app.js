"use strict";

import React from "react";

import Header from "./header.js";
import Content from "./content.js";
import Footer from "./footer.js";

import stores from "../stores/DataStores.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentPath: "/",
                  login: "" };
  }

  render() {
    //console.log("Rendering App. stores.user.data.loggedIn:");
    //console.log(stores["user"].data.loggedIn);
    return (
      <div className="mainColumn">
        <Header
          login={this.state.login}
          currentPath={this.state.currentPath}
          navCallback={this.setPath.bind(this)}
        />
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
  }

  componentWillUnmount() {
    for (let type in stores) {
      let store = stores[type];
      store.removeChangeListener(this._onStoreChange.bind(this, store.type));
    }
  }

  _onStoreChange() {
    this.forceUpdate();
  }
}
