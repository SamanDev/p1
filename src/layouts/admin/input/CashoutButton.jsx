import React from "react";
import { Button, Divider } from "semantic-ui-react";
import $ from "jquery";

import Report from "../../../pages/dashboard/ReportCash";
import ReportPen from "../../../pages/dashboard/ReportPen";
import Moment from "react-moment";
const moment = require("moment");
var zones = "+03:30";
var nowzne = moment().format("MMDDHHmm");
var nowzne1 = "03220000";
var nowzne2 = "09220000";

if (nowzne > nowzne1 && nowzne < nowzne2) {
  zones = "+04:30";
}

function getchatTime(date) {
  var thisDate2 = date;
  var dateExpired = moment(thisDate2.replace("-08:00", ""));

  return dateExpired;
}
const toStart = (d) => {
  return d + " تا بارگشایی";
};
const CashoutButton = (prop) => {
  const loginToken = prop.loginToken;

  var startTime = getchatTime(loginToken.blockDateOut);
  //var startTime = getchatTime("2022-12-08T19:09:55+03:30");
  return (
    <>
      {prop.blnBlock ? (
        <>
          <Moment
            className="farsi-inline ui button orange fluid disabled"
            fromNow
            filter={toStart}
            style={{ marginTop: 20 }}
            onChange={(val) => {}}
          >
            {startTime}
          </Moment>
        </>
      ) : (
        <Button
          content={prop.val ? prop.val : "برداشت"}
          fluid
          style={{ marginTop: 10 }}
          className="farsi"
          type="submit"
          loading={prop.loading}
          disabled={prop.disabled || !loginToken.userActivate}
          hidden={prop.hidden}
          color={prop.color ? prop.color : "orange"}
          onClick={() => {
            $("#dep1").hide();
            $("#dep2").show();
          }}
        />
      )}

      {prop.mode && prop.mode != "ChangePass" && (
        <>
          {prop.mode && prop.list ? (
            <>
              <ul className="mm-listview">
                <li className="menutitle menutitleinside mm-listitem">
                  <span className="mm-listitem__text"></span>
                </li>
              </ul>

              <Report {...prop} />
            </>
          ) : (
            <div style={{ overflow: "hidden" }}>
              <div
                style={{
                  overflow: "hidden",
                  overflowY: "auto",
                  maxHeight: 300,
                  marginTop: 10,
                }}
              >
                <ReportPen
                  mode={prop.mode}
                  count="1"
                  pending={true}
                  {...prop}
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CashoutButton;
