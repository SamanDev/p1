import React from "react";
import { Icon, Button, Divider } from "semantic-ui-react";
const Balance = (prop) => {
  const siteInfo = prop?.siteInfo;

  return (
    <div className="farsi text-center mymessage ui small">
      <Divider inverted />
      <Button
        color="blue"
        className="farsi"
        size="mini"
        as="a"
        href={"https://t.me/" + siteInfo?.telegramSupport}
        target="_blank"
        style={{ marginBottom: 10 }}
      >
        <Icon
          name="telegram"
          size="large"
          style={{ margin: "0 -0.42857143em 0 0.21428571em" }}
        />{" "}
        پشتیبانی تلگرام
      </Button>
      <br />
      <Button
        color="blue"
        className="farsi"
        size="mini"
        as="a"
        href={"https://t.me/" + siteInfo?.telegramChanel}
        target="_blank"
      >
        <Icon
          name="telegram"
          size="large"
          style={{ margin: "0 -0.42857143em 0 0.21428571em" }}
        />{" "}
        کانال تلگرام
      </Button>
      <Button
        color="purple"
        className="farsi"
        size="mini"
        as="a"
        href={"https://instagram.com/" + siteInfo?.instagram}
        target="_blank"
      >
        <Icon
          name="instagram"
          size="large"
          style={{ margin: "0 -0.42857143em 0 0.21428571em" }}
        />{" "}
        اینستاگرام
      </Button>
    </div>
  );
};

export default Balance;
