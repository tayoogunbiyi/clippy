import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import "./index.css";

export default ({ toggle, className, title, content, isOpen, handleCopy }) => (
  <Modal isOpen={isOpen} toggle={toggle} className="modal-wrapper">
    <ModalHeader toggle={toggle}>{title}</ModalHeader>
    <ModalBody>
      <pre>{content}</pre>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={() => handleCopy(content)}>
        Copy
      </Button>{" "}
      <Button color="secondary" onClick={toggle}>
        Close
      </Button>
    </ModalFooter>
  </Modal>
);
