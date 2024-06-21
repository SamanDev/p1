import React from "react";
import { Input } from "semantic-ui-react";

const options = [];

const DropdownExampleMultipleSelection = (prop) => {
  return (
    <Input
      defaultValue={prop.value}
      placeholder={prop.placeholder}
      onBlur={prop.onFilter}
      style={{ position: "relative", zIndex: 100000 }}
    />
  );
};

export default DropdownExampleMultipleSelection;
