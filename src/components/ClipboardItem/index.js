import React from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCopy } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

const controlContent = content => {
  return content.length > 90 ? `${content.substr(1, 86)}  ...` : content;
};

export default ({ content, copiedAt, id, handleDelete }) => (
  <div className="card">
    <p>{controlContent(content)} </p>
    <h6>{moment(copiedAt).format("MMMM Do YYYY, h:mm:ss a")}</h6>
    <div>
      <FontAwesomeIcon className="icon" icon={faCopy} />
      <FontAwesomeIcon
        className="icon"
        onClick={() => handleDelete(id)}
        icon={faTrashAlt}
      />
    </div>
  </div>
);
