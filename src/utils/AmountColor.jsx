import React from "react";
import { doCurrency } from "../const";
const LabelExampleBasic = (prop) => {
  try {
    if (prop.amount.toString().indexOf("-") > -1 || prop.sign < 0) {
      return (
        <span className="text-danger">-{doCurrency(prop.amount * -1)}</span>
      );
    } else if (prop.amount.toString().indexOf("+") > -1 || prop.sign > 0) {
      return <span className="text-success">+{doCurrency(prop.amount)}</span>;
    } else {
      return <span className={prop.className}>{doCurrency(prop.amount)}</span>;
    }
  } catch (error) {
    return prop.amount;
  }
};

export default LabelExampleBasic;
