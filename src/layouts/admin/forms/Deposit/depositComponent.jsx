import React, { useState } from "react";
import VisaGiftCode from "./VisaGiftCode";
import CartToCart from "./CartToCartnew";
import CartToCartOnline from "./CartToCartnew";

import BankTransfer from "./BankTransfer";
import PerfectMoney from "./PerfectMoney";
import PerfectMoney2 from "./usd/PerfectMoney";
import TomantoUsd from "./usd/TomantoUsd";

import USDT from "./USDT";
import USDT2 from "./usd/USDT";

import BTC from "./BTC";
import BTC2 from "./usd/BTC";

import AddCartMsg from "./addCartMsg";
import ActivetMsg from "./activetMsg";
import { Statistic, Segment } from "semantic-ui-react";

import { doCurrency } from "../../../../const";
const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(prop.gateway);
  const loginToken = prop.loginToken;
  return (
    <>
      {!loginToken?.userActivate ? (
        <>
          <ActivetMsg {...prop} />
        </>
      ) : (
        <>
          <Segment inverted className="blnc" size="mini">
            <Statistic inverted size="mini">
              <Statistic.Value>
                {prop.menu?.usd ? (
                  <>
                    <span className="text-gold">$</span>{" "}
                    {doCurrency(loginToken?.balance2)}
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
          {depMode == "Bank Transfer" && (
            <>
              {loginToken?.bankInfos.length > 0 ? (
                <>
                  <BankTransfer {...prop} />
                </>
              ) : (
                <>
                  <AddCartMsg {...prop} />
                </>
              )}
            </>
          )}
          {depMode == "Online Cart to Cart" && (
            <>
              {loginToken?.bankInfos.length > -10 ? (
                <>
                  <CartToCartOnline {...prop} />
                </>
              ) : (
                <>
                  <AddCartMsg {...prop} />
                </>
              )}
            </>
          )}
          {depMode === "Transfer" && (
            <>
              {prop.menu?.usd ? (
                <>
                  <Segment inverted className="blnc" size="mini">
                    <Statistic inverted size="mini">
                      <Statistic.Value>
                        {doCurrency(loginToken?.balance)}
                      </Statistic.Value>
                      <Statistic.Label className="farsi">
                        موجودی شما
                      </Statistic.Label>
                    </Statistic>
                  </Segment>
                  <TomantoUsd {...prop} gateway="exChange" mode="transfer" />
                </>
              ) : (
                <CartToCart {...prop} />
              )}
            </>
          )}
          {depMode == "Cart to Cart" && (
            <>
              <>
                {prop.menu?.usd ? (
                  <>
                    <Segment inverted className="blnc" size="mini">
                      <Statistic inverted size="mini">
                        <Statistic.Value>
                          {doCurrency(loginToken?.balance)}
                        </Statistic.Value>
                        <Statistic.Label className="farsi">
                          موجودی شما
                        </Statistic.Label>
                      </Statistic>
                    </Segment>
                    <TomantoUsd {...prop} />
                  </>
                ) : (
                  <CartToCart {...prop} />
                )}
              </>
            </>
          )}

          {depMode == "USDT" && (
            <>{prop.menu?.usd ? <USDT2 {...prop} /> : <USDT {...prop} />}</>
          )}
          {depMode == "BTC" && (
            <>{prop.menu?.usd ? <BTC2 {...prop} /> : <BTC {...prop} />}</>
          )}
          {depMode == "VisaGiftCode" && <VisaGiftCode {...prop} />}

          {depMode == "PerfectMoney" && (
            <>
              {prop.menu?.usd ? (
                <PerfectMoney2 {...prop} />
              ) : (
                <PerfectMoney {...prop} />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default depositArea;
