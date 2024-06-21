import React, { useState, useEffect } from "react";
import {
  Segment,
  Icon,
  Label,
  Popup,
  Progress,
  Reveal,
} from "semantic-ui-react";
import DepositArea from "../forms/index";

import { MyConfirm, MyDeposit } from "../../../utils/myAlert";
import { getHelp } from "../../../utils/getHelp";
import LevelIcon from "../../../utils/svg";
import CountUp from "../../../utils/CountUp";
import BonusArea from "../bonus/index.jsx";
import $ from "jquery";
import { cashierService } from "../../../services/cashier";
//import BonusArea from "../../../pages/dashboard/ActiveTableJson";
import { doCurrency, getEvent, levelClassInside } from "../../../const";

const moment = require("moment");
const openDeposit = () => {
  $("#opendeposit").trigger("click");
};
const Balance = (prop) => {
  var lvlPercent = 0;
  var gLvlPercent = 0;
  var vLvlPercent = 0;
  const siteInfo = prop.siteInfo;
  siteInfo?.galaxyPassSet?.sort((a, b) => (a.id > b.id ? 1 : -1));
  var gpassrules = siteInfo?.galaxyPassSet[0];
  siteInfo?.vipTables?.sort((a, b) => (a.id > b.id ? 1 : -1));
  var viprules = siteInfo?.vipTables[0];
  var levelData = siteInfo?.levelUps;
  const loginToken = prop.loginToken;

  const [color, setColor] = useState("grey");
  const [gCount, setGCount] = useState(0);
  const [stateMode, setStateMode] = useState(0);

  var _event = getEvent(siteInfo);
  const getReward = async (bonus) => {
    try {
      const res = await cashierService({ id: bonus.id }, "submitReward", "");
      if (res.status == 200) {
      } else {
      }
    } catch (error) {}
  };

  const handleConfirm = (bonus) => {
    var start = moment(bonus.date);
    var end = moment();
    var _br = "\n";

    if (bonus.status == "Pending") {
      if (!start.isBefore(end)) {
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
  const [lvlPercentState, setlvlPercentState] = useState(0);
  const ChangeGift = () => {
    if (loginToken?.accessToken && !loginToken?.logout) {
      var _bonuses = loginToken?.userGifts?.sort((a, b) =>
        a.id < b.id ? 1 : -1
      );
      var end = Date.now();

      var _pen = _bonuses.filter(
        (d) =>
          d.status == "Pending" &&
          d.received == false &&
          //Date.parse(d.startDate.replace("-08:00", "")) < end &&
          Date.parse(d.expireDate.replace("-08:00", "")) > end
      );
      if (_pen.length > 0) {
        if (
          $(".swal2-container").html() == "" ||
          $(".swal2-container").length == 0
        ) {
          //MyToastReward(_pen[0], handleConfirm, loginToken, siteInfo);
        }

        setColor("orange");
        setGCount(_pen.length);
      } else {
        setColor("grey");
        setGCount(_pen.length);
      }
    }
  };
  const ChangeStateMode = () => {
    var _n = stateMode;
    _n += 1;
    if (_n > 1) {
      _n = 0;
    }
    setStateMode(_n);
  };
  const openProfile = () => {
    prop.setUserProfile(loginToken.username);
    prop.setUserOpen(true);
  };
  useEffect(() => {
    window.addEventListener("message", function (event) {
      if (event.data == "openusdbank") {
        $("#opendepositusd").trigger("click");
      }

      //console.log("Message received from the child: " + event.data); // Message received from child
    });
    if (_event == "GPass" && !loginToken.takeGPass) {
      setStateMode(1);
    }
    if (_event == "VIP") {
      setStateMode(1);
    }
    if (_event == "League") {
      setStateMode(1);
    }
  }, []);
  useEffect(() => {
    if (loginToken?.accessToken && levelData) {
      var _lvlFinal = levelData.filter((d) => d.level === loginToken.level);

      lvlPercent = parseFloat(
        (loginToken.levelPoint * 100) / _lvlFinal[0].point
      ).toFixed(2);
      gLvlPercent = parseFloat(
        (loginToken.glevelSecond * 100) / (gpassrules.hoursLimit * 3600)
      ).toFixed(2);
      vLvlPercent = parseFloat(
        (loginToken.vipPlaySecond * 100) / (viprules.hoursLimit * 3600)
      ).toFixed(2);
      if (gLvlPercent > 100) {
        gLvlPercent = 100;
      }
      if (lvlPercent > 100) {
        lvlPercent = 100;
      }
      if (vLvlPercent > 100) {
        vLvlPercent = 100;
      }
    }
    if (stateMode == 0 || _event == "League") {
      setlvlPercentState(lvlPercent);
    }
    if (stateMode == 1 && _event == "GPass") {
      setlvlPercentState(gLvlPercent);
    }
    if (stateMode == 1 && _event == "VIP") {
      setlvlPercentState(vLvlPercent);
    }
    ChangeGift();
  }, [stateMode, loginToken]);
  useEffect(() => {
    if (gCount > 0) {
      //$("#playbip").trigger("click");
      //$("#opengifts:not(.open)").trigger("click");
    } else {
      //$("#opengifts.open").trigger("click");
    }
  }, [gCount]);
  useEffect(() => {
    ChangeGift();
  }, []);
  if (loginToken) {
    return (
      <>
        <Segment
          className="myaccount"
          inverted
          style={{ margin: 0, padding: 10, color: "#fff", height: 50 }}
          onClick={() => {
            prop.setActivePanel(false);
          }}
        >
          <span className="step0">
            <Popup
              offset={[-8, 20]}
              disabled={
                _event != "GPass" || loginToken.takeGPass || stateMode == 0
              }
              content={
                <div
                  className="helparea fadeoutend"
                  style={{
                    height: "100%",
                    maxHeight: "50vh",
                    overflow: "auto",
                  }}
                >
                  {getHelp(loginToken, siteInfo, _event)}
                </div>
              }
              hoverable
              inverted
              size="mini"
              trigger={
                <span
                  style={{ top: -4, position: "relative" }}
                  className="step0-1"
                  onClick={() => {
                    ChangeStateMode();
                  }}
                >
                  {stateMode == 0 && (
                    <LevelIcon
                      level={loginToken.level}
                      text=""
                      mode="levels"
                      classinside={levelClassInside(loginToken.level)}
                      number=""
                      width="30px"
                    />
                  )}
                  {stateMode == 1 && _event == "GPass" && (
                    <>
                      {loginToken.takeGPass && (
                        <>
                          <Icon
                            name="check"
                            color="green"
                            size="large"
                            style={{
                              position: "absolute",
                              zIndex: 3,
                              top: -10,
                              right: -15,
                            }}
                          />
                        </>
                      )}

                      <div style={{ display: "inline-block" }}>
                        <LevelIcon
                          mode="gpass"
                          level={loginToken.glevel}
                          classinside="iconinside0"
                          number={loginToken.glevel}
                          text=""
                          width="30px"
                        />
                      </div>
                    </>
                  )}

                  {stateMode == 1 && _event == "VIP" && (
                    <LevelIcon
                      classinside="iconinside0"
                      number=""
                      text=""
                      width="30px"
                      level={1}
                      mode="vip"
                    />
                  )}
                  {stateMode == 1 && _event == "League" && (
                    <LevelIcon
                      classinside="iconinside0"
                      number=""
                      text=""
                      width="30px"
                      level={20}
                      mode="league"
                    />
                  )}
                </span>
              }
            />
            <Label
              color="black"
              className="balanceLable step0-2"
              onClick={() => {
                openProfile();
              }}
            >
              {loginToken.username}
            </Label>
            <Label
              color="black"
              className="balanceLable amount"
              onClick={() => {
                $("#opendepicon").trigger("click");
              }}
            >
              <Reveal animated="small fade" className="show" instant>
                <Reveal.Content
                  visible
                  style={{ background: "#1b1c1d", minWidth: "100px" }}
                >
                  <CountUp balance={loginToken.balance} />
                </Reveal.Content>
                <Reveal.Content hidden>
                  <span className="text-gold">$</span>
                  {doCurrency((loginToken.balance2).toFixed(2))}
                
                </Reveal.Content>
              </Reveal>
            </Label>
            {loginToken?.refer != "runner" && loginToken?.refer != "bots" && (
              <>
                <div
                  className="step0-3"
                  style={{
                    display: "inline-block",
                    position: "relative",
                    zIndex: 10,
                  }}
                >
                  <Popup
                    on="click"
                    className="myaccount"
                    inverted
                    position="bottom center"
                    offset={[-50, 0]}
                    basic
                    pinned
                    trigger={
                      <Icon
                        circular
                        size="small"
                        inverted
                        name="plus"
                        color="green"
                        link
                        id="opendepicon"
                        className="cashierarea"
                      />
                    }
                  >
                    <DepositArea
                      mode="deposit"
                      size="mini"
                      labelcolor="orange"
                      {...prop}
                    />
                  </Popup>{" "}
                  <Popup
                    on="click"
                    className="myaccount"
                    inverted
                    position="bottom center"
                    offset={[-78, 0]}
                    basic
                    pinned
                    trigger={
                      <Icon
                        circular
                        size="small"
                        inverted
                        color="red"
                        name="minus"
                        className="cashierarea"
                        link
                      />
                    }
                  >
                    <DepositArea
                      mode="cashout"
                      size="mini"
                      labelcolor="orange"
                      {...prop}
                    />
                  </Popup>
                </div>{" "}
                <Popup
                  on="click"
                  className="myaccount"
                  inverted
                  position="bottom center"
                  offset={[-106, 0]}
                  basic
                  pinned
                  onClose={() => {
                    $("#opengifts").removeClass("open");
                  }}
                  onOpen={() => {
                    $("#opengifts").addClass("open");
                  }}
                  defaultOpen={gCount > 0 ? true : false}
                  disabled={gCount == 0 ? true : false}
                  trigger={
                    <Icon
                      circular
                      id="opengifts"
                      color={color}
                      inverted={color == "grey" ? false : true}
                      name="gift"
                      size="small"
                      className={
                        gCount == 0
                          ? "cashierarea animated step0-4"
                          : "cashierarea animated heartBeat slow step0-4"
                      }
                      link
                      onClick={() => {
                        if (gCount == 0) {
                          prop.openPanel(".giftarea");
                        }
                      }}
                    >
                      <Label
                        color="red"
                        floating
                        size="mini"
                        className="farsi-inline"
                        hidden={gCount == 0 ? true : false}
                        style={{ top: 5, left: "95%" }}
                      >
                        {gCount}
                      </Label>
                    </Icon>
                  }
                >
                  <BonusArea {...prop} ChangeGift={ChangeGift} />
                </Popup>
              </>
            )}

            <Popup
              trigger={
                <Progress
                  percent={lvlPercentState}
                  inverted
                  indicating
                  size="tiny"
                  className="myprogress"
                />
              }
              size="mini"
              inverted
              content={"%" + lvlPercentState}
              position="bottom center"
            />
          </span>
        </Segment>
      </>
    );
  } else {
    return null;
  }
};

export default Balance;
