import React, { Suspense, lazy, useEffect } from "react";

import MenuLoader from "../../utils/menuLoader";
//import UserDash from "./UserDash";
import PushNot from "../../pushNot.component";
import Index from "./index";

//const Index = lazy(() => import("./index"));
const UserDash = lazy(() => import("./UserDash"));
import $ from "jquery";
const Dashboard = (prop) => {
  String.prototype.toPersianCharacter = function () {
    var string = this;

    var obj = {
      "١": "۱",
      "٢": "۲",
      "٣": "۳",
      "٤": "۴",
      "٥": "۵",
      "٦": "۶",
      "٧": "۷",
      "٨": "۸",
      "٩": "۹",
      "٠": "۰",
      "۱": "1",
      "۲": "2",
      "۳": "3",
      "۴": "4",
      "۵": "5",
      "۶": "6",
      "۷": "7",
      "۸": "8",
      "۹": "9",
      "۰": "0",
    };

    Object.keys(obj).forEach(function (key) {
      string = string.replaceAll(obj[key], key);
    });
    return string;
  };
  localStorage.removeItem("tableName");

  const loginToken = prop.loginToken;
  const siteInfo = prop.siteInfo;

  siteInfo?.galaxyPassSet?.sort((a, b) => (a.id > b.id ? 1 : -1));
  siteInfo?.vipTables?.sort((a, b) => (a.id > b.id ? 1 : -1));
  siteInfo?.dailyLeagueSet?.sort((a, b) => (a.id > b.id ? 1 : -1));

  const handleFullscreen = (e) => {
    $(".framegame,body").removeClass("fullscreen");

    prop.reportWindowSize();
  };

  useEffect(() => {
    handleFullscreen();
  }, []);
  return (
    <>
      <div id="dashboard" className="">
        {loginToken?.accessToken && !loginToken?.logout ? (
          <>
            <Suspense fallback={<MenuLoader />}>
              <PushNot {...prop} />
              
            <UserDash
                loginToken={prop.loginToken}
                siteInfo={prop.siteInfo}
                openPanel={prop.openPanel}
              />
         
              
            </Suspense>
          </>
        ) : (
          <>
            <div>
              <Suspense fallback={<MenuLoader />}>
                <Index {...prop} />
              </Suspense>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
