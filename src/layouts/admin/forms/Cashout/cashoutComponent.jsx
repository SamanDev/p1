import React, { useState } from "react";
import PerfectMoney from "./PerfectMoney";
import PerfectMoney2 from "./usd/PerfectMoney";
import Transfer from "./Transfer";
import Transfer2 from "./usd/Transfer";
import USDT from "./USDT";
import USDT2 from "./usd/USDT";
import Toman from "./Toman";
import BTC from "./BTC";
import BTC2 from "./usd/BTC";
import Ticket from "./Ticket";
import AddCart from "./AddCart";
import Invite from "./Invite";
import ChangePass from "./ChangePass";
import { Statistic, Segment } from "semantic-ui-react";
import AddCartMsg from "../Deposit/addCartMsg";
import ActivetMsg from "../Deposit/activetMsg";
import Report from "./Report";
import Moment from "react-moment";
import { doCurrency } from "../../../../const";
const moment = require("moment");

const depositArea = (prop) => {
  const depMode = prop.gateway;

  const loginToken = prop.loginToken;
  var _now = moment();
  var _block = moment(loginToken.blockDateOut.replace("-08:00", ""));
  //var _block = moment("2022-12-08T19:09:55+03:30");
  //console.log(_now);
  var blnBlock = false;
  if (_now.diff(_block, "seconds") < 0) {
    blnBlock = true;
  }

  return (
    <>
      {!loginToken?.userActivate ? (
        <>
          <ActivetMsg {...prop} />
        </>
      ) : (
        <>
          {prop.cashMode !== "addCart" &&
            prop.cashMode !== "Invite" &&
            prop.cashMode !== "Ticket" &&
            prop.cashMode !== "ChangePass" && (
              <Segment inverted className="blnc">
                <Statistic inverted size="tiny">
                  <Statistic.Value>
                    {prop.menu?.usd ? (
                      <>
                        <span className="text-gold">$</span>{" "}
                       
                        {doCurrency((loginToken?.balance2).toFixed(2))}
                      </>
                    ) : (
                      doCurrency(loginToken?.balance)
                    )}
                  </Statistic.Value>
                  <Statistic.Label className="farsi">
                    موجودی {prop.menu?.usd && "دلاری"} شما
                  </Statistic.Label>
                </Statistic>
              </Segment>
            )}
          {prop.cashMode === "Report" && (
            <Report size="mini" labelcolor="orange" list={true} {...prop} />
          )}
          {prop.cashMode === "Ticket" && (
            <Ticket size="mini" labelcolor="orange" list={true} {...prop} />
          )}
          {prop.cashMode === "Invite" && (
            <Invite size="mini" labelcolor="orange" list={true} {...prop} />
          )}
          {prop.cashMode === "addCart" && (
            <AddCart size="mini" labelcolor="orange" list={true} {...prop} />
          )}

          {prop.cashMode === "ChangePass" && (
            <ChangePass
              size="mini"
              labelcolor="orange"
              list={false}
              {...prop}
            />
          )}

          {prop.mode === "transfer" && (
            <>
              {prop.menu?.usd ? (
                <Transfer2 {...prop} gateway="transfer" blnBlock={blnBlock} />
              ) : (
                <Transfer {...prop} gateway="transfer" blnBlock={blnBlock} />
              )}
            </>
          )}

          {depMode == "USDT" && (
            <>
              {prop.menu?.usd ? (
                <USDT2 {...prop} blnBlock={blnBlock} />
              ) : (
                <USDT {...prop} blnBlock={blnBlock} />
              )}
            </>
          )}
          {depMode == "BTC" && (
            <>
              {prop.menu?.usd ? (
                <BTC2 {...prop} blnBlock={blnBlock} />
              ) : (
                <BTC {...prop} blnBlock={blnBlock} />
              )}
            </>
          )}
          {depMode == "Toman" && (
            <>
              {loginToken?.bankInfos.length > 0 ? (
                <>
                  <Toman {...prop} blnBlock={blnBlock} />
                </>
              ) : (
                <>
                  <AddCartMsg {...prop} />
                </>
              )}
            </>
          )}
          {depMode == "PerfectMoney" && (
            <>
              {prop.menu?.usd ? (
                <PerfectMoney2 {...prop} blnBlock={blnBlock} />
              ) : (
                <PerfectMoney {...prop} blnBlock={blnBlock} />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default depositArea;
