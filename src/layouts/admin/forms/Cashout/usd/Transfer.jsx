import React, { useState } from "react";

import CashoutButton from "../../../input/CashoutButton";
import FormikControl from "../../../../../components/form/FormikControl";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { cashierService } from "../../../../../services/cashier";
import { Alert } from "../../../../../utils/alerts";
import AnimIcon from "../../../../../utils/inviteIcon";
import { getCashAmount, doCurrency } from "../../../../../const";
const initialValues = {
  amount: 10,
  usd: true,
  transferUser: "",
  username: "",
  password: "",
  amountDollar: 100,
};

const onSubmit = async (values, submitMethods, navigate, prop, setRefresh) => {
  try {
    var _values = values;
    _values.dollarAmount = values.amount;

    const res = await cashierService(_values, "transferChip", "");
    if (res.status == 200) {
      Alert("Done", "انجام شد.", "success");
      setRefresh(true);
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
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const loginToken = prop.loginToken;
  const siteInfo = prop.siteInfo;
  const validationSchema = Yup.object({
    amount: Yup.number()
      .required("لطفا این فیلد را وارد کنید.")
      .min(
        siteInfo.cashoutLimitDollar,
        "حداقل مبلغ " +
          doCurrency(siteInfo.cashoutLimitDollar) +
          " دلار می باشد."
      )
      .max(loginToken.balance2, "موجودی ناکافی است.")
      .integer(),

    transferUser: Yup.string()
      .required("نام کاربری حداقل باشد 3 کاراکتر باشد.")
      .min(3, "نام کاربری حداقل باشد 3 کاراکتر باشد.")
      .max(12, "نام کاربری حداکثر باشد 12 کاراکتر باشد."),
    password: Yup.string()
      .required("کلمه عبور حداقل باشد 8 کاراکتر باشد.")
      .min(8, "کلمه عبور حداقل باشد 8 کاراکتر باشد."),
  });
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, submitMethods) =>
        onSubmit(values, submitMethods, navigate, prop, setRefresh)
      }
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <Form>
            <div
              className="fadeout"
              style={{ height: 100, position: "relative" }}
            >
              <div
                style={{
                  position: "absolute",
                  zIndex: 0,
                  top: -15,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <AnimIcon
                  icon="ssdupzsv"
                  width="200px"
                  height="150px"
                  trigger="loop"
                  colors="primary:#545454,secondary:#916f10"
                />
              </div>
            </div>
            <FormikControl
              formik={formik}
              control="amountusd"
              name="amount"
              labelcolor={prop.labelcolor}
              size={prop.size}
              dollar={false}
              def={10}
            />
            <FormikControl
              formik={formik}
              control="input"
              type="text"
              name="transferUser"
              labelcolor="black"
              size={prop.size}
              label="انتقال به کاربر"
              autoComplete="receiver"
            />
            <span style={{ position: "absolute", opacity: 0, zIndex: -1 }}>
              <FormikControl
                formik={formik}
                control="input"
                type="text"
                name="username"
                labelcolor={prop.labelcolor}
                size={prop.size}
                autoComplete="username"
                readOnly={true}
                defaultValue={loginToken?.username}
                disabled={formik.errors ? true : false}
              />
            </span>
            <FormikControl
              formik={formik}
              control="input"
              type="password"
              name="password"
              label=" کلمه عبور"
              labelcolor="red"
              size={prop.size}
              autoComplete="password"
            />

            <CashoutButton
              {...prop}
              val="انتقال"
              disabled={formik.isSubmitting}
              loading={formik.isSubmitting}
              refresh={refresh}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default depositArea;
