import React from "react";
import { Icon, List, Button } from "semantic-ui-react";
import { doCurrency, levelDataInfo, dayOfTournament } from "../../const";
import $ from "jquery";
import GiftsDesc from "../../utils/GiftsDesc";
import AddCalendar from "../../utils/AddCalendarWeekly";
import ToTournament from "../../utils/ToTournament";
import GalaxyIcon from "../../utils/svganim";
import LastRewardList from "./LastRewardList";
import LazyLoad from "react-lazyload";
const moment = require("moment");
const LevelList = (prop) => {
  var _day = moment().day(dayOfTournament - 2);
  var nowDay = moment(_day).date();
  var start = moment(_day).format("YYYYMMDDT200000");

  var end = moment().format("YYYYMMDDTHHmmss");

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
            <List.Content className="rtl text-center">
              <div>
                <GalaxyIcon
                  mode="tournament"
                  level="1"
                  text="VIP 30M"
                  classinside="iconinside0"
                  number="1"
                  width="60px"
                  amin="inline animated swing fast"
                  iconamin="swing inline animated"
                />
              </div>
            </List.Content>
          </List.Item>

          <List.Item>
            <List.Content className="rtl text-center">
              <GiftsDesc
                desc={
                  <>
                    تورنومنت گلکسی هر{" "}
                    <span className="farsi text-gold">
                      چهارشنبه ها ساعت 20:00
                    </span>{" "}
                    با{" "}
                    <span className="farsi text-gold">
                      ورودی رایگان برای لِوِل های{" "}
                      {levelDataInfo[3].minLevel + 10} و بالاتر
                    </span>{" "}
                    برگزار می شود.
                  </>
                }
                desc4={
                  <>
                    ثبت نام{" "}
                    <span className="farsi text-gold">
                      ۲ ساعت قبل از شروع تورنومنت
                    </span>{" "}
                    باز خواهد شد.
                  </>
                }
                amount="30000000"
                subtitle={<>تومان برای ۱۰ نفر برتر</>}
              />
            </List.Content>
          </List.Item>
        </List>
        <LazyLoad height={300}>
          <LastRewardList mode={"tournament"} />
        </LazyLoad>
      </span>
    </span>
  );
};

export default LevelList;
