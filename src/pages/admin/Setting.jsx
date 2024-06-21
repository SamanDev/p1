import React, { useState, useEffect } from "react";

import TableAdmin from "./utils/tableform";

import { adminPutServiceList, publicGetRules } from "../../services/admin";
import { isJson } from "../../const";
import { Alert } from "../../utils/alerts";
const getGateways = JSON.parse(localStorage.getItem("getGateways"));
function getPathOfKey(object, keys, getwaysList) {
  var newO = JSON.parse(JSON.stringify(object));
  var newOb = {};
  newOb["user"] = newO;

  var finalObj = [];
  // finalObj.push({'user':newO})

  for (const x in newO) {
    if (keys.indexOf("," + x + ",") == -1) {
    } else {
      if (isJson(JSON.parse(JSON.stringify(newO[x])))) {
        var newO1 = JSON.parse(JSON.stringify(newO[x]));
        newO1?.sort((a, b) => (a.id < b.id ? 1 : -1));
        for (const y in newO1) {
          if (isJson(JSON.parse(JSON.stringify(newO1[y])))) {
            var newO2 = JSON.parse(JSON.stringify(newO1[y]));

            for (const z in newO2) {
              if (isJson(JSON.parse(JSON.stringify(newO2[z])))) {
              } else {
                var nval = newO2[z];

                finalObj.push({
                  name: z,
                  x: x,
                  value: nval,
                  user: newO1[0],
                });
                newOb[newO2["name"]] = newO2[z];
              }
            }
          } else {
            if (y == "label") {
              finalObj.push({
                name: x,
                value: newO1[y],
                user: newO1["value"].toLowerCase(),
              });
              newOb[x] = newO1[y];
            }
          }
        }
        finalObj.push({
          name: "header",

          value: x,
          user: newO,
        });
      } else {
        finalObj.push({ name: x, value: newO[x], user: null });
        newOb[x] = newO[x];
      }
    }
  }
  var finalObj2 = JSON.parse(JSON.stringify(finalObj));
  var newOb2 = {};
  newOb2["final"] = finalObj2;

  getwaysList?.map(function (ways) {
    var blnIs = false;
    for (const y in finalObj2) {
      if (finalObj2[y].name == ways.name) {
        blnIs = true;
      }
    }
    if (!blnIs) {
      finalObj.push({
        id: ways.id,
        name: ways.name,

        value: false,
        user: newO,
      });
    }
  });
  finalObj?.sort((a, b) => (a.id > b.id ? 1 : -1));

  //finalObj.push({'data':newOb})

  return finalObj;
}
function getPathOfKey2(object, keys, getwaysList) {
  var newO = JSON.parse(JSON.stringify(object));
  var newOb = {};
  newOb["user"] = newO;

  var finalObj = [];
  finalObj.push({
    name: "header",

    value: "Main Settings",
    user: newO,
  });
  // finalObj.push({'user':newO})
  for (const x in newO) {
    if (keys.indexOf("," + x + ",") == -1) {
    } else {
      if (isJson(JSON.parse(JSON.stringify(newO[x])))) {
        var newO1 = JSON.parse(JSON.stringify(newO[x]));
        finalObj.push({ name: x, value: newO1.length, user: newO });
        newOb[x] = newO[x];
      } else {
        finalObj.push({ name: x, value: newO[x], user: newO });
        newOb[x] = newO[x];
      }
    }
  }

  var finalObj2 = JSON.parse(JSON.stringify(finalObj));
  var newOb2 = {};
  newOb2["final"] = finalObj2;
  getwaysList?.sort((a, b) => (a.id > b.id ? 1 : -1));
  getwaysList?.map(function (ways) {
    var blnIs = false;
    for (const y in finalObj2) {
      if (finalObj2[y].name == ways.name) {
        blnIs = true;
      }
    }
    if (!blnIs) {
      finalObj.push({
        name: ways.name,

        value: false,
        user: newO,
      });
    }
  });

  //finalObj.sort((a, b) => (a.name > b.name ? 1 : -1));
  //finalObj.push({'data':newOb})

  return finalObj;
}

function Admin(prop) {
  String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, "g"), replacement);
  };

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
      string = string.replaceAll(key, obj[key]);
    });
    return string;
  };
  const useSiteInfo = () => {
    const [siteInfo, setSiteInfo] = useState();

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
    useEffect(() => {
      handleCheckLogin();
    }, []);

    return [siteInfo];
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const loginToken = prop.loginToken;

  const [siteInfo] = useSiteInfo();
  const [loading, setLoading] = useState(true);
  console.log(siteInfo);
  const [info, setInfo] = useState(siteInfo);
  const updateUserObj = async (name, value, user, x) => {
    var data = info;

    if (
      name?.name == "referUrl" ||
      name?.name == "instagram" ||
      name?.name == "telegramSupport" ||
      name?.name == "telegramChanel"
    ) {
      var val = name.value;
    } else {
      var _val = value.toPersianCharacter();
      var val = parseInt(_val);
    }
    if (x) {
      var cdata = data[x];
      var cdata2 = cdata[0];
      cdata2[name] = val;
    } else {
      var _name = name?.name ? name?.name : name;
      data[_name] = val;
    }

    try {
      const res = await adminPutServiceList(data, "editGalaxyRewardRules");
      if (res.status == 200) {
        Alert("Done", "", "success");
      } else {
        Alert("متاسفم...!", res.data.message, "error");
      }
    } catch (error) {
      Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
    }
    localStorage.setItem("siteNewInfo", JSON.stringify(data));
    setInfo(data);
  };

  var newdataInfo = [
    getPathOfKey2(
      info,
      ",telegramSupport,telegramChanel,instagram,referUrl,cashoutLimit,depositLimit,durationTime,startTimeCommission,startTimeDailyLeague,startTimeGPass,startTimeLevelUp,startTimeRakeBack,startTimeVipTable,"
    ),
  ];

  var newdataBankInfo = [
    //getPathOfKey(user, ",dailyLeagueSet,"),
    getPathOfKey(info, ",galaxyPassSet,"),
  ];

  var newdataInfoData = JSON.parse(JSON.stringify(newdataInfo));
  var newdatabankInfoData = JSON.parse(JSON.stringify(newdataBankInfo));

  return (
    <>
      <div
        className="reportTable"
        style={{ height: "calc(100vh - 150px)", overflow: "auto" }}
      >
        <TableAdmin
          data={newdataInfoData}
          getwaysList={getGateways}
          setActiveIndex={setActiveIndex}
          addTabData={prop.addTabData}
          removeTabData={prop.removeTabData}
          updateUserObj={updateUserObj}
        />
        <TableAdmin data={newdatabankInfoData} updateUserObj={updateUserObj} />
      </div>
    </>
  );
}

export default Admin;
