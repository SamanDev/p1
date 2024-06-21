import React, { useState, useEffect } from "react";
import { Divider, Button, Input, Label, Form, Select } from "semantic-ui-react";

import Carts from "../../../components/form/AdminCarts";
import FormikControl from "../../../components/form/FormikControl";
import { Formik } from "formik";
import * as Yup from "yup";
import CopyBtn from "../../../utils/copyInputBtn";
import { adminGetService, adminPostService } from "../../../services/admin";

const onSubmit = async (values, submitMethods, prop) => {
  submitMethods.setSubmitting(true);

  const res = await adminPostService(values, "editPendingRequest", "");
  if (res.status == 200) {
    submitMethods.resetForm();
    prop.setFirstDone(false);
    prop.setFirstStatus("reload");
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
    return (
      <Formik
        initialValues={{
          action: prop.status,
          id: prop.item.id,
          amount: prop.item.pendingAmount,
          geteway: prop.gateway.replace(/ /g, ""),
          bankId: "",
          userBankId: "",
          fromobj: "",
          toobj: "",
          frombank: "",
          tobank: "",
          ticket: "",
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
                      name="frombank"
                      label="واریز از"
                      labelcolor={prop.labelcolor}
                      size={prop.size}
                      namemix
                      updateCartInfo={updateCartInfo}
                      gateway={prop.gateway}
                      loginToken={{}}
                      {...prop}
                    />
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
                    />

                    <Divider />
                    <CopyBtn text={formik.values.toobj?.cardNumber} />
                    <Form as="div">
                      <Form.Input
                        size={prop.size}
                        fluid
                        labelPosition="left"
                        defaultValue=""
                      >
                        <Label size="tiny" pointing="right" className="farsi">
                          شماره کارت
                        </Label>
                        <Input
                          control="input"
                          value={formik.values.toobj?.cardNumber}
                          readOnly
                        ></Input>
                      </Form.Input>
                    </Form>
                    <CopyBtn text={formik.values.toobj?.shebaNumber} />
                    <Form as="div">
                      <Form.Input
                        size={prop.size}
                        fluid
                        labelPosition="left"
                        defaultValue=""
                      >
                        <Label size="tiny" pointing="right" className="farsi">
                          شماره شبا
                        </Label>
                        <Input
                          control="input"
                          value={formik.values.toobj?.shebaNumber}
                          readOnly
                        ></Input>
                      </Form.Input>
                    </Form>
                    <CopyBtn text={formik.values.toobj?.accountNumber} />
                    <Form as="div">
                      <Form.Input
                        size={prop.size}
                        fluid
                        labelPosition="left"
                        defaultValue=""
                      >
                        <Label size="tiny" pointing="right" className="farsi">
                          شماره حساب
                        </Label>
                        <Input
                          control="input"
                          className="farsi"
                          value={formik.values.toobj?.accountNumber}
                          readOnly
                        ></Input>
                      </Form.Input>
                    </Form>
                    <CopyBtn text={formik.values.toobj?.holderName} />
                    <Form as="div">
                      <Form.Input
                        size={prop.size}
                        fluid
                        labelPosition="left"
                        defaultValue=""
                      >
                        <Label size="tiny" pointing="right" className="farsi">
                          نام
                        </Label>
                        <Input
                          control="input"
                          className="farsi"
                          value={formik.values.toobj?.holderName}
                          readOnly
                        ></Input>
                      </Form.Input>
                    </Form>
                    <Divider />
                    <CopyBtn text={"بابت بدهی " + prop.item.id} />
                    <Form as="div">
                      <Form.Input
                        size={prop.size}
                        fluid
                        labelPosition="left"
                        defaultValue=""
                      >
                        <Label size="tiny" pointing="right" className="farsi">
                          توضیحات
                        </Label>
                        <Input
                          control="input"
                          className="farsi"
                          value={"بابت بدهی " + prop.item.id}
                          readOnly
                        ></Input>
                      </Form.Input>
                    </Form>
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
                        formik.values.bankId == "" ||
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

                    <Divider />
                    <Select
                      placeholder="علت"
                      className="farsi"
                      fluid
                      options={carOptions}
                      onChange={handleChange}
                    />

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
};

export default depositArea;
