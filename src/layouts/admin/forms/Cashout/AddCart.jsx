import { Form, Formik, useField, useFormikContext } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Icon, Message } from "semantic-ui-react";
import * as Yup from "yup";
import FormikControl from "../../../../components/form/FormikControl";
import { Alert } from "../../../../utils/alerts";
import { MyToastDone } from "../../../../utils/myAlert";
import List from "../../../../pages/dashboard/ListCarts";
import { cashierService } from "../../../../services/cashier";
const SelectB =
  "بانک ملّی ایران,بانک اقتصاد نوین,بانک قرض‌الحسنه مهر ایران,بانک سپه,بانک پارسیان,بانک قرض‌الحسنه رسالت,بانک صنعت و معدن,بانک کارآفرین,بانک کشاورزی,بانک سامان,بانک مسکن,بانک سینا,بانک توسعه صادرات ایران,بانک خاور میانه,بانک توسعه تعاون,بانک شهر,پست بانک ایران,بانک دی,بانک صادرات,بانک ملت,بانک تجارت,بانک رفاه,بانک حکمت ایرانیان,بانک گردشگری,بانک ایران زمین,بانک قوامین,بانک انصار,بانک سرمایه,بانک پاسارگاد,بانک مشترک ایران-ونزوئلا".split(
    ","
  );
const accs = "IR - شماره شبا".split(",");
const accsName = "shebaNumber".split(",");
const accsMax = "24,50".split(",");
const accsNameHolder = "Sheba Number,Account Number".split(",");
const carts = "شماره کارت".split(",");
/* const accs = "IR - شماره شبا,شماره حساب".split(",");
const accsName = "shebaNumber,accountNumber".split(",");
const accsMax = "24,50".split(",");
const accsNameHolder = "Sheba Number,Account Number".split(",");
const carts = "شماره کارت,cvv2 کارت".split(","); */

const cartsName = "cardNumber,cvv".split(",");
const cartsMax = "16,4".split(",");
const cartsNameHolder = "Cart Number,CVV2".split(",");
const bankOptions = [];
const monthOptions = [];
const yearOptions = [];
SelectB.map(function (bank, i) {
  bankOptions.push({ key: i, value: bank, text: bank });
});
for (let i = 1; i < 13; i++) {
  var j = i;
  if (i < 10) {
    j = "0" + i;
  }
  monthOptions.push({ key: i, value: "" + j + "", text: j });
}
for (let x = 1401; x < 1431; x++) {
  yearOptions.push({ key: x, value: "" + x + "", text: x });
}
const nameRegex =
  /^['\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9\u06AF\u06BE\u06CC\u0020']+$/;

