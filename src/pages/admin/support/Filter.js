import React from "react";
import { Dropdown } from "semantic-ui-react";

const options = [];

options.push({ key: 1, text: "Open", value: "Open" });
options.push({ key: 2, text: "Closed", value: "Closed" });

const DropdownExampleMultipleSelection = (prop) => {
  return (
    <Dropdown
      defaultValue={prop.value}
      className="float-end"
      selection
      multiple
      options={options}
      onChange={prop.onFilter}
      style={{ position: "relative", zIndex: 100000 }}
    />
  );
};

export default DropdownExampleMultipleSelection;
