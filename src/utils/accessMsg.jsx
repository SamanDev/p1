import React from "react";
import { Icon, Button, Header, Divider } from "semantic-ui-react";
import $ from "jquery";
import AnimIcon from "./inviteIcon";
const accessArea = (prop) => {
  const siteInfo = prop?.siteInfo;
  return (
    <>
      <span className="myaccount popupmenu">
        <div style={{ height: 120, position: "relative" }}>
          <div
            className="fadeout"
            style={{
              position: "absolute",
              zIndex: 0,
              top: -30,
              width: "100%",
              textAlign: "center",
            }}
          >
            <AnimIcon
              icon="cvpqeffe"
              width="200px"
              height="200px"
              trigger="loop"
              colors="primary:#545454,secondary:#916f10"
            />
          </div>
        </div>
        {prop?.title && (
          <>
            <Header
              as="h4"
              inverted
              className="farsi"
              style={{ marginTop: 10 }}
            >
              {prop.title}
            </Header>

            <Divider inverted section />
          </>
        )}
        <div className="farsi text-center mymessage ui small">
          <br />
          <br />
          برای دسترسی به این قسمت باید وارد سیستم شوید.
          <br />
          <br />
          <Button
            color="orange"
            size="small"
            className="farsi"
            onClick={() => $("#openLogin").trigger("click")}
          >
            ورود
          </Button>{" "}
          <Button
            basic
            color="yellow"
            size="small"
            className="farsi"
            onClick={() => $("#openRegister").trigger("click")}
          >
            ثبت نام
          </Button>
          <div
            className="fadeoutend"
            style={{ height: 100, position: "relative" }}
          >
            <div style={{ position: "absolute", zIndex: 0, top: 10 }}>
              <AnimIcon
                icon="dxjqoygy"
                width="300px"
                height="140px"
                trigger="loop"
              />
            </div>
          </div>
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
      </span>
    </>
  );
};

export default accessArea;