const validationSchema = Yup.object({
  holderName: Yup.string()
    .matches(nameRegex, "نام کامل خود را به فارسی وارد کنید.")
    .required("نام کامل خود را به فارسی وارد کنید.")
    .min(5, "نام کامل خود را به فارسی وارد کنید."),
  bankName: Yup.string().required("لطفا بانک خود را انتخاب کنید."),
  mobile: Yup.string()
    .required("لطفا این فیلد را وارد کنید.")
    .min(11, "لطفا این فیلد را درست وارد کنید.")
    .max(11, "لطفا این فیلد را درست وارد کنید."),

  shebaNumber: Yup.string()
    .required("لطفا این فیلد را وارد کنید.")
    .min(24, "لطفا این فیلد را درست وارد کنید.")
    .max(24, "لطفا این فیلد را درست وارد کنید."),
  /* accountNumber: Yup.string()
    .required("لطفا این فیلد را وارد کنید.")
    .min(8, "لطفا این فیلد را درست وارد کنید."), */
  cardNumber: Yup.string()
    .required("لطفا این فیلد را وارد کنید.")
    .min(16, "لطفا این فیلد را درست وارد کنید.")
    .max(16, "لطفا این فیلد را درست وارد کنید."),
  /* cvv: Yup.string()
    .required("لطفا این فیلد را وارد کنید.")
    .min(3, "لطفا این فیلد را درست وارد کنید.")
    .max(4, "لطفا این فیلد را درست وارد کنید."),
  monthno: Yup.number()
    .required("لطفا این فیلد را وارد کنید.")
    .min(1, "حداقل این فیلد 01 است.")
    .max(12, "حداکثر این فیلد 12 است."),
  yearno: Yup.number()
    .required("لطفا این فیلد را وارد کنید.")
    .min(1401, "حداقل این فیلد 1401 است.")
    .max(1430, "حداکثر این فیلد 1430 است."), */
});
const onSubmit = async (values, submitMethods, navigate, prop) => {
  try {
    const res = await cashierService(values, "addUserBankInfo", "");
    if (res.status == 200) {
      if (res.data) {
        if (res.data?.accessToken) {
          MyToastDone("انجام شد.", "success");
          //Alert("انجام شد.", "", "success");
          if (prop.setRefresh) {
            prop.setRefresh(true);
          }
          submitMethods.resetForm();
        }
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
var _name = "";
var _mobile = "09";
const MyField = (props) => {
  const {
    values: { yearno, monthno, holderName, mobile },
    touched,
    setFieldValue,
  } = useFormikContext();
  const [field, meta] = useField(props);

  React.useEffect(() => {
    // set the value of textC, based on textA and textB
    if (
      yearno.trim() !== "" &&
      monthno.trim() !== "" &&
      touched.yearno &&
      touched.monthno
    ) {
      var _mon = monthno;
      if (_mon.length < 2) {
        _mon = "0" + monthno;
      }
      var expiration = yearno.slice(-2) + "/" + _mon;

      setFieldValue(props.name, expiration);
    }
  }, [
    yearno,
    monthno,
    touched.yearno,
    touched.monthno,
    setFieldValue,
    props.name,
  ]);
  React.useEffect(() => {
    // set the value of textC, based on textA and textB
    if (_name !== "") {
      if (_name !== holderName) {
        setFieldValue("holderName", _name);
      }
    }
    if (_mobile !== "09") {
      if (_mobile !== mobile) {
        setFieldValue("mobile", _mobile);
      }
    }
  }, [holderName, mobile, setFieldValue, props.name]);

  return (
    <>
      <input {...props} {...field} />
    </>
  );
};

const depositArea = (prop) => {
  const navigate = useNavigate();
  const loginToken = prop.loginToken;

  if (loginToken?.bankInfos.length > 0) {
    _name = loginToken.bankInfos[0].holderName;
    _mobile = loginToken.bankInfos[0].mobile;
  }

  return (
    <Formik
      initialValues={{
        holderName: _name,
        mobile: _mobile,
        bankName: bankOptions[0].value,
        shebaNumber: "",
        accountNumber: "",
        cardNumber: "",
        cvv: "",
        monthno: monthOptions[0].value,
        yearno: yearOptions[0].value,
        expiration: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, submitMethods) => {
        onSubmit(values, submitMethods, navigate, prop);
      }}
    >
      {(formik) => {
        return (
          <Form>
            <MyField name="expiration" type="hidden" />

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
              inputmode="text"
              readOnly={_name}
              autoComplete="name"
            />
            <FormikControl
              formik={formik}
              control="input"
              name="mobile"
              label="شماره همراه"
              maxLength="11"
              labelcolor="red"
              size={prop.size}
              inputmode="numeric"
              readOnly={_name}
              autoComplete="mobile"
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

            <Divider inverted />
            {/* <Message
              color="yellow"
              compact
              className="mymessage"
              size="mini"
              icon
            >
              <Icon
                circular
                inverted
                color="black"
                name="info"
                style={{ fontSize: 20 }}
              />

              <Message.Content className="farsi">
                این اظلاعات برای برداشت نقدی شما استفاده می شود
              </Message.Content>
            </Message> */}
            {accs.map((item, i) => (
              <FormikControl
                formik={formik}
                key={i}
                control="input"
                type="text"
                name={accsName[i]}
                maxLength={accsMax[i]}
                autoComplete={accsName[i]}
                placeholder={accsNameHolder[i]}
                label={item}
                labelcolor="orange"
                size={prop.size}
                inputmode="numeric"
              />
            ))}
            {/*  <Divider inverted />
            <Message
              color="yellow"
              compact
              className="mymessage"
              size="mini"
              icon
            >
              <Icon
                circular
                inverted
                color="black"
                name="info"
                style={{ fontSize: 20 }}
              />

              <Message.Content className="farsi">
                این اظلاعات برای سهولت در واریز شما استفاده می شود
              </Message.Content>
            </Message> */}
            {carts.map((item, i) => (
              <FormikControl
                formik={formik}
                key={i}
                control="input"
                type="text"
                name={cartsName[i]}
                autoComplete={cartsName[i]}
                maxLength={cartsMax[i]}
                placeholder={cartsNameHolder[i]}
                label={item}
                labelcolor="orange"
                size={prop.size}
                inputmode="numeric"
              />
            ))}
            {/* <FormikControl
              formik={formik}
              control="select"
              name="yearno"
              label="سال انقضاکارت"
              labelcolor="orange"
              size={prop.size}
              options={yearOptions}
            />
            <FormikControl
              formik={formik}
              control="select"
              name="monthno"
              label="ماه انقضاکارت"
              labelcolor="orange"
              size={prop.size}
              options={monthOptions}
            /> */}

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

            <List title="کارت های بانکی" mode="cart" {...prop} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default depositArea;
