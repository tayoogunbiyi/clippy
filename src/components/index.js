import React, { Component } from "react";
import moment from "moment";

import ClipboardItem from "./ClipboardItem";
import "./index.css";

const clipboard = window.require("electron-clipboard-extended");

class App extends Component {
  state = {
    items: [
      {
        id: 1,
        content: "Wash my nails",
        copiedAt: moment(new Date()).fromNow()
      },
      {
        id: 2,
        content: "Wash my hair",
        copiedAt: moment(new Date("December 17, 2018 03:24:00")).fromNow()
      },
      {
        id: 3,
        content: "Wash my feet",
        copiedAt: moment(new Date()).fromNow()
      }
    ]
  };
  updateItems = () => {
    const currentText = clipboard.readText();
    const newItem = {
      id: 421,
      content: currentText,
      copiedAt: moment(new Date()).fromNow()
    };
    this.setState(state => ({
      items: [newItem, ...state.items]
    }));
  };
  componentWillMount() {
    // attach event listeners
    clipboard.on("text-changed", this.updateItems).startWatching();
  }
  readClipboard = () => {
    return clipboard.readText();
  };
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
