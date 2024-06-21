import React, { useState } from "react";

import CashoutButton from "../../input/CashoutButton";
import FormikControl from "../../../../components/form/FormikControl";
import DollarSelect from "../../../../components/form/dollarSelect";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../../../utils/alerts";
import { cashierService } from "../../../../services/cashier";
import { doCurrency } from "../../../../const";

const onSubmit = async (values, submitMethods, navigate, prop, setRefresh) => {
  try {
    const res = await cashierService(values, "createCashoutPM", "");
    if (res.status == 200) {
      setRefresh(true);
      Alert("Done", "انجام شد.", "success");
    } else {
      Alert("متاسفم...!", res.data.message, "error");
    }
    submitMethods.setSubmitting(false);
  } catch (error) {
    submitMethods.setSubmitting(false);

    //Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
  }
};

const depositArea = (prop) => {
  const [refresh, setRefresh] = useState(false);
  const [getRate, setGetRate] = useState(
    localStorage.getItem("getRate") || 50000
  );

  const navigate = useNavigate();

  const loginToken = prop.loginToken;
  const siteInfo = prop.siteInfo;
  const validationSchema = Yup.object({
    amount: Yup.number()
      .required("لطفا این فیلد را وارد کنید.")
      .min(
        getRate * siteInfo.cashoutLimitDollar,
        "حداقل مبلغ " +
          doCurrency(getRate * siteInfo.cashoutLimitDollar) +
          " تومان می باشد."
      )
      .max(loginToken.balance, "موجودی ناکافی است.")
      .integer(),

    amountDollar: Yup.number()
      .required("لطفا این فیلد را وارد کنید.")
      .min(
        siteInfo.cashoutLimitDollar,
        "حداقل مبلغ " + siteInfo.cashoutLimitDollar + " دلار می باشد."
      ),
  });
  var _bal = loginToken.balance;
  return (
    <Formik
      initialValues={{
        amount: 0,

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
            <DollarSelect loginToken={loginToken} formik={formik} getRate={getRate}/>
            
              <FormikControl
              formik={formik}
              control="amount"
              name="amount"
              labelcolor={prop.labelcolor}
              size={prop.size}
              dollar={false}
              rate={true}
              setGetRate={setGetRate}
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
