import React from "react";
import { List } from "semantic-ui-react";
import { doCurrency } from "../../const";
import AddCalendar from "../../utils/AddCalendar";
import GalaxyIcon from "../../utils/svganim";
import GiftsDesc from "../../utils/GiftsDesc";
import LastRewardList from "./LastRewardList";
import LazyLoad from "react-lazyload";
const LevelList = (prop) => {
  const siteInfo = prop.siteInfo;
  const loginToken = prop.loginToken;
  siteInfo?.vipTables?.sort((a, b) => (a.id > b.id ? 1 : -1));
  var rules = siteInfo?.vipTables[0];
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
            <List.Content className=" text-center">
              <GalaxyIcon
                mode="vip"
                level=""
                text="VIP Gift"
                classinside="iconinside0"
                number=""
                width="60px"
                amin="inline animated fast flipInX delay-1s"
                iconamin="flipInY inline animated"
              />

              <AddCalendar
                start={rules.startDay}
                dur={rules.endDay - rules.startDay + 1}
                repeat="MONTHLY"
                format="0000"
                title="GalaxyVIPTable"
              />
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content className="rtl text-center ">
              <GiftsDesc
                desc={
                  <>
                    میز وی آی پی {rules.bigBlindLimit / 2}K/
                    {rules.bigBlindLimit}K از{" "}
                    <span className="farsi text-gold">
                      شانزدهم تا بیست و سوم هر ماه میلادی
                    </span>{" "}
                    برگزار می شود.
                  </>
                }
                desc2={
                  <>
                    هر بازیکن با{" "}
                    <span className="farsi text-gold">هر ساعت بازی</span> روی
                    میزهای{" "}
                    <span className="farsi text-gold">
                      {rules.bigBlindLimit / 2}K/
                      {rules.bigBlindLimit}K و بالاتر{" "}
                    </span>{" "}
                    مبلغ{" "}
                    <span className="farsi text-gold">
                      {doCurrency(rules.reward)} تومان
                    </span>{" "}
                    دریافت می نماید.
                  </>
                }
                desc3={
                  <>
                    برای شرکت در VIP {rules.bigBlindLimit / 2}K/
                    {rules.bigBlindLimit}K یا باید{" "}
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
                desc4={
                  <>
                    توجه داشته باشید اگر لِوِل شما{" "}
                    <span className="farsi text-gold">
                      کمتر از {rules.minLevel}
                    </span>{" "}
                    باشد، با دریافت هر پاداش، برداشت و انتقال شما به مدت{" "}
                    <span className="farsi text-gold">
                      {rules.hoursUnderLevel} ساعت
                    </span>{" "}
                    بسته خواهد شد.
                  </>
                }
                amount="192000000"
                subtitle="تومان برای هر بازیکن"
              />
            </List.Content>
          </List.Item>
        </List>
        <LazyLoad height={300}>
          <LastRewardList mode="vip" {...prop} />
        </LazyLoad>
      </span>
    </span>
  );
};

export default LevelList;
