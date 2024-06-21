import React, { useState, useEffect } from "react";
import { Divider, Icon, Button,Label } from "semantic-ui-react";
import DepositButton from "../../../input/DepositButton";
import FormikControl from "../../../../../components/form/FormikControl";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../../../../utils/alerts";
import { MyToastDone } from "../../../../../utils/myAlert";
import { doCurrency } from "../../../../../const";
import { cashierServiceGame } from "../../../../../services/cashier";
import { rateService } from "../../../../../services/cashier";
import MenuLoader from "../../../../../utils/menuLoader";
var amounts = [
  { value: 5 },
  { value: 10 },
  { value: 25 },
  { value: 50 },
  { value: 100 },
];
const validationSchema = Yup.object({
  amountDollar: Yup.number()
    .required("لطفا این فیلد را وارد کنید.")
    .min(5, "لطفا این فیلد را درست وارد کنید.")
    .max(100, "لطفا این فیلد را درست وارد کنید.")
    .integer(),
  password: Yup.string()
    .required("کلمه عبور حداقل باشد 8 کاراکتر باشد.")
    .min(8, "کلمه عبور حداقل باشد 8 کاراکتر باشد."),
});

const onSubmit = async (values, submitMethods, getRate) => {
  try {
    var newValues = values;

    newValues.amount = values.amountDollar * getRate;
    const res = await cashierServiceGame(newValues, "exChanger");
    if (res.status == 200 && !res.data?.message) {
      MyToastDone("انجام شد", "success");
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
  const [depMode, setDepMode] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const getRate = localStorage.getItem("getRate");
  const loginToken = prop.loginToken;
  const [rate, setRate] = useState(getRate || 0);

  useEffect(() => {
    const handleGetRate = async () => {
      try {
        const res = await rateService();
        if (res.status === 200) {
          localStorage.setItem("getRate", res.data);
          setRate(res.data);
        }
      } catch (error) {
        //console.log(error.message);
      }
    };
    handleGetRate();
  }, []);
  if (rate == 0) {
    return <MenuLoader />;
  }
  if (loginToken) {
    return (
      <Formik
        initialValues={{
          amountDollar: 0,
          username: loginToken.username,
          password: "",
        }}
        onSubmit={(values, submitMethods) =>
          onSubmit(values, submitMethods, getRate, prop)
        }
        validationSchema={validationSchema}
      >
        {(formik) => {
          return (
            <Form>
               {formik.errors["amountDollar"]  &&formik.touched["amountDollar"] && (
                  <Label
                    className="farsi"
                    basic
                    color="red"
                    pointing="below"
                    size="mini"
                    
                  >
                    {formik.errors["amountDollar"]}
                  </Label>
                )}
              <Button.Group vertical fluid size="mini" type="button">
                {amounts.map((amo) => {
                  return (
                    <Button
                      icon
                      labelPosition="left"
                      type="button"
                      key={amo.value}
                      active={
                        formik.values.amountDollar == amo.value ? true : false
                      }
                      color={
                        formik.values.amountDollar == amo.value ? "red" : "grey"
                      }
                      onClick={() => {
                        formik.setFieldValue("amountDollar", amo.value);
                      }}
                      disabled={
                        loginToken.balance < amo.value * getRate ? true : false
                      }
                    >
                   
                        <Icon className="usdbtn"><small style={{fontSize:10,fontFamily:'verdana',fontWeight:200,opacity:.8}}>$</small><small style={{fontSize:10,fontFamily:'verdana',fontWeight:200}}>{amo.value}</small></Icon> <> </>
                        {doCurrency(amo.value * getRate)}
                    </Button>
                  );
                })}
              </Button.Group>
              <Divider/>
           
              <FormikControl
                formik={formik}
                control="input"
                type="password"
                name="password"
                label=" کلمه عبور"
                labelcolor="red"
                size={prop.size}
                autoComplete="password"
              
              />
              <Divider inverted />

              <DepositButton
                {...prop}
                val="تبدیل"
                type="submit"
                disabled={
                  formik.isSubmitting 
                }
                loading={formik.isSubmitting}
              />
            </Form>
          );
        }}
      </Formik>
    );
  } else {
    return null;
  }
};

export default depositArea;
