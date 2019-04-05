import React from "react";
import moment from "moment";
import { Button } from "reactstrap";
import "./index.css";

const controlContent = content => {
  return content.length > 90 ? `${content.substr(1, 86)}  ...` : content;
};

export default ({ content, copiedAt, id, handleDelete }) => (
  <div className="card">
    <p>{controlContent(content)} </p>
    <h6>{moment(copiedAt).format("MMMM Do YYYY, h:mm:ss a")}</h6>
    <Button color="primary" onClick={() => handleDelete(id)}>
      Delete
    </Button>
  </div>
);
