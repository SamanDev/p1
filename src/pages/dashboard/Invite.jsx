import React from "react";
import Register from "../../layouts/admin/auth/Invite";
import MyMsg from "../../utils/MsgDesc";

import AnimIcon from "../../utils/inviteIcon";
const AccordionExampleStandard = (prop) => {
  return (
    <span className="myaccount popupmenu">
      <div style={{ height: 120, position: "relative" }}>
        <div
          className="fadeout"
          style={{ position: "absolute", zIndex: 0, top: -25 }}
        >
          <AnimIcon
            icon="zpxybbhl"
            width="300px"
            height="200px"
            trigger="loop"
          />
        </div>
      </div>
      <MyMsg
        color="yellow"
        size="mini"
        text={
          <>
            <h5 className="farsi lh-lg">ساخت اکانت برای دوستان</h5>لطفا نام
            کاربری و ایمیل دوست خود را وارد کنید. کلمه عبور و اطلاعات ورود به
            گلکسی برای ایشان ایمیل خواهد شد.
          </>
        }
      />

      <Register labelcolor="orange" size="mini" {...prop} />
    </span>
  );
};

export default AccordionExampleStandard;
