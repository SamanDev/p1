import React, { useState } from "react";
import { Divider, Button } from "semantic-ui-react";
import DepositButton from "../../input/DepositButton";
import Carts from "../../../../components/form/Carts";
import $ from "jquery";
import FormikControl from "../../../../components/form/FormikControl";
import AmountSelect from "../../../../components/form/AmountSelect";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../../../utils/alerts";

import { cashierService } from "../../../../services/cashier";

var countryOptions = [];
var amounts = [

  { value: 500000 },

  { value: 1000000 },

  { value: 1500000 },

  { value: 2000000 },
 
  { value: 2500000 },

  { value: 3000000 },
  { value: 3500000 },
  { value: 4000000 },
];

const localAmount = (values, prop) => {
  var getAmount = JSON.parse(localStorage.getItem(prop.gateway));
  if (!getAmount) {
    getAmount = [];
  }
  getAmount.push(values);
  localStorage.setItem(prop.gateway, JSON.stringify(getAmount));
};
const onSendCode = async (formik, prop, setBtnLoading) => {
  setBtnLoading(true);
  try {
    const res = await cashierService(
      formik.values,
      "createDepositShetabVerify"
    );
    if (res.status == 200) {
      $(".onarea").hide();
      $(".online1").show();
    } else {
      Alert("متاسفم...!", res.data.message, "error");
    }
    setBtnLoading(false);
    formik.setSubmitting(false);
  } catch (error) {
    setBtnLoading(false);
    formik.setSubmitting(false);

    Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
  }
};
const onSendCodeVerify = async (formik, prop, setBtnLoading) => {
  setBtnLoading(true);
  try {
    const res = await cashierService(
      formik.values,
      "createDepositShetabVerifyConfirm"
    );
    if (res.status == 200) {
      $(".onarea").hide();
      $(".online2").show();
    } else {
      Alert("متاسفم...!", res.data.message, "error");
    }
    setBtnLoading(false);
    formik.setSubmitting(false);
  } catch (error) {
    setBtnLoading(false);
    formik.setSubmitting(false);

    Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
  }
};
const onSendPass = async (formik, prop, setBtnLoading) => {
  setBtnLoading(true);
  //localAmount(formik.values, prop);
  try {
    const res = await cashierService(
      formik.values,
      "createDepositShetabGetPassCode"
    );
    if (res.status == 200 && res.data?.txID) {
      formik.setFieldValue("txID", res.data.txID);
      localAmount(formik.values, prop);
      $(".onarea").hide();
      $(".online2").show();
    } else {
      Alert("متاسفم...!", res.data.message, "error");
    }
    setBtnLoading(false);
    formik.setSubmitting(false);
  } catch (error) {
    setBtnLoading(false);
    formik.setSubmitting(false);

    Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
  }
};
const onSubmit = async (values, submitMethods, navigate, prop) => {
  try {
    const res = await cashierService(values, "cardService");
    if (res.status == 200) {
      //localAmount(values, prop);
      window.location.href = res.data.replace(/ /g, "");

      if (res.data?.message) {
        Alert("متاسفم...!", res.data.message, "error");
      }
    } else {
      Alert("متاسفم...!", res.data.message, "error");
    }
    submitMethods.setSubmitting(false);
  } catch (error) {
    submitMethods.setSubmitting(false);

    Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
  }
};
const updateCartInfo = (cartOptions, id, formik) => {
  var selectedCart = cartOptions.filter((d) => d.cardNumber == id)[0];

  formik.setFieldValue("cardNumber", id);
  formik.setFieldValue("cvv", selectedCart.cvv);
  formik.setFieldValue("bankName", selectedCart.bankName);
  formik.setFieldValue("expiration", selectedCart.expiration);
  formik.setFieldValue("mobile", selectedCart.mobile);
};
const updateAmount = (id, formik, mode) => {
  formik.setFieldValue("amount", id);
};
const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();

  const loginToken = prop.loginToken;

  if (loginToken) {
    countryOptions = [];
    loginToken?.cashierGateways.map((item, i) => {
      if (item.mode == "IranShetab" && item.active) {
        countryOptions.push({
          key: i.toString(),
          value: item.name,
          text: item.name,
        });
      }
    });

    return (
      <Formik
        initialValues={{
          amount: 100000,

          geteway: countryOptions[0] ? countryOptions[0].value : "",
          mobile: "",

          cvv: "",
          expiration: "",
          pin: "",
          code: "",
          txID: "",

          cardNumber: "",
          bankName: "",
          mode: "getLink",
        }}
        onSubmit={(values, submitMethods) =>
          onSubmit(values, submitMethods, navigate, prop)
        }
      >
        {(formik) => {
          return (
            <Form>
              <AmountSelect
                formik={formik}
                name="amount"
                labelcolor={prop.labelcolor}
                size={prop.size}
                mode={prop.mode}
                amounts={amounts}
                updateAmount={updateAmount}
                {...prop}
              />

              <Divider inverted />
              <Button
                className="farsi"
                color="teal"
                fluid
                style={{ marginTop: 10 }}
                disabled={formik.isSubmitting}
                hidden={!formik.isValid}
                loading={formik.isSubmitting}
                type="submit"
              >
                ادامه
              </Button>
              <div className="onarea online1" style={{ display: "none" }}>
                <Divider inverted />
                <FormikControl
                  formik={formik}
                  control="input"
                  name="code"
                  label="کد فعالسازی"
                  autoComplete="one-time-code"
                  labelcolor="blue"
                  size={prop.size}
                  inputmode="numeric"
                />

                <Button
                  content={"تایید"}
                  fluid
                  style={{ margin: "10px 0" }}
                  className="farsi"
                  color="blue"
                  size="mini"
                  loading={btnLoading}
                  disabled={btnLoading}
                  type="button"
                  onClick={() => {
                    onSendCodeVerify(formik, prop, setBtnLoading);
                  }}
                />
              </div>
              <div className="onarea online2" style={{ display: "none" }}>
                <span
                  className={
                    formik.values.txID == "" || !formik.isValid
                      ? "hiddenmenu"
                      : ""
                  }
                >
                  <Divider inverted />
                  <FormikControl
                    formik={formik}
                    control="input"
                    name="pin"
                    label="رمز پویا"
                    labelcolor="green"
                    size={prop.size}
                    inputmode="numeric"
                  />
                </span>
              </div>
              <DepositButton
                {...prop}
                type="submit"
                disabled={formik.isSubmitting || formik.values.pin == ""}
                hidden={formik.values.txID == "" || !formik.isValid}
                loading={formik.isSubmitting}
              />
            </Form>
          );
        }}
      </Formik>
    );
  } else {
    return null;
  }
};

export default depositArea;
