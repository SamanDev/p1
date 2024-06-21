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
    const res = await adminPostService(values, "addRemoveChangeBotRunner");
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
        

            username: prop?.obj.username ? prop?.obj.username : "",
            mode: prop?.obj.mode ? prop?.obj.mode : "add",
            role: prop?.obj.role ? prop?.obj.role : "bots",
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
                /><br /> <br />
                <Button.Group fluid widths={3}>
                  <Button
                    type="button"
                    onClick={() => {
                      formik.setFieldValue("mode", "remove");
                    
                    }}
                    positive={formik.values.mode === "remove"}
                  >
                    Remove
                  </Button>
                  <Button.Or text="or" />
                  <Button
                    type="button"
                    onClick={() => {
                      formik.setFieldValue("mode", "add");
                      formik.setFieldValue("role", "bots");
                    }}
                    positive={formik.values.mode === "add"}
                  >
                    Add
                  </Button>
                </Button.Group>
                <br /> <br />
                <Button.Group fluid widths={3}>
                  <Button
                    type="button"
                    onClick={() => {
                      formik.setFieldValue("role", "bots");
                    }}
                    positive={formik.values.role === "bots"}
                  >
                    Bot
                  </Button>
                  <Button.Or text="or" />
                  <Button
                    type="button"
                    onClick={() => {
                      formik.setFieldValue("role", "runner");
                    }}
                    positive={formik.values.role === "runner"}
                    disabled={formik.values.mode === "add"}
                  >
                    Runner
                  </Button>
                </Button.Group>
                
                
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
