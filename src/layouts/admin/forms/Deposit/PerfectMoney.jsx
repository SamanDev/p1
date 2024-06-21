import React, { useState } from "react";
import DepositButton from "../../input/DepositButton";

import FormikControl from "../../../../components/form/FormikControl";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../../../utils/alerts";
import { cashierService } from "../../../../services/cashier";

const initialValues = {
  voucherNumber: "",
  voucherCode: "",
};
const validationSchema = Yup.object({
  voucherNumber: Yup.number()
    .required("لطفا این فیلد را وارد کنید.")
    .min(100, "لطفا این فیلد را درست وارد کنید.")
    .integer(),
  voucherCode: Yup.string()
    .required("لطفا این فیلد را وارد کنید.")
    .min(8, "لطفا این فیلد را درست وارد کنید."),
});
const onSubmit = async (values, submitMethods, navigate, prop, setRefresh) => {
  try {
    const res = await cashierService(values, "createDepositPM", "");
    setRefresh(true);
    submitMethods.setSubmitting(false);
  } catch (error) {
    submitMethods.setSubmitting(false);

    Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
  }
};

const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(false);
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
              control="input"
              type="text"
              inputmode="numeric"
              name="voucherNumber"
              label="eVoucher Number"
              labelcolor={prop.labelcolor}
              size={prop.size}
              autoComplete="off"
            />
            <FormikControl
              formik={formik}
              control="input"
              type="text"
              inputmode="numeric"
              name="voucherCode"
              label="Activition Code"
              labelcolor={prop.labelcolor}
              size={prop.size}
              autoComplete="off"
            />
            <FormikControl
              formik={formik}
              control="amount"
              name="amount"
              labelcolor={prop.labelcolor}
              size={prop.size}
              rate={true}
            />

            <DepositButton
              {...prop}
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
