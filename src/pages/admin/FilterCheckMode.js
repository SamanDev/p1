import React from "react";
import { Dropdown } from "semantic-ui-react";

const options = [];
options.push({ key: 4, text: "All", value: "All" });
options.push({ key: 1, text: "Active", value: true });
options.push({ key: 2, text: "Pending", value: false });

const DropdownExampleMultipleSelection = (prop) => {
  return (
    <Dropdown
      placeholder={prop.value}
      floated="right"
      selection
      options={options}
      onChange={prop.onFilter}
      style={{ position: "relative", zIndex: 100000 }}
    />
  );
};

export default DropdownExampleMultipleSelection;
