import React, { useEffect, useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";

import Swal from "sweetalert2";

import { notification, adminGetService } from "../../services/admin";
import { doCurrency } from "../../const";

function Admin(prop) {
  const [cashUser, setCashUser] = useState("hangover2");
  const [cashLoad, setCashLoad] = useState(false);

  var onUpdateItem = prop.onUpdateItem;
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [notMessage, setNotMessage] = useState("");
  const siteInfo = prop.siteInfo;
  const loginToken = prop.loginToken;
  siteInfo?.galaxyPassSet?.sort((a, b) => (a.id > b.id ? 1 : -1));

  const setNotTitle = (e) => {
    setTitle(e.target.value + " شروع شد");
    if (e.target.value == "لیگ روزانه") {
      var rules = siteInfo?.dailyLeagueSet[0];
      setNotMessage(
        doCurrency(rules.totalRewards) + " تومان\nبرای هر بازیکن\n"
      );
      setImage("https://www.galaxypoker.vip/assets/images/icons/league.png");
    }
    if (e.target.value == "گلکسی پَس") {
      var rules = siteInfo?.galaxyPassSet[0];
      setNotMessage(
        doCurrency(rules.totalRewards) + " تومان\nبرای هر بازیکن\n"
      );
      setImage("https://www.galaxypoker.vip/assets/images/icons/gpass.png");
    }
    if (e.target.value == "میز VIP") {
      var rules = siteInfo?.vipTables[0];
      setNotMessage(
        doCurrency(rules.totalRewards) + " تومان\nبرای هر بازیکن\n"
      );
      setImage("https://www.galaxypoker.vip/assets/images/icons/vip.png");
    }
  };
  const setNotImage = (e) => {
    setImage(
      "https://www.galaxypoker.vip/assets/images/icons/" +
        e.target.value +
        ".png"
    );
  };
  const setNotTitleVal = (e) => {
    setTitle(e.target.value);
  };
  const setNotUsser = (e) => {
    setCashUser(e.target.value);
  };
  const setNotMessageVal = (e) => {
    setNotMessage(e.target.value);
  };
  useEffect(() => {
    onUpdateItem("title", title);
  }, [title]);

  useEffect(() => {
    onUpdateItem("body", notMessage.replace(/\n/g, " "));
  }, [notMessage]);
  useEffect(() => {
    onUpdateItem("subject", image);
  }, [image]);

  const titleList =
    "لیگ روزانه,تورنومنت ۲۵+۲۵,گلکسی پَس,میز VIP,هدایای گلکسی".split(",");
  const imgList = "gift3,gift2,gift1".split(",");

  return (
    <>
      <Form>
        <Form.Field>
          <label>Themplate: </label>
          <select value={title} className="farsi" onChange={setNotTitle}>
            <option value={""}></option>
            {titleList.map((name, i) => {
              return (
                <option key={i} value={name}>
                  {name}
                </option>
              );
            })}
          </select>
        </Form.Field>
        <Form.Field>
          <label>Title: </label>
          <input value={title} className="farsi" onChange={setNotTitleVal} />
        </Form.Field>
        <Form.Field>
          <label>Meessage</label>
          <textarea
            value={notMessage}
            className="farsi"
            onChange={setNotMessageVal}
          />
        </Form.Field>
        <Form.Field className="hiddenmenu">
          <label>Image</label>
          <img src={image} />
          <select value={image} onChange={setNotImage}>
            <option value={""}></option>
            {imgList.map((name, i) => {
              return (
                <option key={i} value={name}>
                  {name}
                </option>
              );
            })}
          </select>
        </Form.Field>
      </Form>
    </>
  );
}

export default Admin;
