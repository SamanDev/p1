import React, { useState } from "react";

import FormikControl from "../../components/form/FormikControl";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../utils/alerts";
import { adminPostService } from "../../services/admin";
import {
  Input,
  Segment,
  Button,
  Dimmer,
  Loader,
  Modal,
  Select,
  Radio,
} from "semantic-ui-react";

const validationSchema = Yup.object({
  username: Yup.string()

    .required("نام کاربری حداقل باشد 3 کاراکتر باشد.")
    .min(3, "نام کاربری حداقل باشد 3 کاراکتر باشد.")
    .max(12, "نام کاربری حداکثر باشد 12 کاراکتر باشد.")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "نام کاربری فقط می تواند شامل حروف لاتین و اعداد باشد."
    ),
});
const onSubmit = async (values, submitMethods, navigate, prop, setRefresh) => {
  setRefresh(true);
  try {
    const res = await adminPostService(values, "runnerService");
    if (res.status == 200) {
      setRefresh(false);
      prop.setCashierOpen(false);
    }

    submitMethods.setSubmitting(false);
  } catch (error) {
    submitMethods.setSubmitting(false);
    setRefresh(false);
  }
};

const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      {" "}
      <Modal.Header>Cashier System</Modal.Header>
      <Modal.Content className="myaccount popup">
        <Formik
          initialValues={{
            amount: prop?.obj.amount ? prop?.obj.amount : 0,

            winPercent: prop?.obj.winPercent ? prop?.obj.winPercent : 10,
            percent: prop?.obj.percent ? prop?.obj.percent : 10,

            username: prop?.obj.username ? prop?.obj.username : "",
            refer: prop?.obj.refer ? prop?.obj.refer : "",
          }}
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
                  name="username"
                  label="username"
                  labelcolor={"grey"}
                  size={"large"}
                  autoComplete="off"
                />
                <FormikControl
                  formik={formik}
                  control="input"
                  type="text"
                  name="refer"
                  label="username2"
                  labelcolor={"grey"}
                  size={"large"}
                  autoComplete="off"
                />
                <FormikControl
                  formik={formik}
                  control="amount"
                  type="text"
                  name="amount"
                  label="Amount"
                  labelcolor={"red"}
                  size={"large"}
                  autoComplete="off"
                />
                <FormikControl
                  formik={formik}
                  control="input"
                  type="text"
                  name="percent"
                  label="Rake%"
                  labelcolor={"grey"}
                  size={"large"}
                  autoComplete="off"
                />
                <FormikControl
                  formik={formik}
                  control="input"
                  type="text"
                  name="winPercent"
                  label="Win%"
                  labelcolor={"grey"}
                  size={"large"}
                  autoComplete="off"
                />
                <br />
                <Button
                  size="large"
                  color="red"
                  loading={refresh}
                  disabled={refresh}
                  fluid
                >
                  Save
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Modal.Content>
    </>
  );
};

export default depositArea;
