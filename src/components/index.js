import React, { Component } from "react";
import uuidv4 from "uuid/v4";

import ClipboardItem from "./ClipboardItem";
import "./index.css";

const clipboard = window.require("electron-clipboard-extended");

class App extends Component {
  state = {
    // placeholder date
    items: [
      {
        id: 1,
        content: "Wash my nails",
        copiedAt: new Date()
      },
      {
        id: 2,
        content: "Wash my hair",
        copiedAt: new Date("December 17, 2018 03:24:00")
      },
      {
        id: 3,
        content: "Wash my feet",
        copiedAt: new Date()
      }
    ]
  };
  updateItems = () => {
    const currentText = clipboard.readText();
    const newItem = this.generateNewItem(currentText);

    this.setState(state => ({
      items: [newItem, ...state.items]
    }));
  };
  componentWillMount() {
    // attach event listeners
    clipboard.on("text-changed", this.updateItems).startWatching();
  }
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
    console.log("re rendering ..");
    return (
      <div className="app">
        <h2>Clippy </h2>
        {this.renderClipboardItems()}
      </div>
    );
  }
}

export default App;
