import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import uuidv4 from "uuid/v4";
import { Container, Row, Col } from "reactstrap";
import ClipboardItem from "./ClipboardItem";
import Toast from "./Toast";
import Search from "./Search";
import "./index.css";
// import logo from "../images/clipboard.svg";

const clipboard = window.require("electron-clipboard-extended");

const Client = window.require("electron-rpc/client");
let client = new Client();

class App extends Component {
  state = {
    showToast: false
  };
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
    if (this.state.inAppCopy) {
      return;
    }
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
  handleDelete = id => {
    client.request("delete-item", { id }, (err, items) => {
      this.setState({
        items,
        showToast: true,
        toastContent: "Successfully deleted."
      });
    });
    setTimeout(this.fadeToast, 4000);
  };
  fadeToast = () => {
    this.setState({
      showToast: false,
      toastContent: null
    });
  };
  handleCopy = async content => {
    const el = document.createElement("textarea");
    el.value = content;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    // We have to prevent in app copying from showing up in the app
    // This seems like the best behavior
    await this.setState({
      inAppCopy: true,
      showToast: true,
      toastContent: "Copied !"
    });
    setTimeout(this.fadeToast, 4000);

    this.setState({
      inAppCopy: false
    });
  };
  renderClipboardItems = () => {
    const { items } = this.state;
    if (items && items.length > 0) {
      return items.map(item => (
        <Col xs="6" sm="4" md="3" className="space-below">
          <ClipboardItem
            handleCopy={this.handleCopy}
            handleDelete={this.handleDelete}
            key={item.id}
            {...item}
          />
        </Col>
      ));
    }
  };
  handleSearch = e => {
    // console.log(e.target.value);
  };
  render() {
    const { showToast, toastContent } = this.state;
    return (
      <div className="app">
        <h2 className="heading">Clippy </h2>
        {/* <img src={logo}/> */}
        <Toast show={showToast}>{toastContent}</Toast>
        <Container>
          <Search
            onSearch={this.handleSearch}
            addon={<FontAwesomeIcon className="icon" icon={faSearch} />}
            placeholder="Search through your clipboard history"
          />
          <Row>{this.renderClipboardItems()}</Row>
        </Container>
      </div>
    );
  }
}

export default App;
