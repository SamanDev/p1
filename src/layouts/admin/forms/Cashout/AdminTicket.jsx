import React, { useState } from "react";
import { Button, Select } from "semantic-ui-react";
import FormikControl from "../../../../components/form/FormikControl";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../../../utils/alerts";
import $ from "jquery";
import { cashierService } from "../../../../services/cashier";

const supportDepartments = "خرید چیپ,برداشت,پشتیبانی فنی".split(",");
const canRes =
  "مشکل برطرف شد@@برای دریافت هدیه بین ساعت 21 تا 24 آنلاین شوید.@@با سلام. منوی برداشت بعد از اولین واریز فعال می شود. @@لطفا مشکلتون رو کامل همراه با جزییات و تاریخ و ساعت توضیح دهید.@@لطفا مشکلتون رو به دپارتمان مربوطه ارسال کنید. برای این کار ابتدا باید این تیکت رو ببندید و با استفاده لینک ثبت تیکت جدید در بالای همین قسمت یک تیکت جدید در دیپارتمان مربوطه ایجاد نمایید.@@لطفا اطلاعات بانکی خود را تصحیح نمایید.@@لطفا قسمت تراکنش های مالی را بررسی کنید.@@کش اوت ها هر روز به نوبت واریز خواهد شد برای اطلاع از وضعیت کش اوت خود به قسمت برداشت نقدی مراجعه نمایید.@@واریز انجام شد. با مراجعه به قسمت برداشت نقدی می توانید وضعیت کش اوت های خود را بررسی کنید.@@واریز انجام شد. با مراجعه به قسمت خرید آنلاین یا تراکنش های مالی می توانید وضعیت خرید های خود را بررسی کنید.@@واریز انجام شد. با مراجعه به قسمت خرید کارت به کارت یا تراکنش های مالی می توانید وضعیت خرید های خود را بررسی کنید.@@لطفا مرورگر خود را مججدا بارگذاری نمایید سپس روی هدیه متحرکی که روی صفحه است کلیک کنید.@@لطفا در صورت مشکل داشتن سیستم خرید آنلاین، از سیستم خرید کارت به کارت استفاده کنید.----روش استفاده:--پس از انتقال مبلغ مورد نظر به کارت درج شده در سایت. در قسمت خرید کارت به کارت مبلغ واریزی و ۴ رقم آخر شماره کارت خودتون را وارد کنید و در عرض چند دقیقه اکانت شما شارژ خواهد شد.@@واریز انجام شد. با تشکر شکیبایی تون@@در صورت عدم دریافت چیپ, تا ۲۰ دقیقه پول تا ساعاتی بعد میاد تو حساب بانکی تون. در غیر این صورت بعد گذشت ۲۴ ساعت به دیپارتمان خرید انلاین چیپ تیکت بزنید.@@مشکل برطرف شد.@@مشکل هنوز پا برجاست یا برطرف شد؟@@لطفا اطلاعات زیر را ارسال نمایید:----مبلغ--تاریخ و ساعت--شماره کارت--شماره پیگیری----توجه داشته باشید برای پیگیری خرید ۷۲ ساعت زمان نیاز است.@@لطفا مشکلتون رو تا رسیدن به نتیجه نهایی نبندید و لطفا مشکل رو کامل شرح بدید.@@حواله شبا واریز شده و مقداری زمان می بره تا به حساب شما برسه. جای هیچ نگرانی نیست.".split(
    "@@"
  );
const countryOptions = [];
supportDepartments.map(function (bank, i) {
  countryOptions.push({ key: i, value: bank, text: bank });
});
const carOptions = [];
canRes.map(function (can, i) {
  carOptions.push({ key: i, value: can, text: can });
});

const validationSchema = Yup.object({
  message: Yup.string().required("لطفا این فیلد را وارد کنید."),
});
const onSubmit = async (values, submitMethods, navigate, prop) => {
  try {
    const res = await cashierService(values, "submitTicket", "");
    if (res.status == 200) {
      prop.setData(res.data.userTickets);
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
    status: prop.status ? prop.status : "open",
  };
  const [refresh, setRefresh] = useState(false);
  const [depMode, setDepMode] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e, { name, value }) => {
    $('[name="message"]:visible').val(value);
  };
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
                        right: 60,
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
                color="red"
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
            </Form>
          );
        }}
      </Formik>
    );
  }
};

export default depositArea;
