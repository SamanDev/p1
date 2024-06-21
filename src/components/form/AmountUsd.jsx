import React, { useState, useEffect } from "react";

import CurrencyInput from "react-currency-input-field";

import FormikControl from "./FormikControl";
import { Label, Input } from "semantic-ui-react";

const Amount = (prop) => {
  const getRate = localStorage.getItem("getRate");
  const [amount, setAmount] = useState(prop.def || 100);
  const [amountDollar, setAmountDollar] = useState(100);
  const [rate, setRate] = useState(getRate || 50000);

  const setVal = (name, value) => {
    var _value = value;
    if (name == "amount") {
      setAmount(_value);
      if (prop.dollar) setAmountDollar(parseFloat(_value / rate).toFixed(2));
      prop.formik.setFieldValue("amount", _value);
      if (prop.dollar)
        prop.formik.setFieldValue(
          "amountDollar",
          parseFloat(_value / rate).toFixed(2)
        );
    }
    if (name == "amountDollar") {
      setAmount(_value);
      // setAmountDollar(parseFloat(_value).toFixed(2));
      //prop.formik.setFieldValue("amount", _value * rate);
      // prop.formik.setFieldValue("amountDollar", _value);
    }
  };
  useEffect(() => {
    setVal("amountDollar", prop.formik.values.amountDollar);
  }, [prop.formik.values.amountDollar, rate]);
  return (
    <>
      <span className="hiddenmenu">
        <FormikControl
          formik={prop.formik}
          control="input"
          type="text"
          name="amount"
          labelcolor={prop.labelcolor}
          size={prop.size}
          label="مبلغ به دلار"
          className="farsi"
          disabled={prop.disabled}
        />
      </span>
      {prop.formik.errors[prop.name] && (
        <Label
          className="farsi"
          basic
          color="red"
          pointing="below"
          size={prop.size}
          disabled={prop.disabled}
        >
          {prop.formik.errors[prop.name]}
        </Label>
      )}
      <Input size={prop.size} fluid labelPosition="left">
        <Label
          pointing="right"
          color={prop.formik.errors[prop.name] ? "red" : prop.labelcolor}
          size={prop.size}
          className="farsi"
        >
          مبلغ به دلار
        </Label>
        <CurrencyInput
          name="amount"
          value={amount}
          defaultValue="1000000"
          allowDecimals={false}
          maxLength="10"
          disabled={prop.disabled}
          onValueChange={(value, name) => setVal(name, value)}
        />
      </Input>
      {prop.dollar && (
        <>
          <span className="hiddenmenu">
            <FormikControl
              formik={prop.formik}
              control="input"
              type="text"
              name="amountDollar"
              labelcolor={prop.labelcolor}
              size={prop.size}
              label="مبلغ به دلار"
              disabled={prop.disabled}
            />
          </span>

          {prop.rate && (
            <>
              <Input
                size="mini"
                readOnly
                fluid
                labelPosition="left"
                value={rate}
              >
                <Label
                  size="tiny"
                  color="black"
                  pointing="right"
                  className="farsi"
                >
                  نرخ تبدیل
                </Label>
                <CurrencyInput
                  name="rate"
                  value={rate}
                  allowDecimals={true}
                  decimalsLimit={2}
                />
              </Input>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Amount;
