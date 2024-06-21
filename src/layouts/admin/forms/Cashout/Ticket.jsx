import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import AnimIcon from "../../../../utils/inviteIcon";
import FormikControl from "../../../../components/form/FormikControl";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../../../utils/alerts";
import $ from "jquery";
import { cashierService } from "../../../../services/cashier";
import Social from "../../../../utils/social";
const supportDepartments = "خرید چیپ,برداشت,پشتیبانی فنی".split(",");

const countryOptions = [];
supportDepartments.map(function (bank, i) {
  countryOptions.push({ key: i, value: bank, text: bank });
});

const validationSchema = Yup.object({
  message: Yup.string().required("لطفا این فیلد را وارد کنید."),
});
const confirmDel = (id) => {
  $("#con" + id).hide();
  $("#del" + id).show();
};

const onSubmit = async (values, submitMethods, navigate, prop) => {
  try {
    const res = await cashierService(values, "submitTicket", "");
    if (res.status == 200) {
      $("#opensupport").trigger("click");
      if (prop.setRefresh) {
        prop.setRefresh(res.data);
      }
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
  const initialValues = {
    department: prop.departman ? prop.departman : countryOptions[0].value,
    id: prop.userid ? prop.userid : 0,
    ticketId: prop.id ? prop.id : 0,
    message: prop.status ? prop.status : "",
    status: prop.status ? prop.status : "Open",
  };
  const [refresh, setRefresh] = useState(false);
  const [depMode, setDepMode] = useState(false);
  const navigate = useNavigate();
  if (prop.status == "Close") {
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
                content="x"
                style={{
                  top: 2,
                  right: 0,
                  padding: "5px 10px 9px",
                  position: "absolute",
                  lineHeight: "5px",
                  fontSize: "10px",
                }}
                onClick={() => confirmDel(prop.userid)}
                type="button"
                color="red"
                size="mini"
                id={"con" + prop.userid}
                disabled={formik.isSubmitting}
                loading={formik.isSubmitting}
              />
              <Button
                content="حذف کن"
                style={{
                  top: 2,
                  right: 30,
                  padding: "5px 10px",
                  position: "absolute",
                  lineHeight: "8px",
                  fontSize: "10px",
                  display: "none",
                }}
                className="farsi"
                type="submit"
                color="orange"
                size="tiny"
                id={"del" + prop.userid}
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
          return (
            <Form>
              {prop.departman ? (
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
                      icon="krmfspeu"
                      width="200px"
                      height="150px"
                      trigger="hover"
                    />
                  </div>
                </div>
              ) : (
                <div
                  className="fadeout"
                  style={{ height: 150, position: "relative" }}
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
                      icon="uukerzzv"
                      width="250px"
                      height="200px"
                      trigger="hover"
                    />
                  </div>
                </div>
              )}
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

              <FormikControl
                formik={formik}
                control="textarea"
                type="text"
                name="message"
                labelcolor="orange"
                className="farsi"
                size={prop.size}
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
              {!prop.departman && <Social {...prop} />}
            </Form>
          );
        }}
      </Formik>
    );
  }
};

export default depositArea;
