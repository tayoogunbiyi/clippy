import React, { Component } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import uuidv4 from "uuid/v4";
import { Container, Row, Col, Button } from "reactstrap";
import ClipboardItem from "./ClipboardItem";
import Toast from "./Toast";
import Search from "./Search";
import Modal from "./Modal";
import "./index.css";
// import logo from "../images/clipboard.svg";

const clipboard = window.require("electron-clipboard-extended");

const Client = window.require("electron-rpc/client");
let client = new Client();

class App extends Component {
  state = {
    showToast: false,
    modalOpen: false,
    currentTitle: null,
    currentContent: null,
    q: null
  };
  componentWillMount() {
    // attach event listeners
    clipboard.on("text-changed", this.updateItems).startWatching();
    client.request("get-store", (err, items) => {
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
      this.setState({
        inAppCopy: false
      });
      return;
    }
    const currentText = clipboard.readText();
    const newItem = this.generateNewItem(currentText);
    if (!this.state.q) {
      this.setState(state => ({
        items: [newItem, ...state.items]
      }));
    }
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
    // This seems like the best behavior UX wise
    await this.setState({
      inAppCopy: true,
      showToast: true,
      toastContent: "Copied !"
    });
    setTimeout(this.fadeToast, 4000);
  };
  renderClipboardItems = () => {
    const { items } = this.state;
    if (items && items.length > 0) {
      return items.map(item => (
        <Col key={item.id} xs="6" sm="4" md="3" className="space-below">
          <ClipboardItem
            handleClick={(content, copiedAt) => {
              this.setState({
                currentContent: content,
                modalOpen: true,
                currentTitle: moment(copiedAt).format("MMMM Do YYYY, h:mm:ss a")
              });
            }}
            handleCopy={this.handleCopy}
            handleDelete={this.handleDelete}
            {...item}
          />
        </Col>
      ));
    }
  };
  filterClipboardItems = store => {
    const q = this.state.q.toLowerCase();
    const items = store.filter(item =>
      item.content.toLowerCase().includes(q.trim())
    );
    this.setState({
      items
    });
  };

  handleSearch = async e => {
    const { value } = e.target;
    await this.setState({
      q: value
    });
    client.request("get-store", (err, items) => {
      if (!err) {
        this.filterClipboardItems(items);
      }
    });
  };
  deleteAll = () => {
    client.request("empty-clipboard");
    this.setState({
      items: [],
      showToast: true,
      toastContent: "Emptied Clipboard"
    });
    setTimeout(this.fadeToast, 4000);
  };
  toggleModal = () => {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen
    }));
  };
  render() {
    const {
      showToast,
      toastContent,
      modalOpen,
      currentContent,
      currentTitle
    } = this.state;
    return (
      <div className="app">
        <h2 className="heading">Clippy </h2>
        <div />
        <div className="right right-btn">
          <Button size="sm" outline color="danger" onClick={this.deleteAll}>
            Clear History &nbsp;
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
        </div>
        {/* <img src={logo}/> */}
        <Toast show={showToast}>{toastContent}</Toast>
        <Container>
          <Search
            onSearch={this.handleSearch}
            addon={<FontAwesomeIcon className="icon" icon={faSearch} />}
            placeholder="Search through your clipboard history"
          />
          <Row>{this.renderClipboardItems()}</Row>
          <Modal
            title={currentTitle}
            content={currentContent}
            isOpen={modalOpen}
            toggle={this.toggleModal}
            handleCopy={content => {
              this.toggleModal();
              this.handleCopy(content);
            }}
          />
        </Container>
      </div>
    );
  }
}

export default App;
