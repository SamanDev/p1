import React, { useState } from "react";
import { Segment, Divider } from "semantic-ui-react";
import CopyText from "./copy";

var _content = "";
function CrCode(prop) {
  const [copy, setCopy] = useState(false);

  const copyDo = () => {
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  };
  const item = prop.note;

  if (item.coinValue) {
    var Coin = item.coin;

    var paydetails = JSON.parse(item.description);
    _content = (
      <>
        <Divider hidden />

        <Segment
          inverted
          size="mini"
          color="grey"
          className="farsi mymessage text-center"
        >
          شما باید مقدار{" "}
          <b className="text-gold">{item.coinValue + " " + Coin}</b> برابر با{" "}
          <b className="text-gold">
            {prop.doCurrency(paydetails.dollarAmount)} دلار
          </b>{" "}
          به آدرس زیر ارسال نمایید.
          <br />
          برای کپی کردن آدرس روی آن کلیک کنید.
        </Segment>
        <div>
          <CopyText color="purple" text={paydetails.address} />
        </div>
        <div>
          <CopyText color="violet" text={item.coinValue} alter={Coin} />
        </div>
        {item.gateway == "Bitcoin" && (
          <>
            <Divider horizontal inverted section className="farsi">
              یا
            </Divider>
            <Segment
              inverted
              size="mini"
              color="grey"
              className="farsi  text-center"
            >
              کد زیر را اسکن کنید.
            </Segment>
            <img
              src={paydetails.qrcode_url}
              style={{
                background: "gray",
                width: 150,
                height: "auto",
                display: "block",
                margin: "auto",
                marginBottom: 50,
              }}
            />
          </>
        )}
      </>
    );
  }
  return _content;
}

export default CrCode;
