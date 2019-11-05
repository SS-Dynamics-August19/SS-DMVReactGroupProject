"use strict";

import React from "react";

import Header from "./header.js";
import Content from "./content.js";
import Footer from "./footer.js";

import stores from "../stores/DataStores.js";
import DataLoader from "../actions/DataLoader.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentPath: "/",
                  login: "" };

    console.log("app constructor");
  }

  render() {
    //console.log("Rendering App. stores.user.data.loggedIn:");
    //console.log(stores["user"].data.loggedIn);
    //console.log("app render");
    return (
      <div className="mainColumn">
        <Header
          login={this.state.login}
          currentPath={this.state.currentPath}
          navCallback={this.setPath.bind(this)}
          logout={this.logOut.bind(this)}
        />
        <Content {...this.state} />
        <Footer />
      </div>
    );
  }

  logOut() {
    let loggedOutSignal = {
      actionType: 'user_Logged_out'
    };
    DataLoader.signal(loggedOutSignal);
  }

  setPath(path) {
    this.setState({ currentPath: path });
  }

  componentDidMount() {
    for (let type in stores) {
      let store = stores[type];
      store.addChangeListener(this._onStoreChange.bind(this, store.type));
    }
    //console.log("app did mount");
  }

  componentWillUnmount() {
    for (let type in stores) {
      let store = stores[type];
      store.removeChangeListener(this._onStoreChange.bind(this, store.type));
    }
    //console.log("app will unmount");
  }

  _onStoreChange() {
    //console.log("app force change");
    this.forceUpdate();
  }
}
