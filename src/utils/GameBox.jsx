import React from "react";
import { Segment } from "semantic-ui-react";
import AnimIcon from "./inviteIcon";
const SegmentExampleInverted = (prop) => {
  var icon = "sroxggda";
  var classn = "text-secondary-emphasis2 opacity-75 farsi";
  var bbackground = "rgba(0,0,0,.65)";
  var name = prop.game;
  if (prop.game == "more") {
    name = "بازی ها";
    //name = "...";
    icon = "afzktxmo";
    bbackground = "rgba(0,0,0,.2)";
    var classn = "text-secondary-emphasis2 opacity-50 farsi";
  }
  if (prop.game == "poker") {
    name = "Online Poker";
    name = "پوکر آنلاین";
    icon = "sroxggda";
  }
  if (prop.game == "wheel") {
    name = "Online Poker";
    name = "چرخ شانس";
    icon = "aadumupd";
  }
  if (prop.game == "sportbet") {
    name = "شرط بندی ورزشی";
    icon = "xlmenhhh";
  }
  if (prop.game == "crash") {
    name = "BoOoOoM";
    icon = "scsthizh";
  }
  if (prop.game.indexOf("roulette") > -1) {
    name = prop.game.replace("roulette", "roulette ");
    icon = "iexaoqby";
  }
  if (prop.game.indexOf("wheelof") > -1) {
    name = prop.game;
    icon = "aadumupd";
  }
  if (prop.game.indexOf("slot") > -1) {
    name = prop.game.replace("slot", "Slot ");
    icon = "eagxishj";
  }
  if (prop.game.indexOf("blackjack") > -1) {
    name = prop.game.replace("blackjack", "blackjack");
    icon = "qdxgyudy";
  }
  return (
    <Segment
      inverted
      raised
      className="fadeou5t"
      style={{
        background: bbackground,
        cursor: "pointer",
        overflow: "hidden",
        height: prop.height ? prop.height : 120,
      }}
    >
      <div
        className="fadeout"
        style={{
          height: prop.height ? prop.height : 100,
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            position: "absolute",

            top: -10,
          }}
        >
          <AnimIcon
            icon={icon}
            width={prop.height ? prop.height : 100}
            height={prop.height ? prop.height : 100}
            trigger={prop.trigger}
            delay="5500"
            stroke={prop.stroke ? prop.stroke : 15}
          />
        </div>

        <div
          className={classn}
          style={{
            fontSize: prop.height ? parseInt(prop.height) / 7 + "px" : 20,
            padding: prop.height ? parseInt(prop.height) / 10 + "px" : 20,
          }}
        >
          {name}
        </div>
      </div>
    </Segment>
  );
};

export default SegmentExampleInverted;
