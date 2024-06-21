import React from "react";
import Leftcontent from "./LeftContent";
import Rightcontent from "./RightContent";

const Index = (prop) => {
  return (
    <>
      <nav id="navbar" className="navbar fixed-top">
        <span
          id="openlevellist"
          style={{
            display: "none",
          }}
          onClick={() => {
            prop.openPanel(".levels", "");
          }}
        />
        <span
          id="reportWindowSize"
          style={{
            display: "none",
          }}
          onClick={() => {
            prop.reportWindowSize();
          }}
        />
        <span
          id="bindlastreward"
          style={{
            display: "none",
          }}
          onClick={() => {
            setTimeout(() => {
              prop.bindLastReward();
            }, 50);
          }}
        />
        <span
          id="openaddcart"
          style={{
            display: "none",
          }}
          onClick={() => {
            prop.openPanel(".addcart", "");
          }}
        />
        <span
          id="opendeposit"
          style={{
            display: "none",
          }}
          onClick={() => {
            prop.openPanel(".deposit", "");
          }}
        />
        <span
          id="opendepositusd"
          style={{
            display: "none",
          }}
          onClick={() => {
            prop.openPanel(".openusdbank", "");
          }}
        />
        <span
          id="openinvite"
          style={{
            display: "none",
          }}
          onClick={() => {
            prop.openPanel(".invite", "");
          }}
        />
        <span
          id="opensupport"
          style={{
            display: "none",
          }}
          onClick={() => {
            prop.openPanel(".support", "");
          }}
        />
        <span
          id="openmenucontent"
          style={{
            display: "none",
          }}
          onClick={() => {
            prop.openPanel("." + localStorage.getItem("menucontent"), "");
          }}
        />
        <Leftcontent {...prop} />
      </nav>
      <Rightcontent {...prop} />
    </>
  );
};

export default Index;
