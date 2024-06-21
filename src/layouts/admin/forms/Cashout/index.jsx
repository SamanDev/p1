import React, { useState } from "react";
import { Icon, Label, Button, Header, Divider } from "semantic-ui-react";
import { Statistic, Segment } from "semantic-ui-react";
import $ from "jquery";
import CashoutArea from "./cashoutComponent";
import { cashoutData, cashoutDataDollar, doCurrency } from "../../../../const";
const defCol = "black";
const selCol = "green";
const defColBtn = "grey";
const selColBtn = "orange";
const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(false);
  const loginToken = prop.loginToken;
  const siteInfo = prop.siteInfo;
  return (
    <>
      <div id="dep1" className="deparea" style={{ margin: "5px 0" }}>
        <Header as="h6" className="farsi">
          لطفا روش برداشت را انتخاب کنید
        </Header>

        <Segment inverted className="blnc" size="mini" color="black">
          <Statistic inverted size="mini">
            <Statistic.Value>{doCurrency(loginToken?.balance)}</Statistic.Value>
            <Statistic.Label className="farsi">موجودی شما</Statistic.Label>
          </Statistic>
        </Segment>
        <Divider inverted />
        <Button.Group size="mini" vertical labeled icon fluid>
          {cashoutData.map(function (dep, i) {
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
                      color="red"
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
        {loginToken?.balance2 >= 1 && (
          <>
            <Divider inverted />
            <Header as="h6" className="farsi">
              یا روش برداشت دلاری را انتخاب کنید
            </Header>
            <Segment inverted className="blnc" size="mini">
              <Statistic inverted size="mini">
                <Statistic.Value>
                  <span className="text-gold">$</span>{" "}
                 
                  {doCurrency((loginToken?.balance2).toFixed(2))}
                </Statistic.Value>
                <Statistic.Label className="farsi">
                  موجودی دلاری شما
                </Statistic.Label>
              </Statistic>
            </Segment>
            <Divider inverted />
            <Button.Group size="mini" vertical labeled icon fluid>
              {cashoutDataDollar.map(function (dep, i) {
                if (prop.getAccess(dep.getwaykey)) {
                  return (
                    <Button
                      key={i}
                      active={depMode.value == dep.value}
                      onClick={() => {
                        setDepMode(dep);
                        $(".deparea").hide();
                        $("#dep2").show();
                      }}
                      color={depMode.value == dep.value ? selColBtn : defColBtn}
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
                          color="red"
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
          </>
        )}
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
          <CashoutArea {...prop} gateway={depMode.value} menu={depMode} />
        )}
      </div>
    </>
  );
};

export default depositArea;
