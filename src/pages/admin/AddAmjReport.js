import React, { useState } from "react";

import FormikControl from "../../components/form/FormikControl";
import { useNavigate } from "react-router-dom";
import { Form, Formik ,FastField} from "formik";
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
  Radio, Label,Dropdown
} from "semantic-ui-react";
var cartsOptions = [{
  key: -1,

  text: "...",
  value: "",
},{
  key: 0,

  text: "HangOver2",
  value: "HangOver2",
},{
  key: 1,

  text: "jonsnow2",
  value: "jonsnow2",
},{
  key: 2,

  text: "JamieW2",
  value: "JamieW2",
},{
  key: 3,

  text: "NeverHood2",
  value: "NeverHood2",
},{
  key: 4,

  text: "King2",
  value: "King2",

},{
  key: 5,

  text: "Toni",
  value: "Toni",
}];

const initialValues = {
  mode: "remove",
  amount: 0,
  description: "",
  adminName: "",
};
const validationSchema = Yup.object({
  amount: Yup.number()
    .required("لطفا این فیلد را وارد کنید.")
    .min(100, "لطفا این فیلد را درست وارد کنید.")
    .integer(),
  description: Yup.string()
    .required("لطفا این فیلد را وارد کنید.")
    .min(8, "لطفا این فیلد را درست وارد کنید."),
});
const onSubmit = async (values, submitMethods, navigate, prop, setRefresh) => {
  setRefresh(true);
  try {
    const res = await adminPostService(values, "addVgcReport");
    if (res.status == 200) {
      setRefresh(false);
      prop.setFirstOpen(false);
    }

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
    <>
      {" "}
      <Modal.Header>Add VGC Report</Modal.Header>
      <Modal.Content className="myaccount popup" style={{minHeight:500}}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, submitMethods) =>
            onSubmit(values, submitMethods, navigate, prop, setRefresh)
          }
          validationSchema={validationSchema}
        >
          {(formik) => {
            return (
              <Form >
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
                      formik.setFieldValue("adminName", "");
                      formik.setFieldValue("mode", "add");
                    }}
                    positive={formik.values.mode === "add"}
                  >
                    Add
                  </Button>
                </Button.Group>
               
                <FormikControl
                  formik={formik}
                  control="amount"
                  type="text"
                  name="amount"
                  label="Amount"
                  labelcolor={"red"}
                  size={"large"}
                  autoComplete="off"
                  inputmode="numeric"
                />
                {formik.values.mode === "remove"  && 
                 <Input size={"large"} fluid labelPosition="left" defaultValue="">
        <Label
          size={"large"}
          pointing="right"
         color="orange"
          className="farsi"
        >
         Admin Name
        </Label>

        <FastField
          as={Dropdown}
          placeholder="..."
          name={"adminName"}
    
          selection
          fluid
          options={cartsOptions}
          onChange={(e, data) => {
            formik.setFieldValue("adminName", data.value);
       
          }}
        />
      </Input>}
                <FormikControl
                  formik={formik}
                  control="input"
                  type="text"
                  name="description"
                  label="Description"
                  labelcolor={"grey"}
                  size={"large"}
                  autoComplete="off"
                />
                <br />
                <Button
                  size="large"
                  color="red"
                  icon="times"
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
