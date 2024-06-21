import React, { useState } from "react";

import CashoutButton from "../../input/CashoutButton";
import FormikControl from "../../../../components/form/FormikControl";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { cashierServiceGame } from "../../../../services/cashier";
import { Alert } from "../../../../utils/alerts";
import AnimIcon from "../../../../utils/inviteIcon";

const initialValues = {
  amount: 100000,
};
const validationSchema = Yup.object({
  amount: Yup.number()
    .required("لطفا این فیلد را وارد کنید.")
    .min(100000, "لطفا این فیلد را درست وارد کنید.")
    .integer(),
});
const onSubmit = async (values, submitMethods, navigate, prop, setRefresh) => {
  try {
    const res = await cashierServiceGame(values, "exChanger", "");
    if (res.status == 200) {
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
              control="amount"
              name="amount"
              labelcolor={prop.labelcolor}
              size={prop.size}
              dollar={true}
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
