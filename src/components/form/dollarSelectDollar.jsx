import React from "react";

import { doCurrency } from "../../const";
import { Button, Icon, Divider,Label } from "semantic-ui-react";
var amounts = [
    { value: 50 },
    { value: 100 },
    { value: 150 },
    { value: 200 },
    { value: 250 },
    { value: 300 },
    { value: 500 },
    { value: 1000 },
  ];


const depositArea = (prop) => {


  const loginToken = prop.loginToken;
  const formik = prop.formik;

 
  return (
    <>
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
                  if(loginToken.balance2 >= amo.value || i < 4){
                      return (
                    <Button
                      icon
                      labelPosition="left"
                      type="button"
                      key={amo.value}
                      active={
                        formik.values.amount == amo.value ? true : false
                      }
                      color={
                        formik.values.amount == amo.value ? "red" : "grey"
                      }
                      onClick={() => {
                        formik.setFieldValue("amountDollar", amo.value);
                        formik.setFieldValue("amount", amo.value);
                        
                      }}
                      disabled={
                        loginToken.balance2 < amo.value  ? true : false
                      }
                    >
                     <Icon className="usdbtn farsi"><small style={{fontSize:10,fontWeight:200,opacity:.5}}>دلار</small></Icon> <> </>
                      {doCurrency(amo.value)}
                    </Button>
                  );
                  }
                
                })}
              </Button.Group><Divider/>
        
         
    </>
  );
};

export default depositArea;
