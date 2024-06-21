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
  { value: 100000 },
  { value: 150000 },
  { value: 200000 },
  { value: 250000 },
  { value: 300000 },
  { value: 350000 },
  { value: 400000 },
  { value: 450000 },
  { value: 500000 },
  { value: 600000 },
  { value: 700000 },
  { value: 800000 },
  { value: 900000 },
  { value: 1000000 },
  { value: 1250000 },
  { value: 1500000 },
  { value: 1750000 },
  { value: 2000000 },
  { value: 2250000 },
  { value: 2500000 },
  { value: 2750000 },
  { value: 3000000 },
];
const validationSchema = Yup.object({
  amount: Yup.number()
    .required("لطفا این فیلد را وارد کنید.")
    .min(100000, "لطفا این فیلد را درست وارد کنید.")
    .max(10000000, "لطفا این فیلد را درست وارد کنید.")
    .integer(),
});
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
  localAmount(formik.values, prop);
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
    const res = await cashierService(
      values,
      "createDepositShetabDoTransaction"
    );
    if (res.status == 200) {
      localAmount(values, prop);
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
        }}
        onSubmit={(values, submitMethods) =>
          onSubmit(values, submitMethods, navigate, prop)
        }
        validationSchema={validationSchema}
      >
        {(formik) => {
          return (
            <Form>
              <Carts
                formik={formik}
                name="cardNumber"
                label="واریز از"
                labelcolor={prop.labelcolor}
                size={prop.size}
                namemix
                updateCartInfo={updateCartInfo}
                {...prop}
              />
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

              <FormikControl
                formik={formik}
                control="select"
                name="geteway"
                label="توسط"
                labelcolor="black"
                size={prop.size}
                options={countryOptions}
              />

              <FormikControl
                formik={formik}
                control="input"
                name="mobile"
                label=" شماره همراه"
                labelcolor="red"
                size={prop.size}
                inputmode="numeric"
                readOnly
              />
              <Divider inverted />
              <Button.Group fluid size="mini" widths="2">
                <Button
                  className="farsi"
                  color="blue"
                  loading={btnLoading}
                  disabled={btnLoading || !formik.isValid}
                  type="button"
                  onClick={() => {
                    onSendCode(formik, prop, setBtnLoading);
                  }}
                >
                  ارسال کد فعالسازی
                </Button>
                <Button.Or text="یا" className="farsi" />
                <Button
                  loading={btnLoading}
                  color="green"
                  className="farsi"
                  type="button"
                  disabled={btnLoading || !formik.isValid}
                  onClick={() => {
                    onSendPass(formik, prop, setBtnLoading);
                  }}
                >
                  ارسال رمز پویا
                </Button>
              </Button.Group>
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
