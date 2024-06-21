import React from "react";
import { Button, Divider } from "semantic-ui-react";
import AuthFormikControl from "../../../components/form/FormikControl";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { registerService } from "../../../services/auth";
import { MyToast } from "../../../utils/myAlert";

function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

const validationSchema = Yup.object({
  username: Yup.string()
    .required("نام کاربری حداقل باشد 3 کاراکتر باشد.")
    .min(3, "نام کاربری حداقل باشد 3 کاراکتر باشد.")
    .max(12, "نام کاربری حداکثر باشد 12 کاراکتر باشد.")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "نام کاربری فقط می تواند شامل حروف لاتین و اعداد باشد."
    ),
  email: Yup.string()
    .required("لطفا یک ایمیل معتبر وارد کنید.")
    .email("لطفا یک ایمیل معتبر وارد کنید."),
  password: Yup.string()
    .required("کلمه عبور حداقل باشد 8 کاراکتر باشد.")
    .min(8, "کلمه عبور حداقل باشد 8 کاراکتر باشد.")

    .matches(/(?=.*\d)/, "کلمه عبور حتما باید شامل یک عدد باشد.")

    .matches(/((?=.*[A-Z]){1})/, "کلمه عبور حتما باید شامل یک حرف بزرگ باشد.")
    .matches(/(?=.*\W)/, "کلمه عبور حتما باید شامل علامت (?!@...) باشد."),
  newPassword: Yup.string()

    .required("کلمه عبور حداقل باشد 8 کاراکتر باشد.")

    .oneOf([Yup.ref("password"), null], "کلمه های عبور باید مطابقت ندارند."),
});
const onSubmit = async (values, submitMethods) => {
  const res = await registerService(values);
  if (res.status == 200) {
    if (res.data.accessToken) {
      submitMethods.resetForm();
      MyToast("انجام شد", "success");
    }
  }
  submitMethods.setSubmitting(false);
};

const depositArea = (prop) => {
  const loginToken = prop.loginToken;
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        newPassword: "",

        refer: loginToken?.username,
      }}
      onSubmit={(values, submitMethods) => onSubmit(values, submitMethods)}
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <Form>
            <AuthFormikControl
              formik={formik}
              control="input"
              type="text"
              name="username"
              label="نام کاربری"
              labelcolor={prop.labelcolor}
              size={prop.size}
              maxLength="12"
              autoComplete="username"
            />
            <AuthFormikControl
              formik={formik}
              control="input"
              type="email"
              name="email"
              label="ایمیل"
              labelcolor={prop.labelcolor}
              size={prop.size}
              autoComplete="email"
            />
            <Divider inverted />
            <AuthFormikControl
              formik={formik}
              control="input"
              type="password"
              name="password"
              autoComplete="new-password"
              label=" کلمه عبور "
              labelcolor={prop.labelcolor}
              size={prop.size}
            />
            <AuthFormikControl
              formik={formik}
              control="input"
              type="password"
              name="newPassword"
              label="تکرار کلمه عبور"
              labelcolor={prop.labelcolor}
              autoComplete="new-password"
              size={prop.size}
            />
            <Button
              content="ساخت اکانت"
              fluid
              type="submit"
              style={{ margin: "10px 0" }}
              disabled={formik.isSubmitting}
              loading={formik.isSubmitting}
              className="farsi"
              color="orange"
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default depositArea;
