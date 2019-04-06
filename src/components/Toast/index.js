import React from "react";
import { Fade } from "reactstrap";
import "./index.css";

export default ({ show, children }) => (
  <Fade in={show} tag="h4" className="mb-3 center">
    {children}
  </Fade>
);
