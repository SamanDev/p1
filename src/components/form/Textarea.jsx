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
  placeholder,
  className,
  inputmode,
  readOnly,
  autoComplete,
}) => {
  return (
    <Form as="div">
      {formik.errors[name] && formik.touched[name] && (
        <Label className="farsi" basic color="red" pointing="below" size={size}>
          {formik.errors[name]}
        </Label>
      )}
      <Form.Input size={size} fluid>
        <FastField
          type={type}
          name={name}
          placeholder={placeholder}
          className={className}
          inputMode={inputmode}
          readOnly={readOnly}
          as="textarea"
          rows={4}
        />
      </Form.Input>
    </Form>
  );
};

export default InputF;
