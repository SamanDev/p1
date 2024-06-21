import React from "react";
import { Icon, List, Button } from "semantic-ui-react";
import { doCurrency, levelDataInfo, dayOfTournament } from "../../const";
import $ from "jquery";
import GiftsDesc from "../../utils/GiftsDesc";
import AddCalendar from "../../utils/AddCalendarWeekly";
import GalaxyIcon from "../../utils/svganim";
import LastRewardList from "./LastRewardList";
import LazyLoad from "react-lazyload";
const moment = require("moment");
const LevelList = (prop) => {
  var _day = moment().day(dayOfTournament);
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
                  text="Tournaments"
                  classinside="iconinside0"
                  number="1"
                  width="60px"
                  amin="inline animated swing fast"
                  iconamin="swing inline animated"
                />
              </div>
              <AddCalendar
                start={nowDay}
                dur="0"
                repeat="WEEKLY"
                format="2000"
                end="2200"
                title="GalaxyTournament"
              />
            </List.Content>
          </List.Item>

          <List.Item>
            <List.Content className="rtl text-center">
              <GiftsDesc
                desc={
                  <>
                    تورنومنت گلکسی هر{" "}
                    <span className="farsi text-gold">جمعه ساعت 22:00</span> با{" "}
                    <span className="farsi text-gold">
                      ورودی رایگان برای لِوِل دار ها
                    </span>{" "}
                    برگزار می شود.
                  </>
                }
                desc2={
                  <>
                    برای شرکت در تورنومنت گلکسی یا باید{" "}
                    <span className="farsi text-gold">
                      لول شما {levelDataInfo[3].minLevel} یا بالاتر
                    </span>{" "}
                    باشد یا موجودی اکانت شما بیش از{" "}
                    <span className="farsi text-gold">
                      {doCurrency(levelDataInfo[3].minBalance)} تومان
                    </span>{" "}
                    باشد.
                  </>
                }
                desc3={
                  <>
                    توجه داشته باشید اگر لِوِل شما{" "}
                    <span className="farsi text-gold">
                      کمتر از {levelDataInfo[3].minLevel}
                    </span>{" "}
                    باشد، بس از ثبت نام، برداشت و انتقال شما به مدت{" "}
                    <span className="farsi text-gold">
                      {levelDataInfo[3].banOutHours} ساعت
                    </span>{" "}
                    بسته خواهد شد.
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
                amount="50000000"
                subtitle={
                  <>
                    تومان برای ۲۵ نفر برتر
                    <br />و معرف های آنها
                  </>
                }
              />

              <AddCalendar
                start={nowDay}
                dur="0"
                repeat="WEEKLY"
                format="2000"
                end="2200"
                title="GalaxyTournament"
              />
              <GiftsDesc
                desc={
                  <div className="text-center">
                    ۲۵ جایزه{" "}
                    <div className="farsi-inline text-gold h5">یک میلیونی</div>{" "}
                    برای ۲۵ نفر پایانی تورنومنت
                  </div>
                }
                desc2={
                  <div className="text-center">
                    فقط کافیست جزو ۲۵ نفر پایانی باشید تا برنده یک میلیونی
                    باشید.
                  </div>
                }
                desc3={
                  <div className="text-center">
                    ۲۵ جایزه{" "}
                    <div className="farsi-inline text-gold h5">یک میلیونی</div>{" "}
                    برای معرف های ۲۵ نفر پایانی تورنومنت
                  </div>
                }
                desc4={
                  <div className="text-center">
                    با معرفی دوستان خود شانس برد خود را چند برابر کنید.
                    <br />
                    فقط کافیست آنها جزو ۲۵ نفر پایانی باشند تا شما برنده یک
                    میلیونی باشید.
                  </div>
                }
                title="۲۵+۲۵ میلیونی"
                subtitle="یعنی چی؟"
              />
              <Button
                fluid
                style={{ margin: "10px 0" }}
                className="farsi"
                color="orange"
                onClick={() => $("#openinvite").trigger("click")}
              >
                <Icon.Group size="huge">
                  <Icon name="user" inverted />
                  <Icon corner name="add" color="red" />
                </Icon.Group>
                <br />
                <br />
                معرفی دوستان
              </Button>
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
