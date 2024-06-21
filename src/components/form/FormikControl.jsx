import React from "react";
import File from "./File";
import Input from "./Input";
import InputAmount from "./InputAmount";
import Select from "./Select";
import Switch from "./Switch";
import Textarea from "./Textarea";

import Amount from "./Amount";
import AmountUsd from "./AmountUsd";
const FormikControl = (props) => {
  switch (props.control) {
    case "select":
      return <Select {...props} />;
    case "input":
      return <Input {...props} />;
    case "inputamount":
      return <InputAmount {...props} />;
    case "amount":
      return <Amount {...props} />;
    case "amountusd":
      return <AmountUsd {...props} />;
    case "textarea":
      return <Textarea {...props} />;
    case "file":
      return <File {...props} />;
    case "switch":
      return <Switch {...props} />;
    default:
      return null;
  }
};

export default FormikControl;
