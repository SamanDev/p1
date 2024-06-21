import React, { useEffect, useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";

import Swal from "sweetalert2";
import $ from "jquery";
import { notification } from "../../services/admin";
import { doCurrency } from "../../const";
import { adminPostService } from "../../services/admin";
function Admin(prop) {
  const [cashUser, setCashUser] = React.useState("hangover2");
  const [cashLoad, setCashLoad] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = React.useState("CRoyale7");
  const [title, setTitle] = React.useState("");
  const [image, setImage] = React.useState("");
  const [notMessage, setNotMessage] = React.useState("");
  const siteInfo = prop.siteInfo;
  const loginToken = prop.loginToken;
  siteInfo?.galaxyPassSet?.sort((a, b) => (a.id > b.id ? 1 : -1));

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

  };
  const setNotTitleVal = (e) => {
    setTitle(e.target.value);

  };
  const setNotMessageVal = (e) => {
    setNotMessage(e.target.value);
  
  };
  
  const sendNot = (e, data) => {
  
    
    var notification2 = {
        username:subject,
      emails: title,
    
    };
    addGift(notification2)
  };
  const addGift = async (data) => {
    setLoading(true)
    try {
      const res = await adminPostService(data, "inviteMailService");
      if (res.status == 200) {
        setLoading(false)
      } else {
        Alert("متاسفم...!", res.data.message, "error");
      }
    } catch (error) {
 
    }
  };
  const titleList =
    "لیگ روزانه,تورنومنت ۲۵+۲۵,گلکسی پَس,میز VIP".split(",");
  const imgList = "gift3,gift2,gift1".split(",");

  return (
    <>
      <Form>
   
        <Form.Field>
          <label>UserName: </label>
          <input value={subject} onChange={setNotsubjectVal} />
         
        </Form.Field>
        <Form.Field>
       
        <label>Email</label>
          <textarea
            value={title}
            
            onChange={setNotTitleVal}
          />
         
       
  
        </Form.Field>
   <Button onClick={sendNot} loading={loading}>Send</Button>
      </Form>
      <div id="invres"></div>
    </>
  );
}

export default Admin;
