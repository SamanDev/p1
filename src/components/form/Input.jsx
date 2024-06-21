import { FastField } from "formik";
import React from "react";
import { Label, Form } from "semantic-ui-react";
import { doCurrency, isJson } from "../../const";
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
  autoFocus,
  maxLength,
  disabled,
}) => {
  function toEnDigit(s) {
    return s.replace(
      /[\u0660-\u0669\u06f0-\u06f9]/g, // Detect all Persian/Arabic Digit in range of their Unicode with a global RegEx character set
      function (a) {
        return a.charCodeAt(0) & 0xf;
      } // Remove the Unicode base(2) range that not match
    );
  }
  function convertArabicCharToPersian(str) {
    const charsMapping = {
      ك: "ک",
      دِ: "د",
      بِ: "ب",
      زِ: "ز",
      ذِ: "ذ",
      شِ: "ش",
      سِ: "س",
      ى: "ی",
      ي: "ی",
   
      "١": "۱",
      "٢": "۲",
      "٣": "۳",
      "٤": "۴",
      "٥": "۵",
      "٦": "۶",
      "٧": "۷",
      "٨": "۸",
      "٩": "۹",
      "٠": "۰",
    };

    return Object.keys(charsMapping).reduce((prev, curr) => {
      return prev.replaceAll(curr, charsMapping[curr]);
    }, str || "");
  }
  React.useEffect(() => {
    if (inputmode == "numeric") {
      var _val = toEnDigit(formik.values[name]).replace(/\W/g, "");

      if (_val != formik.values[name]) {
        if (name.indexOf("2") > -1) {
          formik.setFieldValue(name, doCurrency(_val));
          formik.setFieldValue(name.replace("2", ""), _val);
        } else {
          formik.setFieldValue(name, _val);
        }
      } else {
        if (name.indexOf("2") > -1) {
          if (_val != formik.values[name.replace("2", "")]) {
            formik.setFieldValue(name.replace("2", ""), _val);
          }
        }
      }
    } else {
      try {
        var _val = convertArabicCharToPersian(formik.values[name]);
        if (_val != formik.values[name]) {
          formik.setFieldValue(name, _val);
        }
      } catch (error) {}
    }
  }, [formik.values[name]]);
  return (
    <Form as="div">
      {formik.errors[name] && formik.touched[name] && (
        <Label className="farsi" basic color="red" pointing="below" size={size}>
          {formik.errors[name]}
        </Label>
      )}
      <Form.Input
        disabled={disabled}
        size={size}
        fluid
        labelPosition="left"
        defaultValue=""
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
          placeholder={placeholder}
          className={className}
          inputMode={inputmode}
          readOnly={readOnly}
          disabled={disabled}
          autoComplete={autoComplete}
          maxLength={maxLength}
        />
      </Form.Input>
    </Form>
  );
};

export default InputF;
