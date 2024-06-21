import React, { useState, useEffect } from "react";
import {
  Divider,
  Button,
  Input,
  Label,
  Form,
  Select,
  Segment,
} from "semantic-ui-react";

import Carts from "../../../components/form/AdminCarts";
import FormikControl from "../../../components/form/FormikControl";
import { Formik } from "formik";
import * as Yup from "yup";
import CopyBtn from "../../../utils/copyInputBtn";
import CashMode from "./cashMode";
import {
  adminGetService,
  adminPostService,
  adminPutService,
} from "../../../services/admin";
import { doCurrency } from "../../../const";

const onSubmit = async (values, submitMethods, prop) => {
  submitMethods.setSubmitting(true);

  if (prop.status == "Canceled") {
    var newValues = {
      orderId: values.id,
      mode: values.mode,

    };

    const res = await adminPostService(newValues, "cancelCashout", "");
    if (res.status == 200) {
      submitMethods.resetForm();
      prop.setFirstDone(false);
      prop.setFirstStatus("reload");
    }
  } else {
    if (values.mode == "CartToCart") {
      var newValues = {
        orderId: values.id,
        cardNumber: values.toobj.cardNumber,
        shebaNumber: "IR" + values.toobj.shebaNumber,
      };

      const res = await adminPostService(newValues, "cardService/cashout", "");
      if (res.status == 200) {
        submitMethods.resetForm();
        prop.setFirstDone(false);
        prop.setFirstStatus("reload");
      }
    } else if (values.mode == "PerfectMoney") {
      var newValues = {
        orderId: values.id,
      };

      const res = await adminPutService(newValues, "perfectMoney/done", "");
      if (res.status == 200) {
        submitMethods.resetForm();
        prop.setFirstDone(false);
        prop.setFirstStatus("reload");
      }
    } else {
      var newValues = {
        orderId: values.id,
        cardNumber: values.toobj.cardNumber,
        shebaNumber: "IR" + values.toobj.shebaNumber,
      };
      const res = await adminPostService(newValues, "visaGiftCode/cashout", "");
      if (res.status == 200) {
        submitMethods.resetForm();
        prop.setFirstDone(false);
        prop.setFirstStatus("reload");
      }
    }
  }

  submitMethods.setSubmitting(false);
};
const updateCartInfo = (cartOptions, id, formik) => {
  var selectedCart = cartOptions.filter((d) => d.cardNumber == id)[0];
  formik.setFieldValue("frombank", id);

  formik.setFieldValue("fromobj", selectedCart);
  if (selectedCart?.id) {
    formik.setFieldValue("bankId", selectedCart?.id);
  }
};
const updateCartInfoTo = (cartOptions, id, formik) => {
  var selectedCart = cartOptions.filter((d) => d.cardNumber == id)[0];
  formik.setFieldValue("tobank", id);

  formik.setFieldValue("toobj", selectedCart);
  if (selectedCart?.id) {
    formik.setFieldValue("userBankId", selectedCart?.id);
  }
};

