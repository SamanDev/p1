import React, { useState } from "react";

import CashoutButton from "../../../input/CashoutButton";
import FormikControl from "../../../../../components/form/FormikControl";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../../../../utils/alerts";
import { cashierService } from "../../../../../services/cashier";
import { getCashAmountUsd } from "../../../../../const";
import { doCurrency } from "../../../../../const";
import { Button, Progress, Divider,Icon,Label } from "semantic-ui-react";
import DollarSelect from "../../../../../components/form/dollarSelectDollar";

const onSubmit = async (values, submitMethods, navigate, prop, setRefresh) => {
  var _val = values;
  _val.amountDollar = _val.amount;
  try {
    const res = await cashierService(_val, "coinPayments", "");
    if (res.status == 200) {
      Alert("Done", "انجام شد.", "success");
      setRefresh(true);
    }
    submitMethods.setSubmitting(false);
  } catch (error) {
    submitMethods.setSubmitting(false);

    // Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
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
        "حداقل مبلغ " + siteInfo.cashoutLimitDollar + " دلار می باشد."
      )
      .max(loginToken.balance2, "موجودی ناکافی است.")
      .integer(),

    userWalletAddress: Yup.string()
      .required("لطفا این فیلد را وارد کنید.")
      .min(10, "لطفا این فیلد را درست وارد کنید."),
    password: Yup.string()
      .required("کلمه عبور حداقل باشد 8 کاراکتر باشد.")
      .min(8, "کلمه عبور حداقل باشد 8 کاراکتر باشد."),
  });
  var _bal = getCashAmountUsd(loginToken.balance2);
  return (
    <Formik
      initialValues={{
        amount: 0,

        action: "cashout",
        usd: true,
        coin: "BTC",
        amountDollar: 0,
        userWalletAddress: "",
        username: "",
        password: "",
      }}
      onSubmit={(values, submitMethods) =>
        onSubmit(values, submitMethods, navigate, prop, setRefresh)
      }
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <Form autoComplete="off">
             <DollarSelect loginToken={loginToken} formik={formik} />
            {formik.errors["amount"] &&formik.touched["amount"] && (
                  <Label
                    className="farsi"
                    basic
                    color="red"
                    pointing="below"
                    size="mini"
                    
                  >
                    {formik.errors["amount"]}
                  </Label>
                )}
            
    
            <FormikControl
              formik={formik}
              control="input"
              type="text"
              name="userWalletAddress"
              label="BTC Wallet"
              labelcolor="red"
              size={prop.size}
              autoFocus
              autoComplete="btc-wallet"
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
