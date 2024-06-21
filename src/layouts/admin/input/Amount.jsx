import React, { useState, useEffect } from "react";
import { Label, Input } from "semantic-ui-react";
import CurrencyInput from "react-currency-input-field";

const Amount = (prop) => {
  const [amount, setAmount] = useState(prop.def || 100000);
  const [amountDollar, setAmountDollar] = useState(0);
  const [rate, setRate] = useState(prop.ratedef || 31250);
  useEffect(() => {
    if (prop.dollar) setVal("amountDollar", 100);
  }, []);
  const setVal = (name, value) => {
    var _value = value;
    if (name == "amount") {
      if (_value == null || _value == "") {
        if (prop.dollar) {
          _value = rate * 100;
        } else {
          _value = 100000;
        }
      }
      setAmount(_value);
      setAmountDollar(_value / rate);
    }
    if (name == "amountDollar") {
      if (_value == null || _value == "") {
        _value = 100;
      }
      setAmount(_value * rate);
      setAmountDollar(_value);
    }
  };
  return (
    <>
      {prop.rate ? (
        <>
          <Input size="mini" readOnly fluid labelPosition="left" value={rate}>
            <Label size="tiny" color="black" pointing="right" className="farsi">
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
      ) : (
        <>
          <Input size="mini" fluid labelPosition="left">
            <Label
              size="tiny"
              pointing="right"
              color="yellow"
              className="farsi"
            >
              مبلغ به تومان
            </Label>
            <CurrencyInput
              name="amount"
              value={amount}
              defaultValue="1000000"
              allowDecimals={false}
              maxLength="10"
              onValueChange={(value, name) => setVal(name, value)}
            />
          </Input>
          {prop.dollar && (
            <>
              <Input size="mini" fluid labelPosition="left">
                <Label
                  size="tiny"
                  pointing="right"
                  color="yellow"
                  className="farsi"
                >
                  مبلغ به دلار
                </Label>
                <CurrencyInput
                  name="amountDollar"
                  value={amountDollar}
                  allowDecimals={true}
                  decimalsLimit={2}
                  maxLength="6"
                  onValueChange={(value, name) => setVal(name, value)}
                />
              </Input>
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
