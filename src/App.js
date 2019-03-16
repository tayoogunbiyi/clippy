import React, { Component } from "react";
import "./App.css";

// this import strategy is due to the fact that CRA uses webpack & this conflicts with the standard module

const electron = window.require("electron");
const { clipboard } = electron;

class App extends Component {
  componentWillMount() {}
  readClipboard = () => {
    return clipboard.readText();
  };
  render() {
    return (
      <div className="app">
        <h2>Clippy </h2>
      </div>
    );
  }
}

export default App;
