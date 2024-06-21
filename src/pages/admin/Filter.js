import React, { useEffect, useState, useContext } from "react";
import { Dropdown } from "semantic-ui-react";

const options = [];
options.push({ key: "blank", text: "No Filter", value: "" });
options.push({ key: "leaders", text: "ChipLeaders", value: "chip" });
options.push({ key: "vip", text: "VIP", value: "vip" });
options.push({ key: "gpass", text: "GPass", value: "gpass" });
options.push({ key: "dailypoint", text: "Point", value: "dailypoint" });
Array.apply(0, Array(90)).map(function (x, i) {
  options.push({ key: i, text: "Level" + (i + 1), value: i + 1 });
  options.push({
    key: i + "up",
    text: "Level" + (i + 1) + " up",
    value: i + 1 + "up",
  });
});
const loginoptions = [];
loginoptions.push({ key: "blank", text: "No Filter Login", value: "" });
Array.apply(0, Array(90)).map(function (x, i) {
  loginoptions.push({ key: i, text: (i + 1) * -1, value: (i + 1) * -1 });
});
const DropdownExampleMultipleSelection = (prop) => {
  const [val, setVal] = useState(prop.value);

  if (prop.mymode) {
    return (
      <Dropdown
        placeholder={loginoptions[0].text}
        floated="right"
        selection
        options={loginoptions}
        onChange={prop.onFilter}
        defaultValue={val}
      />
    );
  } else {
    return (
      <Dropdown
        placeholder={options[0].text}
        floated="right"
        selection
        onChange={prop.onFilter}
        defaultValue={val}
        options={options}
      />
    );
  }
};

export default DropdownExampleMultipleSelection;
