import React, { useState } from "react";

import DepositButton from "../../../input/DepositButton";

import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormikControl from "../../../../../components/form/FormikControl";
import { cashierService } from "../../../../../services/cashier";
import { Alert } from "../../../../../utils/alerts";

const initialValues = {
  action: "deposit",
  amount: 100,
  coin: "BTC",
  amountDollar: 100,
  usd: true,
};
const validationSchema = Yup.object({
  amount: Yup.number().required("لطفا این فیلد را وارد کنید.").integer(),

  amountDollar: Yup.number()
    .required("لطفا این فیلد را وارد کنید.")
    .min(3, "لطفا این فیلد را درست وارد کنید.")
    .integer(),
});
const onSubmit = async (values, submitMethods, navigate, prop, setRefresh) => {
  values.amountDollar = values.amount;
  try {
    const res = await cashierService(values, "coinPayments", "");
    if (res.status == 200) {
      submitMethods.resetForm();
      if (res.data?.address) {
        setRefresh(true);
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
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

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
            <FormikControl
              formik={formik}
              control="amountusd"
              name="amount"
              labelcolor={prop.labelcolor}
              size={prop.size}
              dollar={false}
            />

            <DepositButton
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
