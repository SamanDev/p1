import React, { useEffect, useState } from "react";

import { Grid, Button } from "semantic-ui-react";
import { getEvent, dayOfTournament } from "../../const";
import GalaxyIcon from "../../utils/svganim";
import ConfettiArea from "../../utils/party";
import ConfettiClick from "../../utils/partyclick";

import ShowTimeLeft from "../../utils/showTimeLeft";

const moment = require("moment");

const mainnconfig = {
  angle: "229",
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: "20000",
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "743px",
  colors: ["#000", "#333", "#666"],
};

var nowDay = moment().isoWeekday();
var _day = moment().day(dayOfTournament);
var tourDay = moment(_day).date();
const Banner = (prop) => {
  return (
    <div className="banner">
      <Grid reversed="computer tablet">
        <Grid.Row>
          <Grid.Column
            mobile={16}
            tablet={16}
            computer={8}
            className="myaccount"
          >
            <div className="inline animated delay-1s fadeInLeft">
              <div className={"inline animated delay-2s " + prop.iconamin}>
                <GalaxyIcon
                  mode={prop.icon}
                  level={prop.number}
                  text="big"
                  className="bannericon"
                  classinside="iconinside2"
                  number={prop.number}
                  amin={"inline animated " + prop.amin}
                  width="10vw"
                  iconamin={"inline animated delay-2s " + prop.iconamin}
                />
              </div>
            </div>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={8} textAlign="right">
            <div className="inline animated fadeInRight backInLeft delay-nims fast">
              <div className="inline animated flash delay-3s">
                {prop.showtime && prop.showtime}
                <h1 className="farsi">{prop.title}</h1>
              </div>
            </div>
            <div className="farsi text  animated fadeInRight fast delay-1s">
              {prop.text}
            </div>

            {prop.link && (
              <div className="animated delay-1s fadeInDown">
                <Button
                  className="farsi"
                  color="red"
                  style={{ background: "rgba(255,0,0,.3)" }}
                  onClick={() => {
                    prop.openPanel(prop.link);
                  }}
                >
                  اطلاعات بیشتر
                </Button>
              </div>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

var _width = document.body.clientWidth;
var defslide = 1;

const Dashboard = (prop) => {
  String.prototype.toPersianCharacter = function () {
    var string = this;

    var obj = {
      "١": "۱",
      "٢": "۲",
      "٣": "۳",
      "٤": "۴",
      "٥": "۵",
      "٦": "۶",
      "٧": "۷",
      "٨": "۸",
      "٩": "۹",
      "٠": "۰",
      "۱": "1",
      "۲": "2",
      "۳": "3",
      "۴": "4",
      "۵": "5",
      "۶": "6",
      "۷": "7",
      "۸": "8",
      "۹": "9",
      "۰": "0",
    };

    Object.keys(obj).forEach(function (key) {
      string = string.replaceAll(obj[key], key);
    });
    return string;
  };

  const loginToken = prop.loginToken;
  const siteInfo = prop.siteInfo;
  var _event = getEvent(siteInfo);
  siteInfo?.galaxyPassSet?.sort((a, b) => (a.id > b.id ? 1 : -1));
  var gpassrules = siteInfo?.galaxyPassSet[0];
  siteInfo?.vipTables?.sort((a, b) => (a.id > b.id ? 1 : -1));
  var viprules = siteInfo?.vipTables[0];
  siteInfo?.dailyLeagueSet?.sort((a, b) => (a.id > b.id ? 1 : -1));
  var leaguerules = siteInfo?.dailyLeagueSet[0];

  const getHour = (date, format) => {
    if (format) {
      var nowDay = moment(date.replace("-08:00", "")).format("HH:mm");
      return nowDay.toPersianCharacter();
    } else {
      var nowDay = moment(date.replace("-08:00", "")).format("HHmm");
      return nowDay;
    }
  };
  const getMil = (totalRewards) => {
    if (!totalRewards) return 0;
    var mil = totalRewards / 1000000;

    return mil.toString().toPersianCharacter();
  };
  const haveGift = () => {
    var user = loginToken;
    if (user?.accessToken && !user?.logout) {
      var _bonuses = user?.userGifts?.sort((a, b) =>
        a.startDate < b.startDate ? 1 : -1
      );

      var end = Date.now();
      try {
        var _pen = _bonuses.filter(
          (d) =>
            d.status == "Pending" &&
            d.mode.toLowerCase() == "gift" &&
            d.received == false &&
            Date.parse(d.expireDate) > end
        );
      } catch (error) {
        var _pen = [];
      }
    } else {
      var _pen = [];
    }
    return _pen;
  };

  const [activeSlide, setActiveSlide] = useState(defslide);
  const goPrev = () => {
    var _ddef = activeSlide - 1;
    if (_ddef < 0) {
      _ddef = 4;
    }
    setActiveSlide(_ddef);
  };
  const goNext = () => {
    var _ddef = activeSlide + 1;
    if (_ddef > 4) {
      _ddef = 0;
    }
    setActiveSlide(_ddef);
  };
  useEffect(() => {
    if (_event.toLowerCase() == "gpass") {
      defslide = 1;
    }
    if (_event.toLowerCase() == "vip") {
      defslide = 2;
    }
    if (_event.toLowerCase() == "league") {
      defslide = 3;
    }
    if (dayOfTournament == nowDay) {
      defslide = 0;
    }
    if (haveGift().length > 0) {
      defslide = 0;
    }

    setActiveSlide(defslide);
  }, [loginToken?.userGifts]);

  return (
    <>
      <div className=" main_section fadeoutend">
        <div
          id="carouselExampleControls"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          data-bs-pause="false"
        >
          <div className="carousel-inner">
            <div
              className={
                activeSlide == 0 ? "carousel-item active" : "carousel-item"
              }
              data-bs-interval="1000"
            >
              {haveGift().length > 0 ? (
                <>
                  <Banner
                    title="هدیه گلکسی"
                    text={
                      "ساعت " +
                      getHour(
                        haveGift()[0].startDate.replace("-08:00", ""),
                        true
                      )
                    }
                    icon="gifts"
                    amin="inline animated swing "
                    iconamin="swing"
                    link=".giftarea"
                    showtime={
                      <ShowTimeLeft
                        startDay={moment(
                          haveGift()[0].startDate.replace("-08:00", "")
                        ).format("D")}
                        startHour={getHour(
                          haveGift()[0].startDate.replace("-08:00", ""),
                          false
                        )}
                        endDay={moment(
                          haveGift()[0].expireDate.replace("-08:00", "")
                        ).format("D")}
                        endHour={getHour(
                          haveGift()[0].expireDate.replace("-08:00", ""),
                          false
                        )}
                      />
                    }
                    {...prop}
                  />

                  <ConfettiArea recycle={false} numberOfPieces="50" />
                </>
              ) : (
                <>
                  <div className="confettimain">
                    <ConfettiClick
                      active={
                        dayOfTournament == nowDay && activeSlide == 0
                          ? true
                          : false
                      }
                      config={mainnconfig}
                    />
                  </div>

                  <Banner
                    title="تورنومنت ۲۵+۲۵ "
                    text="هر جمعه ساعت ۲۲"
                    icon="tournament"
                    amin="inline animated swing "
                    iconamin="swing"
                    link=".tournament"
                    showtime2={
                      <ShowTimeLeft
                        startDay={tourDay}
                        startHour="2000"
                        endDay={tourDay}
                        endHour="2200"
                        className="hiddenmenu"
                      />
                    }
                    {...prop}
                  />
                  {dayOfTournament == nowDay && (
                    <ConfettiArea recycle={false} numberOfPieces="50" />
                  )}
                </>
              )}
            </div>

            <div
              className={
                activeSlide == 1 ? "carousel-item active" : "carousel-item"
              }
              data-bs-interval="1000"
            >
              <>
                <Banner
                  title={getMil(gpassrules?.totalRewards) + " میلیون تومان"}
                  text="پاداش گلکسی پَس"
                  link=".gpass"
                  icon="gpass"
                  amin="animated delay-1s charkhesh"
                  iconamin="pulse"
                  number="15"
                  showtime={
                    <ShowTimeLeft
                      startDay={gpassrules?.startDay}
                      endDay={gpassrules?.endDay}
                      startHour="0000"
                      endHour="2359"
                    />
                  }
                  {...prop}
                />
              </>

              {_event.toLowerCase() == "gpass" && activeSlide == 1 && (
                <ConfettiArea recycle={false} numberOfPieces="50" />
              )}
            </div>

            <div
              className={
                activeSlide == 2 ? "carousel-item active" : "carousel-item"
              }
              data-bs-interval="1000"
            >
              <>
                <Banner
                  title={getMil(viprules?.totalRewards) + " میلیون تومان"}
                  text={"پاداش میز VIP"}
                  link=".vip"
                  icon="vip"
                  amin="inline animated fast flipInY"
                  iconamin="pulse"
                  number=" "
                  showtime={
                    <ShowTimeLeft
                      startDay={viprules?.startDay}
                      endDay={viprules?.endDay}
                      startHour="0000"
                      endHour="2359"
                    />
                  }
                  {...prop}
                />
                {_event.toLowerCase() == "vip" && activeSlide == 2 && (
                  <ConfettiArea recycle={false} numberOfPieces="50" />
                )}
              </>
            </div>

            <div
              className={
                activeSlide == 3 ? "carousel-item active" : "carousel-item"
              }
              data-bs-interval="1000"
            >
              <>
                <Banner
                  title={getMil(leaguerules?.totalRewards) + " میلیون تومان"}
                  text="برای لیگ روزانه"
                  link=".league"
                  icon="league"
                  level="big"
                  number="1"
                  amin="inline animated swing "
                  iconamin="swing"
                  showtime={
                    <ShowTimeLeft
                      startDay={leaguerules?.startDay}
                      endDay={leaguerules?.endDay}
                      startHour="0000"
                      endHour="2359"
                    />
                  }
                  {...prop}
                />
              </>

              {_event.toLowerCase() == "league" && activeSlide == 3 && (
                <ConfettiArea recycle={false} numberOfPieces="50" />
              )}
            </div>

            <div
              className={
                activeSlide == 4 ? "carousel-item active" : "carousel-item"
              }
              data-bs-interval="1000"
            >
              <>
                <Banner
                  title="بیش از ۴ میلیارد"
                  text="پاداش افزایش لِوِل"
                  link=".levels"
                  icon="levels"
                  amin="animated delay-2s charkhesh"
                  iconamin="swing"
                  number="90"
                  {...prop}
                />
              </>
            </div>
            {_width > 500 && 1 == 2 && (
              <div className="carousel-item " data-bs-interval="1000">
                <Banner
                  image="/assets/images/calendar.gif"
                  title="بیش از ۵۰۰ میلیون"
                  text="جوایز ماهانه"
                  {...prop}
                />
              </div>
            )}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
            onClick={() => {
              goPrev();
            }}
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
            onClick={() => {
              goNext();
            }}
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
