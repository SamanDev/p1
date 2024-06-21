import { useEffect, useState } from "react";

import { siteInfoDef, isJson } from "../const";
import { publicGetRules, userGetRules } from "../services/public";
import { getReportPenService } from "../services/report";
import eventBus from "../services/eventBus";
function sendMessage(message) {
  try {
    const iframe = document.querySelector("iframe[name=gameframe]");
    iframe.contentWindow.postMessage(message, "*");
  } catch (error) {}
}
export const useUser = () => {
  var loginKey = localStorage.getItem("galaxyUserkeyToken");

  const [loginToken, setLoginToken] = useState(
    localStorage.getItem(loginKey + "Token") &&
      isJson(localStorage.getItem(loginKey + "Token"))
      ? JSON.parse(localStorage.getItem(loginKey + "Token"))
      : {}
  );
  const [loginTokenUpdate, setLoginTokenUpdate] = useState(loginToken);
  var _old = loginToken;
  if (
    _old.logout &&
    _old.username == localStorage.getItem("galaxyUserkeyToken")
  ) {
    _old.logout = false;
    setLoginToken(_old);
  }
  function sordData(siteInfo) {
    var _siteInfo = siteInfo;
    try {
      _siteInfo.userGifts = _siteInfo.userGifts.sort((a, b) =>
        a.id < b.id ? 1 : -1
      );
    } catch (error) {}

    return _siteInfo;
  }
  useEffect(() => {
    window.addEventListener("message", function (event) {
      if (event.data == "userget") {
        var newu = {
          username: loginToken.username,
          balance: loginToken.balance,
          balance2: loginToken.balance2,
          image: loginToken.level,
        };
        try {
          sendMessage(newu);
        } catch (error) {}
      }

      //console.log("Message received from the child: " + event.data); // Message received from child
    });
    eventBus.on("updateUser", (dataGet) => {
      setLoginToken(sordData(dataGet));

      setLoginTokenUpdate(sordData(dataGet));
    });
  }, []);

  useEffect(() => {
    var newu = {
      username: loginTokenUpdate.username,
      balance: loginTokenUpdate.balance,
      balance2: loginTokenUpdate.balance2,
      image: loginTokenUpdate.level,
    };
    try {
      sendMessage(newu);
    } catch (error) {}
  }, [loginTokenUpdate]);
  useEffect(() => {
    var loginKey = localStorage.getItem("galaxyUserkeyToken");
    if (loginKey) {
      localStorage.setItem(
        loginKey + "Token",
        JSON.stringify(sordData(loginToken))
      );
    }
  }, [loginToken]);
  return [loginToken];
};
export const useSiteInfo = (login) => {
  const [siteInfo, setSiteInfo] = useState(
    localStorage.getItem("siteInfo") && isJson(localStorage.getItem("siteInfo"))
      ? JSON.parse(localStorage.getItem("siteInfo"))
      : siteInfoDef
  );
  var loginKey = localStorage.getItem("galaxyUserkeyToken");

  const [loginToken, setLoginToken] = useState(
    login
      ? login
      : localStorage.getItem(loginKey + "Token") &&
        isJson(localStorage.getItem(loginKey + "Token"))
      ? JSON.parse(localStorage.getItem(loginKey + "Token"))
      : {}
  );
  const handleCheckLogin = async () => {
    try {
      const res = await publicGetRules();
      if (res.status === 200) {
        if (isJson(res.data)) {
          var _data = res.data;

          setSiteInfo(_data);
        }
      }
    } catch (error) {}
  };
  const handleCheckLoginUser = async (loginToken) => {
    if (loginToken.accessToken && !loginToken.logout) {
      try {
        const res = await userGetRules();
        if (res.status === 200) {
          if (isJson(res.data)) {
            var _data = res.data;

            setSiteInfo(_data);
          }
        }
      } catch (error) {}
    }
  };
  useEffect(() => {
    if (loginToken.accessToken && !loginToken.logout) {
      handleCheckLoginUser(loginToken);
    } else {
      handleCheckLogin();
    }

    eventBus.on("updateSiteInfo", (dataGet) => {
      setSiteInfo(dataGet);
    });
    eventBus.on("updateUser", (dataGet) => {
      if (!siteInfo?.pokerUrl) {
        setLoginToken(dataGet);
        //handleCheckLoginUser(dataGet);
      }
    });
  }, [loginToken.accessToken, loginToken.logout]);
  useEffect(() => {
    var _data = siteInfo;
    _data.updateday = new Date();

    localStorage.setItem("siteInfo", JSON.stringify(_data));
  }, [siteInfo]);
  return [siteInfo];
};
export const useActiveTable = () => {
  const [activeTable, setActiveTable] = useState(
    localStorage.getItem("activeTable") &&
      isJson(localStorage.getItem("activeTable"))
      ? JSON.parse(localStorage.getItem("activeTable"))
      : []
  );
  const handleGetActiveTable = async () => {
    try {
      const res = await getReportPenService("getActiveTables?mode=true", false);
      if (res.status === 200) {
        if (activeTable != res.data && isJson(res.data)) {
          var _data = res.data;

          setActiveTable(_data);
        }
      }
    } catch (error) {
      ////console.log(error.message);
    }
  };

  useEffect(() => {
    if (!activeTable?.updateday) {
      handleGetActiveTable();
    } else {
      var form_date = new Date(activeTable?.updateday);
      var today = new Date();
      let difference =
        form_date > today ? form_date - today : today - form_date;
      let diff_days = Math.floor(difference / 1000);

      if (diff_days > 180 || 1 == 1) handleGetActiveTable();
    }

    eventBus.on("updateActiveTables", (dataGet) => {
      setActiveTable(dataGet);
    });
  }, []);
  useEffect(() => {
    var _data = activeTable;
    _data.updateday = new Date();

    localStorage.setItem("activeTable", JSON.stringify(_data));
  }, [activeTable]);
  return [activeTable];
};

export const useLastReward = () => {
  const [lastReward, setLastReward] = useState(
    localStorage.getItem("lastReward") &&
      isJson(localStorage.getItem("lastReward"))
      ? JSON.parse(localStorage.getItem("lastReward"))
      : []
  );
  const handleGetLastReward = async () => {
    try {
      const res = await getReportPenService(
        "getLastRewards?page=1&number=500",
        false
      );

      if (res.status === 200 && isJson(res.data)) {
        var _data = res.data.sort((a, b) => (a.date < b.date ? 1 : -1));

        setLastReward(_data);

        localStorage.setItem("lastReward", JSON.stringify(_data));
      }
    } catch (error) {
      ////console.log(error.message);
      // setLastReward(_bonuses);
      //localStorage.setItem("lastReward", JSON.stringify(_bonuses));
    }
  };
  useEffect(() => {
    if (!lastReward[0]?.date) {
      handleGetLastReward();
    } else {
      var form_date = new Date(lastReward[0]?.date);
      var today = new Date();
      let difference =
        form_date > today ? form_date - today : today - form_date;
      let diff_days = Math.floor(difference / (1000 * 3600));

      if (diff_days > 1 || 1 == 1) handleGetLastReward();
    }
  }, []);

  return [lastReward];
};
