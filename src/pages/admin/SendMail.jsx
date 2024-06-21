import React, { useEffect, useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";

import Swal from "sweetalert2";

import { notification } from "../../services/admin";
import { doCurrency } from "../../const";

function Admin(prop) {
  const [cashUser, setCashUser] = React.useState("hangover2");
  const [cashLoad, setCashLoad] = React.useState(false);

  const [subject, setSubject] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [image, setImage] = React.useState("");
  const [notMessage, setNotMessage] = React.useState("");
  const siteInfo = prop.siteInfo;
  const loginToken = prop.loginToken;
  siteInfo?.galaxyPassSet?.sort((a, b) => (a.id > b.id ? 1 : -1));
var onUpdateItem = prop.onUpdateItem
  const setNotTitle = (e) => {
    setSubject(e.target.value + " شروع شد");
    if (e.target.value == "لیگ روزانه") {
      var rules = siteInfo?.dailyLeagueSet[0];
      setTitle(doCurrency(rules.totalRewards/1000000) + " میلیون تومان \nهر روز برای " +rules.totalPlayer+" نفر");
      setNotMessage(
        "لیگ گلکسی هر روز از بیست و چهارم تا پایان هر ماه میلادی برگزار می شود.\n\nجوایز در پایان هر روز به "+rules.totalPlayer+" نفری که بیشترین امتیاز را در طول هر روز از گلکسی کسب کرده اند, اهدا خواهد شد.\n\nبرای شرکت در لیگ گلکسی یا باید لول شما "+rules.minLevel+" یا بالاتر باشد یا موجودی اکانت شما بیش از "+doCurrency(rules.minAmount)+" تومان باشد.\n\nتوجه داشته باشید اگر لِوِل شما کمتر از "+rules.minLevel+" باشد، با دریافت هر پاداش، برداشت و انتقال شما به مدت "+rules.hoursUnderLevel+" ساعت بسته خواهد شد."
      );

      setImage("https://www.galaxypoker.vip/assets/images/icons/league.png");
    }
    if (e.target.value == "گلکسی پَس") {
      var rules = siteInfo?.galaxyPassSet[0];
      setTitle(doCurrency(rules.totalRewards/1000000) + " میلیون تومان \nبرای هر بازیکن");
      setNotMessage(" گلکسی پَس از اول تا پانزدهم هر ماه میلادی برگزار می شود.\n\nهر بازیکن با "+rules.hoursLimit+" ساعت بازی روی میزهای "+rules.bigBlindLimit / 2+"K/"+rules.bigBlindLimit+"K و بالاتر طی مدت 24 ساعت جایزه آن روز را دریافت می نماید و به مرحله بعدی خواهد رفت.\n\nدر بامداد هر شب، گلکسی پَس ریست خواهد شد و مرحله جدید برای بازیکنانی که مرحله قبل را تمام کرده اند شروع به کار خواهد کرد و بازیکنانی که مرحله قبل را تمام نکرده اند مجددا 24 ساعت زمان دارند تا این مرحله را تمام کنند.\n\nبرای شرکت در گلکسی پَس یا باید لول شما "+rules.minLevel+" یا بالاتر باشد یا موجودی اکانت شما بیش از "+doCurrency(rules.minAmount)+" تومان باشد.\n\nتوجه داشته باشید اگر لِوِل شما کمتر از "+rules.minLevel+" باشد،با دریافت هر پاداش، برداشت و انتقال شما به مدت "+rules.hoursUnderLevel+" ساعت بسته خواهد شد."
      );
      setImage("https://www.galaxypoker.vip/assets/images/icons/gpass.png");
    }
    if (e.target.value == "میز VIP") {
      var rules = siteInfo?.vipTables[0];
      setTitle(doCurrency(rules.totalRewards/1000000) + " میلیون تومان \nبرای هر بازیکن");
     
      setNotMessage("میز وی آی پی "+rules.bigBlindLimit / 2+"K/"+rules.bigBlindLimit+"K از شانزدهم تا بیست و سوم هر ماه میلادی برگزار می شود.\n\nهر بازیکن با هر ساعت بازی روی میزهای "+rules.bigBlindLimit / 2+"K/"+rules.bigBlindLimit+"K و بالاتر مبلغ "+doCurrency(rules.reward)+" تومان دریافت می نماید.\n\nبرای شرکت در VIP "+rules.bigBlindLimit / 2+"K/"+rules.bigBlindLimit+"K یا باید لول شما "+rules.minLevel+" یا بالاتر باشد یا موجودی اکانت شما بیش از "+doCurrency(rules.minAmount)+" تومان باشد.\n\nتوجه داشته باشید اگر لِوِل شما کمتر از "+rules.minLevel+" باشد، با دریافت هر پاداش، برداشت و انتقال شما به مدت "+rules.hoursUnderLevel+" ساعت بسته خواهد شد."
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
  const setNotUsser = (e) => {
    setCashUser(e.target.value);
  };
  const setNotsubjectVal = (e) => {
    setSubject(e.target.value);
    onUpdateItem("subject",e.target.value)
  };
  const setNotTitleVal = (e) => {
    setTitle(e.target.value);
    onUpdateItem("title",e.target.value.replace(/\n/g,"<br/>"))
  };
  const setNotMessageVal = (e) => {
    setNotMessage(e.target.value);
    onUpdateItem("body",e.target.value.replace(/\n/g,"<br/>"))
  };
  useEffect(() => {
    onUpdateItem("title",title.replace(/\n/g,"<br/>"))
  }, [title]);
  useEffect(() => {
    onUpdateItem("subject",subject)
  }, [subject]);
  useEffect(() => {
    onUpdateItem("body",notMessage.replace(/\n/g,"<br/>"))
  }, [notMessage]);
  const sendNot = (e, data) => {
    if (notMessage == "") {
      return false;
    }
    setCashLoad(true);
    
    var notification2 = {
        subject:subject,
      title: title.replace(/\n/g,"<br/>"),
      body: notMessage.replace(/\n/g,"<br/>"),
      "username": "Tira",
  "userSiteUrl":"https://galaxy15x.site",
  "referUrl": "https://www.referglxy.com/",
 "instagram":"glxycasino",
"telegramChanel":"GlxyChannel",
"telegramSupport":"GlxySupport",
    };
console.log(notification2)
  };
  const titleList =
    "لیگ روزانه,تورنومنت ۲۵+۲۵,گلکسی پَس,میز VIP".split(",");
  const imgList = "gift3,gift2,gift1".split(",");

  return (
    <>
      <Form>
      <Form.Field>
      <label>Select Themeplate: </label>
          <select  className="farsi" onChange={setNotTitle}>
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
          <label>Subject: </label>
          <input value={subject} className="farsi" onChange={setNotsubjectVal} />
         
        </Form.Field>
        <Form.Field>
       
        <label>Title</label>
          <textarea
            value={title}
            className="farsi"
            onChange={setNotTitleVal}
          />
         
          <label>Meessage</label>
          <textarea
            value={notMessage}
            className="farsi"
            onChange={setNotMessageVal}
          />
  
        </Form.Field>
   
      </Form>
    </>
  );
}

export default Admin;
