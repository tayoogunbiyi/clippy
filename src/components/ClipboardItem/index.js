import React from "react";
import moment from "moment";

export default ({ content, copiedAt, id, handleDelete }) => (
  <h3>
    {content} @ {moment(copiedAt).format("MMMM Do YYYY, h:mm:ss a")}
    <button onClick={() => handleDelete(id)}>Delete</button>
  </h3>
);
