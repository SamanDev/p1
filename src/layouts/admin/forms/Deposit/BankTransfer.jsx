import React, { useState } from "react";
import { Divider } from "semantic-ui-react";
import DepositButton from "../../input/DepositButton";
import Carts from "../../../../components/form/Carts";
import AmountSelect from "../../../../components/form/AmountSelect";
import FormikControl from "../../../../components/form/FormikControl";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MyMsg from "../../../../utils/MsgDesc";
import $ from "jquery";
import { cashierService } from "../../../../services/cashier";
function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

var carts = [];
var cartOptions = [];
var amounts = [
  { value: "5 تا 10 میلیون" },
  { value: "11 تا 20 میلیون" },
  { value: "21 تا 50 میلیون" },
];
const countryOptions = [
  { key: "1", value: "5 تا 10 میلیون", text: "5 تا 10 میلیون" },
  { key: "2", value: "11 تا 20 میلیون", text: "11 تا 20 میلیون" },
  { key: "3", value: "21 تا 50 میلیون", text: "21 تا 50 میلیون" },
];
const validationSchema = Yup.object({
  mobile: Yup.string()
    .required("لطفا این فیلد را وارد کنید.")
    .min(13, "لطفا این فیلد را درست وارد کنید.")
    .max(13, "لطفا این فیلد را درست وارد کنید."),
});

const localAmount = (values, prop) => {
  var getAmount = JSON.parse(localStorage.getItem(prop.mode));
  if (!getAmount) {
    getAmount = [];
  }
  getAmount.push(values);
  localStorage.setItem(prop.mode, JSON.stringify(getAmount));
};
const onGetCart = async (formik, prop, setBtnLoading) => {
  setBtnLoading(true);
  localAmount(formik.values, prop);
  try {
    const res = await cashierService(formik.values, "getCart");
    if (res.status == 200) {
      $(".onarea").hide();
      $(".online2").show();
    } else {
      $(".onarea").hide();
      $(".online2").show();
      //Alert("متاسفم...!", res.data.message, "error");
    }
    setBtnLoading(false);
    formik.setSubmitting(false);
  } catch (error) {
    setBtnLoading(false);
    formik.setSubmitting(false);
    $(".onarea").hide();
    $(".online2").show();
    //Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
  }
};
const onSubmit = async (values, submitMethods, navigate, prop) => {
  try {
    const res = await cashierService(values, "Deposit", prop.mode);
    if (res.status == 200) {
      localAmount(values, prop);
    }
    submitMethods.setSubmitting(false);
  } catch (error) {
    submitMethods.setSubmitting(false);
  }
};
const updateCartInfo = (cartOptions, id, formik) => {
  var selectedCart = cartOptions.filter((d) => d.cardNumber == id)[0];

  formik.setFieldValue("cardNumber", id);

  formik.setFieldValue("bankName", selectedCart.bankName);

  formik.setFieldValue("mobile", "+98" + selectedCart.mobile.substring(1, 11));
};
const updateAmount = (id, formik, mode) => {
  formik.setFieldValue("amount", id);
};
const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(false);
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const loginToken = prop.loginToken;

  if (loginToken) {
    return (
      <Formik
        initialValues={{
          amount: 0,

          mobile: "",
          cardNumber: "",
          bankName: "",
          dateCreated: new Date(),
        }}
        onSubmit={(values, submitMethods) =>
          onSubmit(values, submitMethods, navigate, prop)
        }
        validationSchema={validationSchema}
      >
        {(formik) => {
          return (
            <Form>
              <MyMsg
                icon="num"
                num="1"
                color="yellow"
                size="mini"
                text="ابتدا مبلغ مورد نظر و نام بانک خود انتخاب کنید و همراه با
                  شماره واتس اپ خود ارسال نمایید."
              />

              <Carts
                formik={formik}
                name="cardNumber"
                label="واریز از"
                labelcolor={prop.labelcolor}
                size={prop.size}
                namemix
                updateCartInfo={updateCartInfo}
                gateway={prop.gateway}
                {...prop}
              />
              <AmountSelect
                formik={formik}
                name="amount"
                className="farsi"
                labelcolor={prop.labelcolor}
                size={prop.size}
                mode={prop.mode}
                amounts={amounts}
                updateAmount={updateAmount}
              />
              <Divider inverted />
              <FormikControl
                formik={formik}
                control="input"
                name="mobile"
                label="شماره واتس اپ"
                labelcolor="teal"
                size={prop.size}
                inputmode="tel"
              />

              <Divider inverted />
              <MyMsg
                icon="num"
                num="2"
                color="yellow"
                size="mini"
                text="دقایقی پس از ارسال، برای هماهنگی و ارسال شماره حساب با شما
                تماس خواهیم گرفت."
              />

              <DepositButton
                {...prop}
                type="submit"
                disabled={formik.isSubmitting}
                val="ارسال"
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
