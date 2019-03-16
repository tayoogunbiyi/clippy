import React from "react";
import moment from "moment";

export default ({ content, copiedAt }) => (
  <h3>
    {content} @ {moment(copiedAt).format("MMMM Do YYYY, h:mm:ss a")}
  </h3>
);