const depositArea = (prop) => {
  console.log(prop);
  const validationSchema = Yup.object({
    amount: Yup.number()
      .required("لطفا این فیلد را وارد کنید.")

      .integer(),
    userBankId: Yup.string().required("لطفا این فیلد را وارد کنید."),

    bankId: Yup.string().required("لطفا این فیلد را وارد کنید."),
  });
  const carOptions = [
    {
      key: "1",
      value: "لطفا اطلاعات بانکی خود را تصحیح نمایید.",
      text: "لطفا اطلاعات بانکی خود را تصحیح نمایید.",
    },
  ];
  const [user, setUser] = useState(false);
  const handleGetReports = async () => {
    try {
      const res = await adminGetService(
        "getUsersByAdmin?name=username&page=1&number=100&contain=false&value=" +
          prop.item.username
      );
      if (res.status === 200) {
        if (res.data.users.length > 0) {
          setUser(
            res.data.users.filter(
              (item) => item.username == prop.item.username
            )[0]
          );
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    handleGetReports();
  }, []);
  if (!user) {
    return <>loadings</>;
  } else {
    if (prop.item.gateway == "PerfectMoney") {
      try {
        var desc = JSON.parse(prop.item.description);
      } catch (error) {}
      return (
        <Formik
          initialValues={{
            action: prop.status,
            id: prop.item.id,
            amount: prop.item.amount ? prop.item.amount : prop.item.amount2,
            geteway: prop.gateway.replace(/ /g, ""),
            bankId: "",
            userBankId: "",
            fromobj: "",
            toobj: "",
            frombank: "",
            tobank: "",
            ticket: "",
            mode: prop.item.gateway,
          }}
          onSubmit={(values, submitMethods) =>
            onSubmit(values, submitMethods, prop)
          }
          validationSchema={validationSchema}
        >
          {(formik) => {
            const handleChange = (e, { name, value }) => {
              formik.setFieldValue("ticket", value);
              // $('[name="message"]:visible').val(defval);
            };
            return (
              <Form>
                <div className="onarea online1">
                  {prop.status == "Done" ? (
                    <>
                      <FormikControl
                        formik={formik}
                        control="amount"
                        name="amount"
                        labelcolor={prop.labelcolor}
                        size={prop.size}
                        readOnly
                      />
                      {prop.item.amount && (
                        <>
                          {" "}
                          <Segment secondary>
                            Amount &nbsp;
                            <span className="text-golds">
                              ${doCurrency(desc?.dollarAmount)}
                            </span>{" "}
                            - Fee &nbsp;
                            <span className="text-golds">
                              ${doCurrency(desc?.fee)}
                            </span>
                            - Rate
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                            <span className="text-gold3">
                              {doCurrency(desc?.dollarPrice)}
                            </span>{" "}
                            - Final Amount &nbsp;
                            <span className="text-gol33d">
                              $
                              {doCurrency(
                                desc?.VOUCHER_AMOUNT
                                  ? desc?.VOUCHER_AMOUNT
                                  : parseFloat(desc?.amount).toFixed(2)
                              )}
                            </span>
                          </Segment>
                        </>
                      )}

                      <FormikControl
                        formik={formik}
                        control="input"
                        name="mode"
                        labelcolor={prop.labelcolor}
                        size={prop.size}
                      />
                      <Divider />
                      <Button
                        content={"انجام شد"}
                        fluid
                        style={{ marginTop: 10 }}
                        className="farsi"
                        color="teal"
                        type="button"
                        onClick={() => {
                          onSubmit(formik.values, formik, prop);
                        }}
                        disabled={formik.isSubmitting}
                        loading={formik.isSubmitting}
                      />
                    </>
                  ) : (
                    <>
                      <FormikControl
                        formik={formik}
                        control="amount"
                        name="amount"
                        labelcolor={prop.labelcolor}
                        size={prop.size}
                      />
                      {/* 
                      <Divider />
                      <Select
                        placeholder="علت"
                        className="farsi"
                        fluid
                        options={carOptions}
                        onChange={handleChange}
                      /> */}

                      <Divider />
                      <Button
                        content={"Cancele This Cashout"}
                        fluid
                        style={{ marginTop: 10 }}
                        className="farsi"
                        color="red"
                        type="button"
                        onClick={() => {
                          onSubmit(formik.values, formik, prop);
                        }}
                        disabled={formik.isSubmitting ? true : false}
                        loading={formik.isSubmitting}
                      />
                    </>
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
      );
    } else {
      return (
        <Formik
          initialValues={{
            action: prop.status,
            id: prop.item.id,
            amount: prop.item.amount,
            status: prop.item.status,
            geteway: prop.gateway.replace(/ /g, ""),
            bankId: "",
            userBankId: "",
            fromobj: "",
            toobj: "",
            frombank: "",
            tobank: "",
            ticket: "",
            mode: prop.item.amount < 10000000 ? "CartToCart" : "VisaGiftCode",
          }}
          onSubmit={(values, submitMethods) =>
            onSubmit(values, submitMethods, prop)
          }
          validationSchema={validationSchema}
        >
          {(formik) => {
            const handleChange = (e, { name, value }) => {
              formik.setFieldValue("ticket", value);
              // $('[name="message"]:visible').val(defval);
            };
            return (
              <Form>
                <div className="onarea online1">
                  {prop.status == "Done" ? (
                    <>
                      <Carts
                        formik={formik}
                        name="tobank"
                        label="واریز به"
                        labelcolor={prop.labelcolor}
                        size={prop.size}
                        namemix
                        updateCartInfo={updateCartInfoTo}
                        gateway={prop.gateway}
                        loginToken={user}
                        carts={""}
                      />

                      <FormikControl
                        formik={formik}
                        control="amount"
                        name="amount"
                        labelcolor={prop.labelcolor}
                        size={prop.size}
                        readOnly
                      />
                      <FormikControl
                        formik={formik}
                        control="input"
                        name="mode"
                        labelcolor={prop.labelcolor}
                        size={prop.size}
                      />
                      <CashMode formik={formik} />

                      <Divider />
                      <Button
                        content={"انجام شد"}
                        fluid
                        style={{ marginTop: 10 }}
                        className="farsi"
                        color="teal"
                        type="button"
                        onClick={() => {
                          onSubmit(formik.values, formik, prop);
                        }}
                        disabled={
                          formik.isSubmitting ||
                          formik.values.amount > prop.item.pendingAmount ||
                          formik.values.userBankId == ""
                            ? true
                            : false
                        }
                        loading={formik.isSubmitting}
                      />
                    </>
                  ) : (
                    <>
                      <FormikControl
                        formik={formik}
                        control="amount"
                        name="amount"
                        labelcolor={prop.labelcolor}
                        size={prop.size}
                      />
<br /> <br />
                <Button.Group fluid widths={3}>
                  <Button
                    type="button"
                    onClick={() => {
                      formik.setFieldValue("mode", "Canceled");
                    }}
                    positive={formik.values.mode === "Canceled"}
                  >
                    Canceled
                  </Button>
                  <Button.Or text="or" />
                  <Button
                    type="button"
                    onClick={() => {
                      formik.setFieldValue("mode", "Refund");
                    }}
                    positive={formik.values.mode === "Refund"}
               
                  >
                    Canceled and Refund
                  </Button>
                </Button.Group>
                      {/*  <Divider />
                      <Select
                        placeholder="علت"
                        className="farsi"
                        fluid
                        options={carOptions}
                        onChange={handleChange}
                      /> */}

                      <Divider />
                      <Button
                        content={"Cancele This Cashout"}
                        fluid
                        style={{ marginTop: 10 }}
                        className="farsi"
                        color="red"
                        type="button"
                        onClick={() => {
                          onSubmit(formik.values, formik, prop);
                        }}
                        disabled={formik.isSubmitting ? true : false}
                        loading={formik.isSubmitting}
                      />
                    </>
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
      );
    }
  }
};

export default depositArea;
