"use strict";

import React from "react";

import Header from "./header.js";
import Content from "./content.js";
import Footer from "./footer.js";
//import Optionset from './optionset.js';   // uncomment to use component

import stores from "../stores/DataStores.js";

// test block for option set component
// place in return of render() to test
// current value is optional
/*
<Optionset 
    opset={[{name: "test1", value: "test1"}, {name: "test2", value: "test2"}, {name: "test3", value: "test3"}, {name: "test4", value: "test4"}]} 
    currentValue={"test3"} 
    updateValue={(retValue)=>{alert(retValue);}} 
/>
*/

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentPath: "/" };
  }

  render() {
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
