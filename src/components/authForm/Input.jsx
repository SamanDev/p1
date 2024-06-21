import { FastField } from "formik";
import React from "react";
import { Label, Form } from "semantic-ui-react";
const InputF = ({
  formik,
  type,
  name,
  icon,
  label,
  labelcolor,
  size,
  autoComplete,
  maxLength,
  placeholder,disabled
}) => {
  return (
    <Form as="div">
      {formik.errors[name] && formik.touched[name] && (
        <Label className="farsi" basic color="red" pointing="below" size={size}>
          {formik.errors[name]}
        </Label>
      )}
      <Form.Input
        size={size}
        fluid
        labelPosition="left"
        defaultValue=""
        style={{ marginBottom: 10 }}
        disabled={disabled}
      >
        <Label
          size="tiny"
          pointing="right"
         
          color={
            formik.errors[name] && formik.touched[name] ? "red" : labelcolor
          }
          className="farsi"
        >
          {label}
        </Label>
        <FastField
          type={type}
          name={name}
          placeholder={placeholder?placeholder:name}
          autoComplete={autoComplete}
          maxLength={maxLength}
          disabled={disabled}
        />
      </Form.Input>
    </Form>
  );
};

export default InputF;
