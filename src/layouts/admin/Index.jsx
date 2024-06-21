import React from "react";

import Content from "../../pages/Content";
import Navbar from "./navbar/Index";
import PWAPrompt from "react-ios-pwa-prompt";

import { Image } from "semantic-ui-react";
const Index = (prop) => {
  return (
    <>
      {prop.loginToken?.accessToken && !prop.loginToken?.logout && (
        <PWAPrompt
          timesToShow={300}
          delay={1000}
          copyTitle={
            <>
              <Image
                src={"/maskable_icon_x192.png"}
                size="mini"
                verticalAlign="middle"
                floated="left"
                alt="اپلیکیشن گلکسی کازینو"
                title="اپلیکیشن گلکسی کازینو"
                style={{ marginBottom: 0 }}
              />
              <span className="farsi">نصب اپ گلکسی</span>
            </>
          }
          copyBody={
            <>
              <span>
                گلکسی دارای <span>اپلیکیشن</span> است. فقط با{" "}
                <span>دو کلیک</span> آن را به HomeScreen خود اضافه کنید تا به
                صورت <span>FullScreen</span> از آن استفاده کنید.
              </span>
            </>
          }
          copyClosePrompt="Close"
          permanentlyHideOnDismiss={false}
          copyShareButtonLabel={
            <span className="animated inline headShake infinite slower delay-2s">
              ابتدا دکمه آبی رنگ اشتراک گذاری را در نوار منو فشار دهید.
            </span>
          }
          copyAddHomeButtonLabel={
            <span className="animated inline headShake infinite slower delay-4s">
              سپس از منوی باز شده 'Add to Home Screen' را فشار دهید.
            </span>
          }
        />
      )}

      <div id="mypage">
        <Content {...prop} />
        <Navbar {...prop} />
      </div>
    </>
  );
};

export default Index;
