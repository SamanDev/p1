import React, { useState } from "react";

import CashoutButton from "../../../input/CashoutButton";
import FormikControl from "../../../../../components/form/FormikControl";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../../../../utils/alerts";
import { cashierService } from "../../../../../services/cashier";
import { getCashAmountUsd } from "../../../../../const";
import DollarSelect from "../../../../../components/form/dollarSelectDollar";
const onSubmit = async (values, submitMethods, navigate, prop, setRefresh) => {
  var _val = values;
  _val.amountDollar = _val.amount;

  _val.dollarAmount = _val.amount;
  try {
    const res = await cashierService(_val, "createCashoutPM", "");
    if (res.status == 200) {
      Alert("Done", "انجام شد.", "success");
      setRefresh(true);
    }
    submitMethods.setSubmitting(false);
  } catch (error) {
    submitMethods.setSubmitting(false);

    //Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
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
  });
  var _bal = getCashAmountUsd(loginToken.balance2);
  return (
    <Formik
      initialValues={{
        amount: 0,
        usd: true,
        amountDollar: 0,
      }}
      onSubmit={(values, submitMethods) =>
        onSubmit(values, submitMethods, navigate, prop, setRefresh)
      }
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <Form>
            <DollarSelect loginToken={loginToken} formik={formik} />
     

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
