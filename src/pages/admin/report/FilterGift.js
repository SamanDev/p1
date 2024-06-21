import React from "react";
import { Dropdown } from "semantic-ui-react";

const options = [];

options.push({ key: 1, text: "All", value: "" });
options.push({ key: 2, text: "League", value: "League" });
options.push({ key: 3, text: "Vip", value: "Vip" });
options.push({ key: 4, text: "Levels", value: "Levels" });
options.push({ key: 5, text: "Commission", value: "Commission" });
options.push({ key: 6, text: "RakeBack", value: "RakeBack" });
options.push({ key: 7, text: "Gift", value: "Gift" });
options.push({ key: 8, text: "GPass", value: "GPass" });
options.push({ key: 9, text: "Bonus", value: "Bonus" });

const DropdownExampleMultipleSelection = (prop) => {
  return (
    <Dropdown
      defaultValue={prop.value}
      selection
      fluid
      options={options}
      onChange={prop.onFilter}
      style={{ position: "relative", zIndex: 100000 }}
    />
  );
};

export default DropdownExampleMultipleSelection;
