import React, { useState, useEffect } from "react";
import { Divider, Segment } from "semantic-ui-react";
import ConvertCart from "../../utils/convertCart";
import { cashierService } from "../../services/cashier";
import { doCurrency } from "../../const";
const moment = require("moment");

const depositArea = (prop) => {
  var _tot = 0;
  const [user, setUser] = useState(false);
  const handleGetReports = async () => {
    try {
      var newValues = {
        orderId: prop.id,
        mode: "cashoutdetails",
      };
      const res = await cashierService(newValues, "cardService/cashout", "");
      if (res.status === 200) {
        setUser(res.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (
      prop.item &&
      prop.item?.destinationCardNumber &&
      prop.item?.remainedAmount == 0
    ) {
      setUser(prop.item);
    } else {
      handleGetReports();
    }
  }, []);
  if (!user) {
    return <>...</>;
  } else {
    var ste = user.checkoutList ? user.checkoutList : user.checkoutListSet;
    return (
      <Segment inverted size="mini">
        <div className="farsi text-secondary rightfloat">
          واریز به <br />
          <span
            className="text-gold"
            style={{ direction: "ltr", display: "inline-block" }}
          >
            <ConvertCart cartNo={user.destinationCardNumber} isLock={true} />
          </span>
        </div>
        <div className="text-gold fs-3 p-3">
          {(user.paidAmount * 100) / user.totalWithdrawalAmount}%
        </div>

        {ste.length > 0 && <Divider />}
        {ste
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((f, i) => {
            _tot = _tot + f.Amount;
            return (
              <div key={i.toString()}>
                <span className="text-gold  float-start">
                  {doCurrency(f.Amount)}
                </span>
                <span className="rightfloat">
                  <div className="date">
                    {moment(f.DateTime).format("YYYY/MM/DD")}{" "}
                    <span className="time">
                      {moment(f.DateTime).format("HH:mm")}
                    </span>
                  </div>
                </span>
                <br />
                <div className="farsi text-secondary rightfloat">
                  مجموع: <span className="text-gold">{doCurrency(_tot)}</span>
                </div>

                <ConvertCart cartNo={f.SourceCardNumber} isLock={true} />
                {ste.length > i + 1 && <Divider />}
              </div>
            );
          })}
      </Segment>
    );
  }
};

export default depositArea;
