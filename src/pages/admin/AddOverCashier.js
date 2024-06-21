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


const onSubmit = async (values, submitMethods, navigate, prop, setRefresh) => {
  var _values = values;

  setRefresh(true);
  try {
    const res = await adminPostService(_values, "addOverCashout");
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
      <Modal.Header>Over Cashier System</Modal.Header>
      <Modal.Content className="myaccount popup">
        <Formik
          initialValues={{
 
            amount: prop?.defamount ? prop?.defamount : 0,
        
          }}
          onSubmit={(values, submitMethods) =>
            onSubmit(values, submitMethods, navigate, prop, setRefresh)
          }
        
        >
          {(formik) => {
            return (
              <Form>
               
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
                <br />
                <Button
                  size="large"
                  color="orange"
                  loading={refresh}
                  disabled={refresh}
                  fluid
                >
                  Add Chips
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
