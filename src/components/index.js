import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import uuidv4 from "uuid/v4";
import { Container, Row, Col } from "reactstrap";
import ClipboardItem from "./ClipboardItem";
import Search from "./Search";
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
  handleDelete = id => {
    client.request("delete-item", { id }, (err, items) => {
      this.setState({
        items
      });
    });
  };
  renderClipboardItems = () => {
    const { items } = this.state;
    if (items && items.length > 0) {
      return items.map(item => (
        <Col xs="6" sm="4" md="3" className="space-below">
          <ClipboardItem
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
    return (
      <div className="app">
        <h2 className="heading">Clippy </h2>
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
