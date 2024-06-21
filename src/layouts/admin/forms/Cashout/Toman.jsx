import React, { useState } from "react";

import CashoutButton from "../../input/CashoutButton";
import FormikControl from "../../../../components/form/FormikControl";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../../../utils/alerts";
import { getCashAmount, doCurrency } from "../../../../const";
import { cashierService } from "../../../../services/cashier";
import { Button, Progress, Label,Icon } from "semantic-ui-react";
var amounts = [
  { value: 5 },
  { value: 10 },
  { value: 15 },
  { value: 20 },
  { value: 25 },
  { value: 30 },
  { value: 40 },
  { value: 50 },

];
var amountsPer = [
  { value: 25 },
  { value: 50 },
  { value: 75 },
  { value: 90 },
  { value: 100 },

];
const onSubmit = async (values, submitMethods, navigate, prop, setRefresh) => {
  try {
    const res = await cashierService(values, "bankTransfer", "");
    if (res.status == 200) {
      setRefresh(true);
      Alert("Done", "انجام شد.", "success");
    }

    submitMethods.setSubmitting(false);
  } catch (error) {
    submitMethods.setSubmitting(false);
    var _err = error.response.data;
    _err = _err.replace("balanceError", "موجودی کافی نیست.");
    Alert("متاسفم...!", _err, "error");
  }
};

const depositArea = (prop) => {
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const loginToken = prop.loginToken;
  const siteInfo = prop.siteInfo;
  const validationSchema = Yup.object({
    amount: Yup.number()
      .required("لطفا این فیلد را وارد کنید.")
      .min(
        siteInfo.cashoutLimit,
        "حداقل مبلغ " + doCurrency(siteInfo.cashoutLimit) + " تومان می باشد."
      )
      .max(loginToken.balance, "موجودی ناکافی است.")
      .integer(),
  });
  var defamount = getCashAmount(loginToken.balance);
  return (
    <Formik
      initialValues={{
        action: "cashout",
        amount: 0,
      
      }}
      onSubmit={(values, submitMethods) =>
        onSubmit(values, submitMethods, navigate, prop, setRefresh)
      }
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <Form>
             {formik.errors["amount"]  &&formik.touched["amount"] && (
                  <Label
                    className="farsi"
                    basic
                    color="red"
                    pointing="below"
                    size="mini"
                    
                  >
                    {formik.errors["amount"]}
                  </Label>
                )}
            <Button.Group vertical fluid size="mini" type="button">
            {amounts.map((amo,i) => {
                  if(loginToken.balance >= amo.value*100000 || i < 4){
                      return (
                    <Button
                      icon
                      labelPosition="left"
                      type="button"
                      key={amo.value}
                      active={
                        formik.values.amount == amo.value*100000 ? true : false
                      }
                      color={
                        formik.values.amount == amo.value*100000 ? "red" : "grey"
                      }
                      onClick={() => {
                        formik.setFieldValue("amount", amo.value*100000);
                      }}
                      disabled={
                        loginToken.balance < amo.value*100000  ? true : false
                      }
                    >
                     <Icon className="usdbtn farsi"><small style={{fontSize:8}}>تومان</small></Icon> <> </>
                      {doCurrency(amo.value*100000)}
                    </Button>
                  );
                  }
                
                })}
                {amountsPer.map((amo,i) => {
                  var newbal = parseInt(loginToken.balance/1000)*1000
                  if(newbal*amo.value/100 > 5000000){
                    
                      return (
                    <Button
                      icon
                      labelPosition="left"
                      type="button"
                      key={amo.value}
                      active={
                        formik.values.amount == newbal*amo.value/100 ? true : false
                      }
                      color={
                        formik.values.amount == newbal*amo.value/100 ? "red" : "grey"
                      }
                      onClick={() => {
                        formik.setFieldValue("amount", newbal*amo.value/100);
                      }}
                  
                    >
                     <Icon className="usdbtn farsi"><small style={{fontSize:8}}>تومان</small></Icon> <> </>
                      {doCurrency(parseInt(newbal*amo.value/100))}  - ({amo.value}%)
                    </Button>
                  );
                  }
                
                })}
              </Button.Group>
      
          

            <CashoutButton
              {...prop}
              disabled={formik.isSubmitting}
              loading={formik.isSubmitting}
              refresh={refresh}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default depositArea;
