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
  { value: 1500 },
  { value: 2000 },
  { value: 5000 },
  { value: 10000 },

];


const depositArea = (prop) => {


  const loginToken = prop.loginToken;
  const formik = prop.formik;
  const getRate = prop.getRate;
 
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
                  if(loginToken.balance >= amo.value * getRate || i < 4){
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
                          formik.setFieldValue("amount", amo.value * getRate);
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
                  }
                
                })}
              </Button.Group>
              <Divider/>
         
    </>
  );
};

export default depositArea;
