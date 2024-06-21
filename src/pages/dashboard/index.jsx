import React from "react";
import { Button, Header, Icon, Segment, Image, Grid } from "semantic-ui-react";
import $ from "jquery";
import AnimIcon from "../../utils/inviteIcon";
import GameInbox from "./GameInbox";
import RewardStat from "./banners";
import SiteStat from "./sitestats";
function SegmentExamplePlaceholderInline(prop) {
  const siteInfo = prop?.siteInfo;
  return (
    <>
      <div className="container-md">
        <div style={{ height: 10, position: "relative" }}>
          <div
            style={{
              position: "absolute",
              zIndex: 0,
              top: -130,
              width: "100%",
              textAlign: "center",
              opacity: 0.8,
              filter: " drop-shadow(1px 1px 5px #ffffff)",
            }}
          >
            <AnimIcon
              icon="ilpmnyul"
              width="350px"
              height="500px"
              trigger="hover"
              stroke="4"
              colors="primary:#ffffff,secondary:#343c42"
            />
          </div>
        </div>
        <div className="text-center" style={{ overflow: "hidden" }}>
          <Header icon>
            <Icon>
              <Image
                src="/assets/images/logo.png"
                centered
                alt="گلکسی کازینو"
                style={{
                  width: "30vw",
                  maxWidth: "200px",
                  marginTop: 80,

                  filter:
                    " drop-shadow(1px 1px 30px #ffffff) drop-shadow(1px 1px 2px rgb(0 0 0 / 1)) drop-shadow(1px 1px 3px rgb(0 0 0 / 1)) drop-shadow(1px 1px 10px rgb(0 0 0 / 6))",
                }}
              />
            </Icon>
            <h1 className="text-center opacity-50">
              <strong
                className="farsi fw-bold fs-5"
                style={{
                  position: "relative",
                  top: -50,
                  color: "rgba(255,255,255,1)",
                  filter:
                    "drop-shadow(1px 1px 2px rgb(0 0 0 / 1)) drop-shadow(1px 1px 5px rgb(0 0 0 / 1))",
                }}
              >
                گلکسی کازینو
              </strong>
            </h1>
          </Header>
        </div>

        <GameInbox {...prop} />
      </div>
      <RewardStat {...prop} />
      <div className="container-md">
        <div
          className="fadeoutend"
          style={{ height: 120, position: "relative" }}
        >
          <div style={{ position: "absolute", zIndex: 0, top: 10 }}>
            <AnimIcon
              icon="hciqteio"
              width="300px"
              height="140px"
              trigger="loop"
            />
          </div>
        </div>
        <Segment inverted padded="very" className="fadeoutend">
          <Grid reversed="computer tablet">
            <Grid.Column mobile={16} tablet={10} computer={10}>
       
              <div className="farsi">
                <h2 className="farsi">بازی پوکر آنلاین با پول واقعی</h2>
                <p className="lh-base">
                  سلام، به سایت گلکسی کازینو خوش آمدید. در اینجا، شما می توانید
                  بازی های پوکر آنلاین را با بازیکنانی از سراسر جهان تجربه کنید.
                  با امکانات پیشرفته و رابط کاربری ساده، شما می توانید به راحتی
                  بازی کنید و تجربه یک بازی پوکر واقعی را داشته باشید.
                </p>
                <p className="lh-base">
                  در گلکسی کازینو، شما می توانید به انواع بازی های پوکر از جمله
                  تگزاس هولدم، اوماها، سوپر ستود و... دسترسی پیدا کنید. همچنین،
                  با شرکت در مسابقات و رقابت های مختلف، می توانید به عنوان یک
                  بازیکن حرفه ای در پوکر به شهرت و پول برسید.
                </p>
                <p className="lh-base">
                  در گلکسی کازینو، امنیت شما برای ما بسیار مهم است و به همین
                  دلیل، با استفاده از فناوری های پیشرفته از جمله رمزنگاری،
                  اطلاعات شما را محافظت می کنیم. بنابراین، با اطمینان کامل می
                  توانید بازی کنید و لذت ببرید.
                </p>
              </div>
              <br />
              <Segment.Inline className="text-end">
                <Button
                  basic
                  color="yellow"
                  size="large"
                  className="farsi"
                  onClick={() => $("#openRegister").trigger("click")}
                >
                  ثبت نام در گلکسی کازینو
                </Button>
              </Segment.Inline>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={6} computer={6}>
              <Image
                src="/assets/images/pkr.webp"
                width="100"
                height="100"
                alt="بازی پوکر آنلاین با پول واقعی"
                fluid
                rounded
              />
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment
          inverted
          className="fadeoust"
          style={{
            background: "rgba(0,0,0,.2)",

            overflow: "hidden",
            padding: "55px 0",
          }}
        >
          <SiteStat {...prop} />
        </Segment>
        <Segment inverted padded="very" className="fadeoutend">
          <Grid>
            <Grid.Column mobile={16} tablet={10} computer={10}>
              <div className="farsi">
                <h3 className="farsi">
                  شارژ حساب و برداشت آسان در گلکسی کازینو{" "}
                </h3>
                <p className="lh-base">
                  برای شارژ حساب و کشوت (برداشت) در سایت گلکسی کازینو می توانید
                  از طریق درگاه بانکی اقدام کنید و یا از سایت های ایرانی خرید و
                  فروش اتوماتیک ووچر پرفکت مانی ، اقدام به خرید ووچر کرده و کد
                  ووچرتان را در صفحه دیپازیت سایت وارد کنید تا بلافاصله اکانتتان
                  معادل رقم آن ووچر شارژ گردد. علاوه بر آن می توانید از بیت کوین
                  برای بازی پوکر آنلاین استفاده کنید.
                </p>
                <p className="lh-base">
                  در هنگام کشوت از گلکسی کازینو هم بسته به گزینه انتخابی تان یا
                  به صورت واریز شتاب به کارت بانکی تان پرداخت صورت می گیرد و یا
                  معادل رقم درخواستی جهت برداشت یک ووچر در صفحه تراکنش تان به
                  شما داده می شود.
                </p>
              </div>
              <br />
              <Segment.Inline className="text-end">
                <Button
                  basic
                  color="yellow"
                  size="large"
                  className="farsi"
                  onClick={() => $("#openRegister").trigger("click")}
                >
                  ثبت نام در گلکسی کازینو
                </Button>
              </Segment.Inline>{" "}
              <br /> <br />
            </Grid.Column>
            <Grid.Column tablet={6} computer={6} only="tablet computer">
              <Image
                src="/assets/images/cash.webp"
                width="70"
                height="56"
                alt="شارژ حساب و برداشت آسان در گلکسی کازینو"
                fluid
              />
            </Grid.Column>
          </Grid>
        </Segment>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />{" "}
        <Segment
          inverted
          className="fadeoust"
          style={{
            background: "rgba(0,0,0,.2)",

            overflow: "hidden",

            lineHeight: "30px",
          }}
        >
          &copy; 2014
          <Button.Group floated="right" size="mini" inverted>
            <Button
              basic
              inverted
              as="a"
              icon="telegram"
              aria-label="telegram"
              href={"https://t.me/" + siteInfo?.telegramChanel}
              target="_blank"
            />
            <Button
              basic
              inverted
              icon="instagram"
              aria-label="instagram"
              as="a"
              href={"https://instagram.com/" + siteInfo?.instagram}
              target="_blank"
            />
          </Button.Group>
        </Segment>
      </div>
    </>
  );
}

export default SegmentExamplePlaceholderInline;
