import React, { useState } from "react";
import { Button, Select } from "semantic-ui-react";
import FormikControl from "../../../components/form/FormikControl";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../../utils/alerts";
import $ from "jquery";
import { cashierService } from "../../../services/cashier";

const supportDepartments = "خرید چیپ,برداشت,پشتیبانی فنی".split(",");

const countryOptions = [];
supportDepartments.map(function (bank, i) {
  countryOptions.push({ key: i, value: bank, text: bank });
});

const canOptions = [
  { key: 1, value: false, text: "نه" },
  { key: 2, value: true, text: "به پیام های سریع اضافه کن" },
];

const validationSchema = Yup.object({
  message: Yup.string().required("لطفا این فیلد را وارد کنید."),
});

const addMsg = async (values) => {
  try {
    const res = await cashierService(values, "addMessageSample", "");
    if (res.status == 200) {
    } else {
      Alert("متاسفم...!", res.data.message, "error");
    }
  } catch (error) {}
};
const onSubmit = async (values, submitMethods, navigate, prop) => {
  if (values.canadd) {
    addMsg({ message: values.message });
  }

  try {
    const res = await cashierService(values, "submitTicket", "");
    if (res.status == 200) {
      prop.fetchUsers(1);
      submitMethods.resetForm();
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
  console.log(prop);
  const canRes = JSON.parse(localStorage.getItem("sampleMessage"));
  const carOptions = [];
  canRes.sort((a, b) => (a.id < b.id ? 1 : -1));
  canRes.map(function (can, i) {
    carOptions.push({
      key: i,
      value: can.message,
      text: can.message.replace(/\n/g, ","),
    });
  });
  const [refresh, setRefresh] = useState(false);
  const [msg, setMsg] = useState("");
  const initialValues = {
    department: prop.departman ? prop.departman : countryOptions[0].value,
    id: prop.userid ? prop.userid : 0,
    ticketId: prop.id ? prop.id : 0,
    message: prop.status ? prop.status : msg,
    status: prop.status ? prop.status : "open",
    canadd: false,
  };

  const navigate = useNavigate();

  if (prop.status) {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, submitMethods) =>
          onSubmit(values, submitMethods, navigate, prop, setRefresh)
        }
      >
        {(formik) => {
          return (
            <Form>
              <Button
                content={prop.status}
                style={
                  prop.status == "Open"
                    ? {
                        top: 10,
                        right: 0,
                        padding: "5px 10px",
                        position: "absolute",
                      }
                    : {
                        top: 10,
                        right: 0,
                        padding: "5px 10px",
                        position: "absolute",
                      }
                }
                className="farsi"
                type="submit"
                color={prop.status != "Open" ? "red" : "blue"}
                size="tiny"
                disabled={formik.isSubmitting}
                loading={formik.isSubmitting}
              />
            </Form>
          );
        }}
      </Formik>
    );
  } else {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, submitMethods) =>
          onSubmit(values, submitMethods, navigate, prop, setRefresh)
        }
      >
        {(formik) => {
          const handleChange = (e, { name, value }) => {
            var defval = $('[name="message"]:visible').val();
            if (defval != "") {
              defval = defval + "\n";
            }
            defval = defval + value;
            setMsg(defval);
            formik.setFieldValue("message", defval);
            // $('[name="message"]:visible').val(defval);
          };
          return (
            <Form>
              {!prop.departman && (
                <FormikControl
                  formik={formik}
                  control="select"
                  name="department"
                  label="دپارتمان"
                  labelcolor="yellow"
                  size={prop.size}
                  className="farsi"
                  options={countryOptions}
                  value={countryOptions[0].value}
                />
              )}

              <Select
                placeholder="Fast Answer"
                className="farsi"
                fluid
                options={carOptions}
                onChange={handleChange}
              />

              <FormikControl
                formik={formik}
                control="textarea"
                type="text"
                name="message"
                labelcolor="orange"
                className="farsi"
                value={msg}
                size={prop.size}
              />
              <FormikControl
                formik={formik}
                control="switch"
                type="text"
                name="canadd"
                labelcolor="orange"
                label="اضافه شود؟"
                className="farsi"
                size={prop.size}
                options={canOptions}
              />

              <Button
                content={"ثبت"}
                fluid
                style={{ margin: "10px 0" }}
                className="farsi"
                type="submit"
                color="olive"
                disabled={formik.isSubmitting}
                loading={formik.isSubmitting}
              />
            </Form>
          );
        }}
      </Formik>
    );
  }
};

export default depositArea;
