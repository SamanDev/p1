import React, { useState } from "react";
import { Button, List } from "semantic-ui-react";
import LevelIcon from "../../../utils/svg";
import { doCurrency, levelDataInfo, levelClassInside } from "../../../const";
import { MyConfirm, MyDeposit } from "../../../utils/myAlert";
import Status from "../../../utils/Status";
import { cashierService } from "../../../services/cashier";
import Moment from "react-moment";
import $ from "jquery";
import LevelBar from "../../../utils/GiftLevelBar";
const moment = require("moment");

const openDeposit = () => {
  $("#opendeposit").trigger("click");
};

const BonusArea = (prop) => {
  const [loading, setLoading] = useState(false);
  const loginToken = prop.loginToken;
  const siteInfo = prop.siteInfo;
  const bonus = prop.bonus;
  const getRate = localStorage.getItem("getRate")
    ? localStorage.getItem("getRate")
    : 50000;
  siteInfo?.galaxyPassSet?.sort((a, b) => (a.id > b.id ? 1 : -1));
  var gpassrules = siteInfo?.galaxyPassSet[0];
  siteInfo?.vipTables?.sort((a, b) => (a.id > b.id ? 1 : -1));
  var viprules = siteInfo?.vipTables[0];
  var leaguerules = siteInfo?.dailyLeagueSet[0];
  const getReward = async (bonus) => {
    setLoading(true);
    try {
      const res = await cashierService({ id: bonus.id }, "submitReward", "");
      if (res.status == 200) {
        setLoading(false);
        // MyToast("انجام شد");
      } else {
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleConfirm = (bonus) => {
    var start = moment(bonus.startDate.replace("-08:00", ""));
    var expire = moment(bonus.expireDate.replace("-08:00", ""));
    var end = moment();
    var _br = "\n";

    if (bonus.status == "Pending") {
      if (!start.isBefore(end) && 1 == 2) {
      } else {
        if (bonus.banaction) {
          var _msg = `<small class="opacity-50 animated heartBeat delay-2s" style="display:block;margin-top:10px">توجه داشته باشید اگر لِوِل شما کمتر از <span class="text-gold">${bonus.levelreq} </span> باشد، با دریافت هر پاداش، برداشت و انتقال شما به مدت <span class="text-gold">${bonus.banaction} ساعت</span> بسته خواهد شد.</small>`;

          var _msg2 = `<div class="text-end fs-6"><p class="fw-semibold fs-5">برای دریافت این هدیه:</p>`;
          if (parseInt(bonus.balancereq) < parseInt(loginToken.balance)) {
            _msg2 = `${_msg2}<div><i class="fas fa-times fa-fw text-danger"></i> یا باید <span class="text-gold">لول شما  ${
              bonus.levelreq
            } یا بالاتر</span> باشد.</div><div><i class="fas fa-check fa-fw text-success"></i> یا موجودی اکانت شما بیش از <span class="text-gold">${doCurrency(
              bonus.balancereq
            )} تومان</span>  باشد.</div> ${_msg}</div>`;
          } else {
            _msg2 = `${_msg2}<div><i class="fas fa-times fa-fw text-danger"></i> یا باید <span class="text-gold">لول شما  ${
              bonus.levelreq
            } یا بالاتر</span> باشد.</div><div><i class="fas fa-times fa-fw text-danger"></i> یا موجودی اکانت شما بیش از <span class="text-gold">${doCurrency(
              bonus.balancereq
            )} تومان</span>  باشد.</div> ${_msg}</div>`;
          }
          if (parseInt(loginToken.balance) >= parseInt(bonus.balancereq)) {
            MyConfirm("تایید دریافت", _msg2, getReward, bonus);
          } else {
            MyDeposit("تایید دریافت", _msg2, openDeposit);
          }
        } else {
          getReward(bonus);
        }
      }
    }
  };
  var start = moment(bonus.startDate.replace("-08:00", ""));
  var expire = moment(bonus.expireDate.replace("-08:00", ""));
  var end = moment();
  var _mode = bonus.mode.toLowerCase();
  var _amount = bonus.amount ? bonus.amount : bonus.amount2;
  var _cur = bonus.amount ? "تومان" : "دلار";
  var _status = bonus.status;
  var _txt = bonus.label;
  try {
    var _lvl = bonus.text
      .split(" ")[1]
      .replace("Bonus", "")
      .replace("Gift", "");
  } catch (error) {
    var _lvl = "1";
  }

  if (_mode == "gpass" && loginToken.level < gpassrules.minLevel) {
    bonus.banaction = gpassrules.hoursUnderLevel;
    bonus.balancereq = gpassrules.minAmount;
    bonus.levelreq = gpassrules.minLevel;
  }
  if (_mode == "vip" && loginToken.level < viprules.minLevel) {
    bonus.banaction = viprules.hoursUnderLevel;
    bonus.balancereq = viprules.minAmount;
    bonus.levelreq = viprules.minLevel;
  }

  if (_mode == "league" && loginToken.level < leaguerules.minLevel) {
    bonus.banaction = leaguerules.hoursUnderLevel;
    bonus.balancereq = leaguerules.minAmount;
    bonus.levelreq = leaguerules.minLevel;
  }

  if (!end.isBefore(expire) && _status == "Pending") {
    _status = "Canceled";
  }
  if (_status == "Pending" && !start.isBefore(end)) {
    _status = "ClockReward";
  }

  if (_mode == "gift") {
    if (
      _amount >= levelDataInfo[4].minAmount ||
      (_amount >= levelDataInfo[4].minAmount / getRate && bonus.amount2)
    ) {
      _mode = "gift3";
    } else if (
      _amount >= levelDataInfo[5].minAmount ||
      (_amount >= levelDataInfo[5].minAmount / getRate && bonus.amount2)
    ) {
      _mode = "gift2";
    } else {
      _mode = "gift1";
    }
  }

  if (_mode == "gpass") {
    _txt = "پاداش لول " + _lvl + " گلکسی پَس";
  }
  if (_mode == "league") {
    _txt = "رتبه " + _lvl + " " + _txt;
  }
  if (_mode == "tournament" && _lvl != "") {
    _txt = "رتبه " + _lvl + " " + _txt;
  }
  if (_mode == "tournament" && _lvl == "") {
    _txt = "معرفی نفر پایانی تورنومنت ";
  }
  if (_mode == "vip") {
    _txt = "پاداش میز VIP";
  }
  if (_mode == "gift3") {
    _txt = "هدیه طلایی";
  }
  if (_mode == "gift2") {
    _txt = "هدیه بنفش";
  }
  if (_mode == "gift1") {
    _txt = "هدیه قرمز";
  }
  if (_mode == "levels") {
    //s_txt = "هدیه قرمز";
    _lvl = _lvl - 1;
  }
  var lvlPercent = parseFloat(
    (loginToken.giftPlaySecond * 100) / (siteInfo.secondForGift)
  ).toFixed(2);
  if (lvlPercent > 100) {
    lvlPercent = 100;
  }
  return (
    <List.Item>
      <List.Content floated="right">
        <div className="farsi" style={{ height: 18 }}>
          <Status status={_status} circular icon size="mini" /> {_txt}
        </div>
        <small
          className="farsi"
          style={{
            padding: 10,
            display: "block",
            opacity: 0.5,
            paddingTop: 5,
          }}
        >
          {bonus.status == "Done" && <>دریافت شده</>}
          {bonus.status == "Pending" &&
            start.isBefore(end) &&
            end.isBefore(expire) && (
              <>
                <Moment fromNow locale="fa">
                  {expire}
                </Moment>{" "}
                تا انقضا
              </>
            )}
          {((bonus.status == "Pending" &&
            start.isBefore(end) &&
            !end.isBefore(expire)) ||
            bonus.status == "Expired") && (
            <>
              انقضا در{" "}
              <Moment fromNow locale="fa">
                {expire}
              </Moment>
            </>
          )}
          {bonus.status == "Pending" && !start.isBefore(end) && (
            <>
              <Moment fromNow locale="fa">
                {start}
              </Moment>{" "}
              تا فعالسازی
            </>
          )}
        </small>
        {bonus.status == "Done" && (
          <>
            <Button
              size="mini"
              color="green"
              compact
              disabled
              floated="right"
              className="rtl"
              style={{ opacity: 1, width: 140, marginRight: 10 }}
            >
              {doCurrency(_amount)} <small className="farsi">{_cur}</small>
            </Button>
          </>
        )}
        {bonus.status == "Pending" &&
          start.isBefore(end) &&
          end.isBefore(expire) && (
            <>
            {lvlPercent>=100 || bonus.mode != "Gift"? <Button
                size="mini"
                color="orange"
                floated="right"
                className="rtl"
                style={{ opacity: 1, width: 140, marginRight: 10 }}
                compact
                loading={loading}
                disabled={loading}
                onClick={() => {
                  handleConfirm(bonus, loginToken);
                }}
              >
                {doCurrency(_amount)} <small className="farsi">{_cur}</small>
              </Button>:<Button
                size="mini"
                color="grey"
                floated="right"
                className="rtl"
                style={{ opacity: 1, width: 140, marginRight: 10 }}
                compact
                onClick={() => {
                  prop.openPanel(".giftarea", "");
                }}
                
              >
                {doCurrency(_amount)} <small className="farsi">{_cur}</small><br/>{lvlPercent}%
              </Button>}
             
             
                
            </>
          )}
        {((bonus.status == "Pending" &&
          start.isBefore(end) &&
          !end.isBefore(expire)) ||
          bonus.status == "Expired") && (
          <>
            <Button
              animated="fade"
              size="mini"
              className="rtl"
              color="red"
              compact
              disabled
              floated="right"
              style={{ opacity: 1, width: 140, marginRight: 10 }}
            >
              {doCurrency(_amount)} <small className="farsi">{_cur}</small>
            </Button>
          </>
        )}
        {bonus.status == "Pending" && !start.isBefore(end) && (
          <>
            <Button
              animated="fade"
              size="mini"
              color="grey"
              compact
              floated="right"
              className="rtl"
              style={{ opacity: 1, width: 140, marginRight: 10 }}
              onClick={() => {
                if(bonus.mode == "Gift" && lvlPercent< 100){
                  prop.openPanel(".giftarea", "");
                }
                
              }}
            >
              {doCurrency(_amount)} <small className="farsi">{_cur}</small>
              {bonus.mode == "Gift" && lvlPercent< 100 &&<><br/>{lvlPercent}%</>}
            </Button>
          </>
        )}
      </List.Content>
      <div
        style={{ padding: 10, overflow: "hidden" }}
        className={"rewardnam e"}
        mode={_mode.toLowerCase()}
      >
        <LevelIcon
          level={_lvl}
          mode={_mode.toLowerCase()}
          text={bonus.username}
          classinside={levelClassInside(_lvl - 1)}
          number={_lvl}
          width="36px"
        />
      </div>
    </List.Item>
  );
};

export default BonusArea;
