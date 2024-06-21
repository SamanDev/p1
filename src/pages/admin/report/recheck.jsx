import React, { useState, useEffect } from "react";
import { Divider, Segment, Progress, Button, Icon } from "semantic-ui-react";
import ConvertCart from "../../../utils/convertCart";
import { getReportPenService } from "../../../services/report";
import { doCurrency } from "../../../const";

const moment = require("moment");

const depositArea = (prop) => {
  var _tot = 0;
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleGetReports = async () => {
    setLoading(true);
    try {
      const res = await getReportPenService(
        "checkCardDeposit?orderId=" + prop.id,
        false
      );
      if (res.status === 200) {
        if (res.data.id == prop.id) {
          setUser(true);
        } else {
          setUser("Canceled");
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    //handleGetReports();
  }, []);
  if (!user) {
    return (
      <>
        {" "}
        -{" "}
        <Button
          size="tiny"
          onClick={handleGetReports}
          disabled={loading}
          icon={loading}
        >
          {loading ? <Icon loading name="spinner" /> : <>reCheck</>}
        </Button>
      </>
    );
  } else {
    return (
      <>
        {" "}
        -{" "}
        <Button
          size="tiny"
          disabled
          icon={user == "Canceled" ? "close" : "check"}
          color={user == "Canceled" ? "red" : "green"}
        />
      </>
    );
  }
};

export default depositArea;
