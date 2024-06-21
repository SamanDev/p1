import $ from "jquery";
import React, { useState } from "react";
import { Button, Divider, Header, Icon, Label } from "semantic-ui-react";
import { depositData, depositDollarData, doCurrency } from "../../../../const";
import DepositArea from "./depositComponent";
import { Statistic, Segment } from "semantic-ui-react";
const defCol = "black";
const selCol = "green";
const defColBtn = "grey";
const selColBtn = "orange";
const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(false);
  const loginToken = prop.loginToken;
  const siteInfo = prop.siteInfo;
  function getBonus(gateway) {
    try {
      var data_filter = loginToken.cashierGateways.filter(
        (element) => element.name == gateway
      );
      var bonus = data_filter[0].bonus;
    } catch (error) {
      var bonus = 0;
    }

    return bonus;
  }
  var cData = [];
  {
    depositData.map(function (dep, i) {
      if (getBonus(dep.getwaykey) > 0) {
        cData.push({
          key: dep.key,
          getwaykey: dep.getwaykey,
          text: dep.text,
          value: dep.value,
          icon: dep.icon,
          limit: dep.limit,
          bonus: "+ " + getBonus(dep.getwaykey) + "%",
        });
      } else {
        cData.push({
          key: dep.key,
          getwaykey: dep.getwaykey,
          text: dep.text,
          value: dep.value,
          icon: dep.icon,
          limit: dep.limit,
        });
      }
    });
  }
  var cDataUsd = [];
  {
    depositDollarData.map(function (dep, i) {
      if (getBonus(dep.getwaykey) > 0) {
        cDataUsd.push({
          key: dep.key,
          getwaykey: dep.getwaykey,
          text: dep.text,
          value: dep.value,
          icon: dep.icon,
          usd: true,
          limit: dep.limit,
          bonus: "+ " + getBonus(dep.getwaykey) + "%",
        });
      } else {
        cDataUsd.push({
          key: dep.key,
          getwaykey: dep.getwaykey,
          text: dep.text,
          value: dep.value,
          usd: true,
          icon: dep.icon,
          limit: dep.limit,
        });
      }
    });
  }

  return (
    <>
      <div id="dep1" className="deparea" style={{ margin: "5px 0" }}>
        <Header as="h6" className="farsi">
          لطفا روش پرداخت را انتخاب کنید
        </Header>
        <Segment inverted className="blnc" size="mini" color="black">
          <Statistic inverted size="mini">
            <Statistic.Value>{doCurrency(loginToken?.balance)}</Statistic.Value>
            <Statistic.Label className="farsi">موجودی شما</Statistic.Label>
          </Statistic>
        </Segment>
        <Divider inverted />
        <Button.Group size="mini" vertical labeled icon fluid>
          {cData.map(function (dep, i) {
            if (prop.getAccess(dep.getwaykey)) {
              return (
                <Button
                  key={i}
                  active={depMode.value == dep.value}
                  onClick={() => {
                    setDepMode(dep);
                    localStorage.setItem("defdep", dep.text);
                    $(".deparea").hide();
                    $("#dep2").show();
                  }}
                  color={
                    depMode.value == dep.value
                      ? selColBtn
                      : localStorage.getItem("defdep") == dep.text
                      ? "red"
                      : defColBtn
                  }
                >
                  <Icon name={dep.icon} color="black" />
                  <span className="farsi">{dep.text}</span>
                  <Label
                    size="mini"
                    floating
                    color={depMode.value == dep.value ? selCol : defCol}
                    pointing="left"
                    className="myfloat"
                  >
                    {dep.limit.replace(
                      "$100 ",
                      "$" + siteInfo?.cashoutLimitDollar + " "
                    )}
                  </Label>
                  {dep.bonus && (
                    <Label
                      size="mini"
                      color="green"
                      title={dep.bonus + " بوناس"}
                      style={{ position: "absolute", top: 5, right: 100 }}
                    >
                      {dep.bonus}
                    </Label>
                  )}
                </Button>
              );
            } else {
              return null;
            }
          })}
        </Button.Group>
        <Divider inverted />
        <Header as="h6" className="farsi">
          یا روش پرداخت دلاری را انتخاب کنید
        </Header>
        <Segment inverted className="blnc" size="mini">
          <Statistic inverted size="mini">
            <Statistic.Value>
              <span className="text-gold">$</span>{" "}
              {doCurrency(loginToken?.balance2)}
            </Statistic.Value>
            <Statistic.Label className="farsi">
              موجودی دلاری شما
            </Statistic.Label>
          </Statistic>
        </Segment>
        <Divider inverted />
        <Button.Group size="mini" vertical labeled icon fluid>
          {cDataUsd.map(function (dep, i) {
            if (prop.getAccess(dep.getwaykey)) {
              return (
                <Button
                  key={i}
                  active={depMode.value == dep.value}
                  onClick={() => {
                    setDepMode(dep);
                    localStorage.setItem("defdep", dep.text);
                    $(".deparea").hide();
                    $("#dep2").show();
                  }}
                  color={
                    depMode.value == dep.value
                      ? selColBtn
                      : localStorage.getItem("defdep") == dep.text
                      ? "red"
                      : defColBtn
                  }
                >
                  <Icon name={dep.icon} color="black" />
                  <span className="farsi">{dep.text} دلار</span>
                  <Label
                    size="mini"
                    floating
                    color={depMode.value == dep.value ? selCol : defCol}
                    pointing="left"
                    className="myfloat"
                  >
                    {dep.limit.replace(
                      "$100 ",
                      "$" + siteInfo?.cashoutLimitDollar + " "
                    )}
                  </Label>
                  {dep.bonus && (
                    <Label
                      size="mini"
                      color="green"
                      title={dep.bonus + " بوناس"}
                      style={{ position: "absolute", top: 5, right: 100 }}
                    >
                      {dep.bonus}
                    </Label>
                  )}
                </Button>
              );
            } else {
              return null;
            }
          })}
        </Button.Group>
      </div>
      <div
        id="dep2"
        className="deparea"
        style={{ margin: "5px 0", display: "none" }}
      >
        <Header as="h4" floated="right" className="farsi">
          {depMode.text}
        </Header>
        <div
          className="farsi"
          style={{ cursor: "pointer", textAlign: "left" }}
          onClick={() => {
            setDepMode(false);
            $(".deparea").hide();
            $("#dep1").show();
          }}
        >
          بازگشت <Icon name="arrow alternate circle left outline" />
        </div>

        <Divider inverted />
        {depMode.value && (
          <DepositArea {...prop} menu={depMode} gateway={depMode.value} />
        )}
      </div>
    </>
  );
};

export default depositArea;
