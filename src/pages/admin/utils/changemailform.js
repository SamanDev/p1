import React from "react";
import { Button } from "semantic-ui-react";
import AuthFormikControl from "../../../components/authForm/AuthFormikControl";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FormInput, FormGroup, FormButton } from "semantic-ui-react";

import { adminPutService } from "../../../services/admin";
const validationSchema = Yup.object({
  value: Yup.string()
    .required("لطفا یک ایمیل معتبر وارد کنید.")
    .email("لطفا یک ایمیل معتبر وارد کنید."),
});
const onSubmit = async (values, submitMethods) => {

    try {
        const res = await adminPutService(values, "updateUserByAdmin");
        if (res.status == 200) {
        } else {
          Alert("متاسفم...!", res.data.message, "error");
        }
      } catch (error) {
        Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
      }
  const res = await registerService(values);
  if (res.status == 200) {
    if (res.data.accessToken) {
      prop.setSecondOpen(false);
      prop.setIsUser(true);
      localStorage.setItem(btoa(values.username), btoa(values.password));
    }
  }
  submitMethods.setSubmitting(false);
};

const depositArea = (prop) => {
  return (
    <Formik
      initialValues={{
        id:prop.id,
        key: 'email',
        childId: '',
        value: "",
      }}
      onSubmit={(values, submitMethods) => onSubmit(values, submitMethods)}
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <Form>
            <FormGroup>
        
                <AuthFormikControl
                  formik={formik}
                  control="input"
                  type="email"
                  name="value"
                  label="ایمیل"
                  labelcolor={prop.labelcolor}
                  size={prop.size}
                  autoComplete="email"
                  placeholder={prop.value}
                />
             {formik.values.value!=""&&<Button
                  content="Change Email"
                  fluid
                  type="submit"
                  style={{ margin: "10px 0" }}
                  disabled={formik.isSubmitting}
                  loading={formik.isSubmitting}
                  className="farsi"
                  color="orange"
                  size="mini"
                />}

          
                
          
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
};

export default depositArea;
