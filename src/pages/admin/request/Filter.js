import React from "react";
import { Dropdown } from "semantic-ui-react";

const options = [];
options.push({ key: 4, text: "All", value: "All" });
options.push({ key: 1, text: "Pending", value: "Pending" });
options.push({ key: 2, text: "Done", value: "Done" });
options.push({ key: 3, text: "Canceled", value: "Canceled" });

const DropdownExampleMultipleSelection = (prop) => {
  return (
    <Dropdown
      defaultValue={prop.value}
      className="float-end"
      selection
      options={options}
      onChange={prop.onFilter}
      style={{ position: "relative", zIndex: 100000 }}
    />
  );
};

export default DropdownExampleMultipleSelection;
