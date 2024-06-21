import { FastField } from "formik";
import React, { useEffect } from "react";
import { Dropdown } from "semantic-ui-react";

import { doCurrency } from "../../const";
import { Label, Form } from "semantic-ui-react";
const moment = require("moment");

var cartsOptions = [];

const editAmount = (amounts, mode, formik) => {
  cartsOptions = [];
  var _newAmount = [];
  var getAmount = JSON.parse(localStorage.getItem(mode));
  amounts.map((item, i) => {
    var canShow = true;
    if (getAmount) {
      _newAmount = [];
      getAmount.map((old, j) => {
        var _now = moment().date();
        var _date = moment(old.dateCreated).date();

        var blnDate = _date <= _now;
        if (
          old.cardNumber == formik.values.cardNumber &&
          item.value == old.amount
        ) {
          if (blnDate) {
            //canShow = false;
            _newAmount.push(old);
          } else {
          }
        } else {
          _newAmount.push(old);
        }
      });
      localStorage.setItem(mode, JSON.stringify(_newAmount));
    }
    if (canShow) {
      cartsOptions.push({
        key: i.toString(),

        text: doCurrency(item.value),
        value: item.value,
      });
    }
  });
  if (cartsOptions.length == 0) {
    cartsOptions.push({
      key: "10",

      text: doCurrency(3000000),
      value: 3000000,
    });
  }
};
const InputF = ({
  formik,
  type,
  name,
  icon,
  label,
  labelcolor,
  size,
  placeholder,
  className,
  updateAmount,
  gateway,
  amounts,
}) => {
  editAmount(amounts, gateway, formik);

  useEffect(() => {
    updateAmount(cartsOptions[0].value, formik, gateway);
  }, []);
  useEffect(() => {
    editAmount(amounts, gateway, formik);
    updateAmount(cartsOptions[0].value, formik, gateway);
  }, [formik.values.cardNumber]);
  return (
    <Form as="div">
      {formik.errors[name] && formik.touched[name] && (
        <Label className="farsi" basic color="red" pointing="below" size={size}>
          {formik.errors[name]}
        </Label>
      )}
      <Form.Input size={size} fluid labelPosition="left" defaultValue="">
        <Label
          size="tiny"
          pointing="right"
          color={
            formik.errors[name] && formik.touched[name] ? "red" : labelcolor
          }
          className="farsi"
        >
          مبلغ به تومان
        </Label>

        <FastField
          as={Dropdown}
          id={name}
          name={name}
          placeholder={placeholder}
          className={className}
          selection
          fluid
          options={cartsOptions}
          onChange={(e, data) => {
            updateAmount(data.value, formik, gateway);
          }}
        />
      </Form.Input>
    </Form>
  );
};

export default InputF;
