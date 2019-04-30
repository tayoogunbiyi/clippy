import React from "react";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";

import "./index.css";

export default ({ placeholder, addon: Addon, onSearch }) => (
  <div className="search">
    <InputGroup>
      <Input
        className="search-input"
        onChange={onSearch}
        placeholder={placeholder}
      />
      <InputGroupAddon addonType="prepend">{Addon}</InputGroupAddon>
    </InputGroup>
  </div>
);
