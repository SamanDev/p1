import React, { useState } from "react";
import { Label, Input, Button, Icon, Divider } from "semantic-ui-react";
import AnimIcon from "../../utils/inviteIcon";
import { CopyToClipboard } from "react-copy-to-clipboard";
import MyMsg from "../../utils/MsgDesc";

const depositArea = (prop) => {
  const [copy, setCopy] = useState(false);
  const siteInfo = prop.siteInfo;
  const loginToken = prop.loginToken;
  var link = siteInfo.referUrl + "ref/" + loginToken.username;
  const copyDo = () => {
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  };

  return (
    <span className="myaccount popupmenu">
      <Divider inverted section horizontal className="farsi">
        یا
      </Divider>
      <div style={{ height: 120, position: "relative" }}>
        <div
          className="fadeout"
          style={{ position: "absolute", zIndex: 0, top: -15 }}
        >
          <AnimIcon
            icon="uqpazftn"
            width="300px"
            height="200px"
            trigger="loop"
          />
        </div>
      </div>
      <MyMsg
        color="red"
        size="mini"
        text={
          <>
            <h5 className="farsi lh-lg">دعوت دوستان با لینک اختصاصی</h5>برای
            معرفی دوستان خود کافیست لینک زیر را برای ایشان ارسال نمایید.
          </>
        }
      />
      <Input
        size="mini"
        readOnly
        fluid
        label={
          <Label size="tiny" pointing="right" color="red" className="farsi">
            لینک شما
          </Label>
        }
        labelPosition="left"
        defaultValue={link}
      />

      <CopyToClipboard text={link} onCopy={() => copyDo()}>
        <Button
          icon
          labelPosition="left"
          size="small"
          color={copy ? "green" : "red"}
          fluid
          style={{ margin: "10px 0" }}
          className="farsi"
        >
          {!copy ? (
            <>
              <Icon name="copy outline" />
              کپی کردن لینک
            </>
          ) : (
            <>
              <Icon name="check" /> کپی شد
            </>
          )}
        </Button>
      </CopyToClipboard>
    </span>
  );
};
export default depositArea;
