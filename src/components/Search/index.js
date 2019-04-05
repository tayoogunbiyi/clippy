import React from "react";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";

import "./index.css";

export default ({ placeholder, addon: Addon, onSearch }) => (
  <div className="search">
    <InputGroup>
      <Input onChange={onSearch} placeholder={placeholder} />
      <InputGroupAddon addonType="prepend">{Addon}</InputGroupAddon>
    </InputGroup>
  </div>
);
