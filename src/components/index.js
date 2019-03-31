import React, { Component } from "react";
import uuidv4 from "uuid/v4";

import ClipboardItem from "./ClipboardItem";
import "./index.css";

const clipboard = window.require("electron-clipboard-extended");

const Client = window.require("electron-rpc/client");
let client = new Client();

class App extends Component {
  state = {};
  componentWillMount() {
    // attach event listeners
    clipboard.on("text-changed", this.updateItems).startWatching();
    client.request("window-create", (err, items) => {
      if (err) {
        this.setState({
          items: []
        });
      } else {
        this.setState({
          items
        });
      }
    });
  }
  updateItems = () => {
    const currentText = clipboard.readText();
    const newItem = this.generateNewItem(currentText);

    this.setState(state => ({
      items: [newItem, ...state.items]
    }));
    client.request("clipboard-update", newItem);
  };
  generateNewItem = content => ({
    content,
    id: uuidv4(),
    copiedAt: new Date()
  });
  renderClipboardItems = () => {
    const { items } = this.state;
    if (items && items.length > 0) {
      return items.map(item => <ClipboardItem key={item.id} {...item} />);
    }
  };
  render() {
    return (
      <div className="app">
        <h2>Clippy </h2>
        {this.renderClipboardItems()}
      </div>
    );
  }
}

export default App;
