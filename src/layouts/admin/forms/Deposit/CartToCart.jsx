import React, { useState } from "react";
import { Divider, Button } from "semantic-ui-react";
import DepositButton from "../../input/DepositButton";
import Carts from "../../../../components/form/Carts";
import AmountSelect from "../../../../components/form/AmountSelect";
import FormikControl from "../../../../components/form/FormikControl";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CopyBtn from "../../../../utils/copyInputBtn";
import MyMsg from "../../../../utils/MsgDesc";
import { doCurrency } from "../../../../const";
import ConvertCart from "../../../../utils/convertCart";
import $ from "jquery";
import { cashierService } from "../../../../services/cashier";
function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}
var countryOptions = {
  key: "a4f",
  value: "6662502250225050",
  text: "6662502250225050",
  name: "Ali (Melli)",
};
var carts = [];
var cartOptions = [];
var amounts = [
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

const localAmount = (values, prop) => {
  var getAmount = JSON.parse(localStorage.getItem(prop.gateway));
  if (!getAmount) {
    getAmount = [];
  }
  getAmount.push(values);
  localStorage.setItem(prop.gateway, JSON.stringify(getAmount));
};
const onGetCart = async (formik, prop, setBtnLoading, setDepMode) => {
  setBtnLoading(true);

  try {
    const res = await cashierService(formik.values, "bankTransfer");
    if (res.status == 200 && res.data.cardNumber) {
      formik.setFieldValue("tocart", res.data.cardNumber);
      formik.setFieldValue("tocartname", res.data.holderName);
      formik.setFieldValue("tobankName", res.data.bankName);
      formik.setFieldValue("code", "بابت بدهی " + res.data.txID);
      formik.setFieldValue("bankId", res.data.id);
      $(".onarea").hide();
      $(".online2").show();
      localAmount(formik.values, prop);
      setDepMode(2);
    }
    setBtnLoading(false);
    formik.setSubmitting(false);
  } catch (error) {
    setBtnLoading(false);
    formik.setSubmitting(false);
  }
};
const onSubmit = async (values, submitMethods, navigate, prop) => {
  try {
    const res = await cashierService(values, "createDepositShetab", "");
    if (res.status == 200) {
      localAmount(values, prop);
      submitMethods.resetForm();
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
  formik.setFieldValue("userBankId", selectedCart.id);
  formik.setFieldValue("mobile", selectedCart.mobile);
};
const updateAmount = (id, formik, mode) => {
  formik.setFieldValue("amount", id);
};
const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(1);
  const navigate = useNavigate();
  const [countryOption, setCountryOption] = useState(countryOptions);
  const [btnLoading, setBtnLoading] = useState(false);
  const loginToken = prop.loginToken;
  const validationSchema = Yup.object({
    amount: Yup.number()
      .required("لطفا این فیلد را وارد کنید.")
      .min(100000, "لطفا این فیلد را درست وارد کنید.")

      .integer(),
  });
  if (loginToken) {
    return (
      <Formik
        initialValues={{
          action: "deposit",
          amount: 0,
          geteway: prop.gateway.replace(/ /g, ""),
          code: "",
          bankId: "",
          userBankId: "",
          tocart: "",
          tocartname: "",
          mobile: "",
          cardNumber: "",
          bankName: "",
          tobankName: "",
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
              {depMode == 1 && (
                <div className="onarea online1">
                  <MyMsg
                    icon="num"
                    num="1"
                    color="yellow"
                    size="mini"
                    text="ابتدا کارت و مبلغ مورد نظر خود را انتخاب کنید."
                  />
                  <Divider inverted hidden />
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
                    labelcolor={prop.labelcolor}
                    size={prop.size}
                    mode={prop.mode}
                    amounts={amounts}
                    updateAmount={updateAmount}
                    {...prop}
                  />

                  <Button
                    className="farsi"
                    color="teal"
                    fluid
                    style={{ marginTop: 10 }}
                    loading={btnLoading}
                    disabled={btnLoading}
                    type="button"
                    onClick={() => {
                      onGetCart(formik, prop, setBtnLoading, setDepMode);
                    }}
                  >
                    ادامه
                  </Button>

                  <DepositButton hidden {...prop} />
                </div>
              )}
              {depMode == 2 && (
                <div className="onarea online2">
                  <MyMsg
                    icon="num"
                    num="2"
                    color="yellow"
                    size="mini"
                    text={
                      <>
                        سپس از کارت{" "}
                        <span className="dir_ltr text-danger">
                          <ConvertCart
                            isLock
                            cartNo={formik.values.cardNumber}
                          />
                        </span>{" "}
                        مبلغ{" "}
                        <span className="text-danger lh-bold">
                          {doCurrency(formik.values.amount)} تومان
                        </span>{" "}
                        را به کارت زیر انتقال دهید.
                      </>
                    }
                  />

                  <CopyBtn text={formik.values.tocart} />

                  <FormikControl
                    formik={formik}
                    control="input"
                    name="tocart"
                    label="واریز به"
                    labelcolor="red"
                    size={prop.size}
                    readOnly
                  />
                  <CopyBtn text={formik.values.code} />
                  <FormikControl
                    formik={formik}
                    control="input"
                    name="code"
                    label="توضیحات"
                    labelcolor="red"
                    size={prop.size}
                    className="farsi"
                    readOnly
                  />
                  <FormikControl
                    formik={formik}
                    control="input"
                    name="tocartname"
                    label="به نام"
                    labelcolor="red"
                    size={prop.size}
                    className="farsi"
                    readOnly
                  />
                  <FormikControl
                    formik={formik}
                    control="input"
                    name="tobankName"
                    label="نام بانک"
                    labelcolor="red"
                    size={prop.size}
                    className="farsi"
                    readOnly
                  />

                  <MyMsg
                    icon="info"
                    color="red"
                    size="mini"
                    text={
                      <>
                        حتما در توضیحات انتقال ذکر شود:
                        <br />
                        <span className="text-danger">
                          {formik.values.code}
                        </span>
                      </>
                    }
                  />
                  <Divider inverted />
                  <DepositButton hidden {...prop} />
                </div>
              )}
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
