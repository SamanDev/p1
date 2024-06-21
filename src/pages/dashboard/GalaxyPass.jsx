import React from "react";
import { List } from "semantic-ui-react";
import { doCurrency } from "../../const";
import LevelIcon from "../../utils/svg";
import LazyLoad from "react-lazyload";
import AddCalendar from "../../utils/AddCalendar";
import GiftsDesc from "../../utils/GiftsDesc";
import LastRewardList from "./LastRewardList";
import GPassIcon from "../../utils/anim/gpass";

import LevelBar from "../../utils/GLevelBar";
const LevelList = (prop) => {
  var totalReward = 0;

  const siteInfo = prop.siteInfo;
  const loginToken = prop.loginToken;
  siteInfo?.galaxyPassSet?.sort((a, b) => (a.id > b.id ? 1 : -1));
  var rules = siteInfo?.galaxyPassSet[0];
  return (
    <span className="myaccount popupmenu">
      <span className="lazyarea">
        <List
          divided
          inverted
          verticalAlign="middle"
          className="myaccount"
          style={{ padding: "0 20px" }}
        >
          <List.Item>
            <List.Content className="rtl text-center ">
              <div className="inline animated ">
                <GPassIcon
                  mode="gpass"
                  level=""
                  text="GalaxyPass"
                  classinside="iconinside0"
                  number=""
                  width="60px"
                  iconamin={"inline animated charkhesh delay-1s big"}
                  amin={"inline animated pulse"}
                />
              </div>
              <AddCalendar
                start={rules.startDay}
                dur={rules.endDay - rules.startDay + 1}
                repeat="MONTHLY"
                format="0000"
                title="GallaxyPass"
              />
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content className="rtl text-center ">
              <GiftsDesc
                desc={
                  <>
                    گلکسی پَس از{" "}
                    <span className="farsi text-gold">
                      اول تا پانزدهم هر ماه میلادی
                    </span>{" "}
                    برگزار می شود.
                  </>
                }
                desc2={
                  <>
                    هر بازیکن با{" "}
                    <span className="farsi text-gold">
                      {siteInfo.galaxyPassSet[0].hoursLimit} ساعت بازی
                    </span>{" "}
                    روی میزهای{" "}
                    <span className="farsi text-gold">
                      {siteInfo.galaxyPassSet[0].bigBlindLimit / 2}K/
                      {siteInfo.galaxyPassSet[0].bigBlindLimit}K و بالاتر طی مدت
                      24 ساعت
                    </span>{" "}
                    جایزه آن روز را دریافت می نماید و به مرحله بعدی خواهد رفت.
                  </>
                }
                desc3={
                  "در بامداد هر شب، گلکسی پَس ریست خواهد شد و مرحله جدید برای بازیکنانی که مرحله قبل را تمام کرده اند شروع به کار خواهد کرد و بازیکنانی که مرحله قبل را تمام نکرده اند مجددا 24 ساعت زمان دارند تا این مرحله را تمام کنند."
                }
                desc4={
                  <>
                    برای شرکت در گلکسی پَس یا باید{" "}
                    <span className="farsi text-gold">
                      لول شما {rules.minLevel} یا بالاتر
                    </span>{" "}
                    باشد یا موجودی اکانت شما بیش از{" "}
                    <span className="farsi text-gold">
                      {doCurrency(rules.minAmount)} تومان
                    </span>{" "}
                    باشد.
                  </>
                }
                desc5={
                  <>
                    توجه داشته باشید اگر لِوِل شما{" "}
                    <span className="farsi text-gold">
                      کمتر از {rules.minLevel}
                    </span>{" "}
                    باشد،با دریافت هر پاداش، برداشت و انتقال شما به مدت{" "}
                    <span className="farsi text-gold">
                      {rules.hoursUnderLevel} ساعت
                    </span>{" "}
                    بسته خواهد شد.
                  </>
                }
                amount={rules.totalRewards}
                subtitle="تومان برای هر بازیکن"
              />
            </List.Content>
          </List.Item>
        </List>
        <LazyLoad height={70}>
          <ul className="mm-listview">
            <li className="menutitle mm-listitem"></li>
            <li className="menutitle mm-listitem">
              <span className="mm-listitem__text">لیست جوایز گلکسی پَس</span>
            </li>
          </ul>
        </LazyLoad>
        <List
          divided
          inverted
          verticalAlign="middle"
          className="myaccount"
          style={{ padding: "0 20px" }}
        >
          {siteInfo.galaxyPassSet.map((x, i) => {
            totalReward += x.reward;

            return (
              <LazyLoad key={i} height={91} className="item">
                <List.Item
                  className={
                    loginToken?.glevel == i + 1
                      ? " animated fadeIn"
                      : " animated fadeIn"
                  }
                  key={i}
                  id={"lvl" + (i + 1)}
                >
                  <List.Content floated="right" className="rtl float-end">
                    <span className="text-gold">{doCurrency(x.reward)}</span>{" "}
                    <span className="mysmall">
                      <small className="farsi">تومان پاداش</small>
                    </span>
                    <div className="mysmall">
                      {doCurrency(totalReward)}{" "}
                      <small className="farsi mysmall">مجموع پاداش</small>
                    </div>
                  </List.Content>
                  <LevelIcon
                    mode="gpass"
                    level={i + 1}
                    text={"Level " + (i + 1)}
                    classinside="iconinside0"
                    number=""
                    width="38px"
                  />
                  {loginToken?.accessToken && !loginToken?.logout && (
                    <div className="levelbar">
                      {loginToken.glevel == i + 1 ? (
                        <>
                          <LevelBar progress {...prop} />
                        </>
                      ) : (
                        <>
                          {loginToken.glevel > i + 1 ? (
                            <>
                              <LevelBar val="100" progress {...prop} />
                            </>
                          ) : (
                            <>
                              <LevelBar val="0" {...prop} />
                            </>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </List.Item>
              </LazyLoad>
            );
          })}
        </List>
        <LazyLoad height={300}>
          <LastRewardList mode="gpass" {...prop} />
        </LazyLoad>
      </span>
    </span>
  );
};

export default LevelList;
