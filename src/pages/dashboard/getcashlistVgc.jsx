import React, { useState, useEffect } from "react";
import { Divider, Segment, Progress } from "semantic-ui-react";
import ConvertCart from "../../utils/convertCart";
import { cashierService } from "../../services/cashier";
import { doCurrency } from "../../const";
const moment = require("moment");

const depositArea = (prop) => {
  var _tot = 0;
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (prop.item) {
      setUser(prop.item);
    } else {
    }
  }, []);
  if (!user) {
    return <>...</>;
  } else {
    var ste = user.split("cardNumber='");
    return (
      <Segment inverted size="mini">
        <div className="farsi text-secondary rightfloat">
          واریز به <br />
        </div>
        <div className="p-3">
          <span
            className="text-gold"
            style={{ direction: "ltr", display: "inline-block" }}
          >
            <ConvertCart cartNo={ste[1].split("'")[0]} isLock={true} />
          </span>

          <br />
          {user.split("shebaNumber='")[1].split("'")[0]}
        </div>
      </Segment>
    );
  }
};

export default depositArea;
