import React, { useState, useEffect } from "react";
import { Divider, Header, List, Accordion } from "semantic-ui-react";
import Reward from "../../utils/Reward";
import LevelIcon from "../../utils/svg";

import { doCurrency, levelClassInside } from "../../const";

const printtotalrow = (data, mode, target) => {
  return (
    <>
      <div className="farsi text-right">
        <span className="text-gold">
          {doCurrency(gettotal(data, mode, target))} تومان
        </span>{" "}
        پاداش در {doCurrency(gettotal(data, mode, "count"))} رکورد
      </div>
    </>
  );
};
const gettotal = (data, mode, target) => {
  var _data = data.filter((d) => d.mode.toLowerCase() === mode);
  var _totalReward = 0;
  {
    _data.map((x, i) => {
      _totalReward = _totalReward + x.amount;
    });
  }
  if (target == "total") return _totalReward;
  if (target == "count") return _data.length;
};
const printreward = (data, mode) => {
  var _data = data.filter((d) => d.mode === mode);
  return (
    <div
      style={{
        paddingLeft: 15,
        marginRight: 10,
        position: "relative",
        top: -13,
        background: "rgba(0,0,0,.2)",
      }}
      className="animated fadeInDown"
    >
      {_data.map((x, i) => {
        return (
          <div className={"rewardname"} mode={x.mode} key={i}>
            <Reward item={x} />
          </div>
        );
      })}
    </div>
  );
};
const Balance = (prop) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (e, titleProps) => {};
  const printtotalrowBox = (index, loginToken, mode, title) => {
    if (gettotal(loginToken, mode.replace("gifts", "gift"), "count") == 0)
      return false;
    var _lvl = 1;

    return (
      <>
        <Accordion.Title index={index} className="rewardname" mode={mode}>
          <List.Content className="lh-lg p-2">
            <div
              className={
                gettotal(loginToken, mode.replace("gifts", "gift"), "count") ==
                0
                  ? "opacity-25 pull-left"
                  : "pull-left"
              }
            >
              <LevelIcon
                level={_lvl}
                text={""}
                mode={mode}
                classinside={levelClassInside(_lvl)}
                number=""
                width="40px"
              />
            </div>

            <List.Header as="div" className="farsi text-end" color="grey">
              {title}
            </List.Header>
            <List.Description
              className={
                gettotal(loginToken, mode.replace("gifts", "gift"), "count") ==
                0
                  ? "opacity-25 fw-lighter"
                  : "fw-lighter"
              }
            >
              {printtotalrow(
                loginToken,
                mode.replace("gifts", "gift"),
                "total"
              )}
            </List.Description>
          </List.Content>

          <Divider inverted fitted />
        </Accordion.Title>
      </>
    );
  };

  const loginToken = JSON.parse(localStorage.getItem("lastReward"));
  useEffect(() => {
    prop.bindLastReward();
  }, []);
  if (loginToken) {
    var _totalReward = 0;
    {
      loginToken.map((x, i) => {
        _totalReward = _totalReward + x.amount;
      });
    }
    return (
      <>
        <Header
          as="h3"
          className="farsi text-center"
          inverted
          style={{
            lineHeight: "180%",
          }}
        >
          مجموع پاداش های این هفته
          <br />
          <span className="text-gold">{doCurrency(_totalReward)} تومان</span>
        </Header>

        {printtotalrowBox(1, loginToken, "levels", "پاداش لِوِل ها")}
        {printtotalrowBox(2, loginToken, "gpass", "گلکسی پَس")}
        {printtotalrowBox(3, loginToken, "vip", "VIP Table")}
        {printtotalrowBox(4, loginToken, "league", "لیگ روزانه")}
        {printtotalrowBox(5, loginToken, "commission", "کمیسیون معرفی دوستان")}
        {printtotalrowBox(6, loginToken, "rakeback", "ریک بک پوکر")}
        {printtotalrowBox(7, loginToken, "gifts", "هدایای گلکسی")}
        {printtotalrowBox(8, loginToken, "tournament", "تورنومنت ها")}
      </>
    );
  } else {
    return null;
  }
};

export default Balance;
