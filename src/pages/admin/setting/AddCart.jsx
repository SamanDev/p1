import { Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider } from "semantic-ui-react";
import * as Yup from "yup";
import FormikControl from "../../../components/form/FormikControl";
import { Alert } from "../../../utils/alerts";

import { adminPostService } from "../../../services/admin";
const SelectB =
  "بانک ملّی ایران,بانک اقتصاد نوین,بانک قرض‌الحسنه مهر ایران,بانک سپه,بانک پارسیان,بانک قرض‌الحسنه رسالت,بانک صنعت و معدن,بانک کارآفرین,بانک کشاورزی,بانک سامان,بانک مسکن,بانک سینا,بانک توسعه صادرات ایران,بانک خاور میانه,بانک توسعه تعاون,بانک شهر,پست بانک ایران,بانک دی,بانک صادرات,بانک ملت,بانک تجارت,بانک رفاه,بانک حکمت ایرانیان,بانک گردشگری,بانک ایران زمین,بانک قوامین,بانک انصار,بانک سرمایه,بانک پاسارگاد,بانک مشترک ایران-ونزوئلا".split(
    ","
  );
const accs = "شماره شبا,شماره حساب".split(",");
const accsName = "shebaNumber,accountNumber".split(",");
const accsNameHolder = "Sheba Number,Account Number".split(",");
const carts = "شماره کارت".split(",");
const cartsName = "cardNumber".split(",");
const cartsNameHolder = "Cart Number".split(",");
const bankOptions = [];
SelectB.map(function (bank, i) {
  bankOptions.push({ key: i, value: bank, text: bank });
});
const nameRegex =
  /^['\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9\u06AF\u06BE\u06CC\u0020']+$/;

const validationSchema = Yup.object({
  holderName: Yup.string()
    .matches(nameRegex, "نام کامل خود را به فارسی وارد کنید.")
    .required("نام کامل خود را به فارسی وارد کنید.")
    .min(5, "نام کامل خود را به فارسی وارد کنید."),
  bankName: Yup.string().required("لطفا بانک خود را انتخاب کنید."),

  shebaNumber: Yup.string()
    .required("لطفا این فیلد را وارد کنید.")
    .min(24, "لطفا این فیلد را درست وارد کنید.")
    .max(24, "لطفا این فیلد را درست وارد کنید."),
  accountNumber: Yup.string()
    .required("لطفا این فیلد را وارد کنید.")
    .min(8, "لطفا این فیلد را درست وارد کنید."),
  cardNumber: Yup.string()
    .required("لطفا این فیلد را وارد کنید.")
    .min(16, "لطفا این فیلد را درست وارد کنید.")
    .max(16, "لطفا این فیلد را درست وارد کنید."),
});
const onSubmit = async (values, submitMethods, navigate, prop) => {
  try {
    const res = await adminPostService(values, "addSiteBankCard", "");
    if (res.status == 200) {
      if (res.data) {
        Alert("انجام شد.", "", "success");
        prop.setFilterOk(true);
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

const depositArea = (prop) => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        holderName: "",

        bankName: "",
        shebaNumber: "",
        accountNumber: "",
        cardNumber: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, submitMethods) => {
        onSubmit(values, submitMethods, navigate, prop);
      }}
    >
      {(formik) => {
        return (
          <Form>
            <FormikControl
              formik={formik}
              control="input"
              type="text"
              name="holderName"
              label="نام و نام خانوادگی"
              placeholder="Full Name"
              labelcolor="red"
              size={prop.size}
              className="farsi"
            />

            <Divider inverted />
            <FormikControl
              formik={formik}
              control="select"
              name="bankName"
              label=" نام بانک"
              labelcolor="black"
              size={prop.size}
              className="farsi"
              options={bankOptions}
              value={bankOptions[0].value}
            />

            {accs.map((item, i) => (
              <FormikControl
                formik={formik}
                key={i}
                control="input"
                type="text"
                name={accsName[i]}
                placeholder={accsNameHolder[i]}
                label={item}
                labelcolor="yellow"
                size={prop.size}
                inputmode="numeric"
              />
            ))}

            {carts.map((item, i) => (
              <FormikControl
                formik={formik}
                key={i}
                control="input"
                type="text"
                name={cartsName[i]}
                placeholder={cartsNameHolder[i]}
                label={item}
                labelcolor="orange"
                size={prop.size}
                inputmode="numeric"
              />
            ))}
            <Button
              content={"ثبت"}
              fluid
              style={{ margin: "10px 0" }}
              className="farsi"
              type="submit"
              color="olive"
              disabled={formik.isSubmitting}
              loading={formik.isSubmitting}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default depositArea;
