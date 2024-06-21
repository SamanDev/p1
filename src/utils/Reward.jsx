import React from "react";
import { Grid } from "semantic-ui-react";
import LevelIcon from "./svg";
import { doCurrency, levelClassInside, levelDataInfo } from "../const";
import { convertDateToJalali } from "./convertDate";
import CshList from "./commitiondetail";
import $ from "jquery";
const Reward = (prop) => {
  const loginToken = prop.loginToken;
  var _mode = prop.item.mode.toLowerCase();
  if (_mode == "gift") {
    if (prop.item.amount >= levelDataInfo[4].minAmount) {
      _mode = "gift3";
    } else if (prop.item.amount >= levelDataInfo[5].minAmount) {
      _mode = "gift2";
    } else {
      _mode = "gift1";
    }
  }

  var _txt = prop.item.label;
  try {
    var _lvl = prop.item.text
      .split(" ")[1]
      .replace("Bonus", "")
      .replace("Gift", "");
  } catch (error) {
    var _lvl = "";
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
  if (_mode == "bonus") {
    _txt = "بوناس خرید";
  }

  if (_mode == "levels") {
    try {
      _lvl = _lvl - 1;
    } catch (error) {}
  }

  return (
    <Grid
      verticalAlign="middle"
      divided="vertically"
      inverted
      padded="vertically"
    >
      <Grid.Row
        className={
          loginToken?.username == prop.item.username && !prop.color
            ? "rewardred"
            : ""
        }
        onClick={() => {
          $(".user" + prop.item.id).removeClass("hiddenmenu");
        }}
      >
        <Grid.Column width={6}>
          <div style={{ marginLeft: 10 }}>
            <LevelIcon
              level={_lvl}
              number={_lvl}
              mode={_mode.toLowerCase()}
              text={prop.item.username}
              classinside={levelClassInside(_lvl - 1)}
              width="36px"
            />
          </div>
        </Grid.Column>
        <Grid.Column width={10} textAlign="right" style={{ paddingRight: 20 }}>
          <div className="farsi">
            <span className="text-gold">
              {doCurrency(
                prop.item.amount ? prop.item.amount : prop.item.amount2
              )}
            </span>{" "}
            {prop.item.amount ? "تومان" : "دلار"}
          </div>
          <small className="farsi rewardtext">{_txt}</small>
          {convertDateToJalali(prop.item.date)}
        </Grid.Column>
        {(loginToken.username == "HangOver2" ||
          (prop.item?.detail && prop.item.username == loginToken.username)) && (
          <Grid.Column width={16} style={{ margin: 0 }}>
            <CshList
              item={prop.item.detail}
              className={
                loginToken.username == "HangOver2"
                  ? "hiddenmenu user" + prop.item.id
                  : "user" + prop.item.id
              }
            />
          </Grid.Column>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Reward;
