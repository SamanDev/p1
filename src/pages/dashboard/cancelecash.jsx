import React, { useState, useEffect } from "react";
import { Divider, Segment, Button } from "semantic-ui-react";
import ConvertCart from "../../utils/convertCart";
import { cashierService } from "../../services/cashier";
import { doCurrency } from "../../const";
const moment = require("moment");

const depositArea = (prop) => {
  var _tot = 0;
  const [user, setUser] = useState(false);
  const handleGetReports = async () => {
    setUser(true);
    try {
      var newValues = {
        orderId: prop.id,
      };
      const res = await cashierService(newValues, "cancelCashout", "");
      if (res.status === 200) {
        setUser(res.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (
      prop.item &&
      prop.item?.destinationCardNumber &&
      prop.item?.paidAmount == prop.item?.totalWithdrawalAmount
    ) {
      setUser(prop.item);
    } else {
      //shandleGetReports();
    }
  }, []);
  return (
    <>
      <Button
        size="tiny"
        color="red"
        disabled={user?true:false}
        loading={user?true:false}
        fluid
        basic
        style={{ marginTop: 20 }}
        onClick={handleGetReports}
      >
        Cancele Cashout
      </Button>
    </>
  );
};

export default depositArea;
