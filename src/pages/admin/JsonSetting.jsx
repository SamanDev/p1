import React, { useState, useEffect } from "react";

import { adminPutServiceList, adminPostService } from "../../services/admin";
import { Alert } from "../../utils/alerts";
import { MyConfirm } from "../../utils/myAlert";
import { isJson } from "../../const";
import { JsonEditor } from "react-jsondata-editor";
import { publicGetRules } from "../../services/admin";
import {
  Input,
  Segment,
  Button,
  Dimmer,
  Loader,
  Icon,
  Modal,
  Grid,
  Label,
} from "semantic-ui-react";
const getGateways = JSON.parse(localStorage.getItem("getGateways"));
function sordData(siteInfo) {
  var _siteInfo = siteInfo;
  _siteInfo.galaxyPassSet = _siteInfo.galaxyPassSet.sort((a, b) =>
    a.id > b.id ? 1 : -1
  );
  _siteInfo.levelUps = _siteInfo.levelUps.sort((a, b) =>
    a.id > b.id ? 1 : -1
  );
  _siteInfo.vipTables = _siteInfo.vipTables.sort((a, b) =>
    a.id > b.id ? 1 : -1
  );
  _siteInfo.dailyLeagueSet = _siteInfo.dailyLeagueSet.sort((a, b) =>
    a.id > b.id ? 1 : -1
  );
  _siteInfo.depositBonus = _siteInfo.depositBonus;
  return _siteInfo;
}
const useSiteInfo = (info) => {
  const [siteInfo, setSiteInfo] = useState(info);

  const handleCheckLogin = async () => {
    try {
      const res = await publicGetRules();
      if (res.status === 200) {
        if (isJson(res.data)) {
          var _data = res.data;
          localStorage.setItem("siteInfoAdmin", JSON.stringify(_data));
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

  const [siteInfo] = useSiteInfo();
  //console.log(siteInfo);
  if (!siteInfo?.galaxyPassSet) {
    return null;
  }
  var siteInfoNew = siteInfo;
  /* siteInfoNew.levelUps = [
    {
        "id": 1,
        "level": 1,
        "commission": 10,
        "point": 2000000,
        "reward": 100000
    },
    {
        "id": 2,
        "level": 2,
        "commission": 10,
        "point": 4000000,
        "reward": 200000
    },
    {
        "id": 3,
        "level": 3,
        "commission": 10,
        "point": 6000000,
        "reward": 300000
    },
    {
        "id": 4,
        "level": 4,
        "commission": 10,
        "point": 8000000,
        "reward": 400000
    },
    {
        "id": 5,
        "level": 5,
        "commission": 11,
        "point": 10000000,
        "reward": 500000
    },
    {
        "id": 6,
        "level": 6,
        "commission": 11,
        "point": 12000000,
        "reward": 600000
    },
    {
        "id": 7,
        "level": 7,
        "commission": 11,
        "point": 14000000,
        "reward": 700000
    },
    {
        "id": 8,
        "level": 8,
        "commission": 11,
        "point": 16000000,
        "reward": 800000
    },
    {
        "id": 9,
        "level": 9,
        "commission": 11,
        "point": 18000000,
        "reward": 900000
    },
    {
        "id": 10,
        "level": 10,
        "commission": 12,
        "point": 20000000,
        "reward": 1000000
    },
    {
        "id": 11,
        "level": 11,
        "commission": 12,
        "point": 24000000,
        "reward": 1200000
    },
    {
        "id": 12,
        "level": 12,
        "commission": 12,
        "point": 30000000,
        "reward": 1500000
    },
    {
        "id": 13,
        "level": 13,
        "commission": 12,
        "point": 36000000,
        "reward": 1800000
    },
    {
        "id": 14,
        "level": 14,
        "commission": 12,
        "point": 42000000,
        "reward": 2100000
    },
    {
        "id": 15,
        "level": 15,
        "commission": 13,
        "point": 48000000,
        "reward": 2400000
    },
    {
        "id": 16,
        "level": 16,
        "commission": 13,
        "point": 54000000,
        "reward": 2700000
    },
    {
        "id": 17,
        "level": 17,
        "commission": 13,
        "point": 60000000,
        "reward": 3000000
    },
    {
        "id": 18,
        "level": 18,
        "commission": 13,
        "point": 66000000,
        "reward": 3300000
    },
    {
        "id": 19,
        "level": 19,
        "commission": 13,
        "point": 72000000,
        "reward": 3600000
    },
    {
        "id": 20,
        "level": 20,
        "commission": 14,
        "point": 78000000,
        "reward": 3900000
    },
    {
        "id": 21,
        "level": 21,
        "commission": 14,
        "point": 84000000,
        "reward": 4200000
    },
    {
        "id": 22,
        "level": 22,
        "commission": 14,
        "point": 98000000,
        "reward": 4900000
    },
    {
        "id": 23,
        "level": 23,
        "commission": 14,
        "point": 112000000,
        "reward": 5600000
    },
    {
        "id": 24,
        "level": 24,
        "commission": 14,
        "point": 126000000,
        "reward": 6300000
    },
    {
        "id": 25,
        "level": 25,
        "commission": 15,
        "point": 140000000,
        "reward": 7000000
    },
    {
        "id": 26,
        "level": 26,
        "commission": 15,
        "point": 154000000,
        "reward": 7700000
    },
    {
        "id": 27,
        "level": 27,
        "commission": 15,
        "point": 168000000,
        "reward": 8400000
    },
    {
        "id": 28,
        "level": 28,
        "commission": 15,
        "point": 182000000,
        "reward": 9100000
    },
    {
        "id": 29,
        "level": 29,
        "commission": 15,
        "point": 196000000,
        "reward": 9800000
    },
    {
        "id": 30,
        "level": 30,
        "commission": 16,
        "point": 210000000,
        "reward": 10500000
    },
    {
        "id": 31,
        "level": 31,
        "commission": 16,
        "point": 240000000,
        "reward": 12000000
    },
    {
        "id": 32,
        "level": 32,
        "commission": 16,
        "point": 270000000,
        "reward": 13500000
    },
    {
        "id": 33,
        "level": 33,
        "commission": 16,
        "point": 300000000,
        "reward": 15000000
    },
    {
        "id": 34,
        "level": 34,
        "commission": 16,
        "point": 330000000,
        "reward": 16500000
    },
    {
        "id": 35,
        "level": 35,
        "commission": 17,
        "point": 360000000,
        "reward": 18000000
    },
    {
        "id": 36,
        "level": 36,
        "commission": 17,
        "point": 390000000,
        "reward": 19500000
    },
    {
        "id": 37,
        "level": 37,
        "commission": 17,
        "point": 420000000,
        "reward": 21000000
    },
    {
        "id": 38,
        "level": 38,
        "commission": 18,
        "point": 450000000,
        "reward": 22500000
    },
    {
        "id": 39,
        "level": 39,
        "commission": 18,
        "point": 480000000,
        "reward": 24000000
    },
    {
        "id": 40,
        "level": 40,
        "commission": 18,
        "point": 510000000,
        "reward": 25500000
    },
    {
        "id": 41,
        "level": 41,
        "commission": 19,
        "point": 540000000,
        "reward": 27000000
    },
    {
        "id": 42,
        "level": 42,
        "commission": 19,
        "point": 570000000,
        "reward": 28500000
    },
    {
        "id": 43,
        "level": 43,
        "commission": 19,
        "point": 600000000,
        "reward": 30000000
    },
    {
        "id": 44,
        "level": 44,
        "commission": 20,
        "point": 630000000,
        "reward": 31500000
    },
    {
        "id": 45,
        "level": 45,
        "commission": 20,
        "point": 660000000,
        "reward": 33000000
    },
    {
        "id": 46,
        "level": 46,
        "commission": 20,
        "point": 690000000,
        "reward": 34500000
    },
    {
        "id": 47,
        "level": 47,
        "commission": 21,
        "point": 720000000,
        "reward": 36000000
    },
    {
        "id": 48,
        "level": 48,
        "commission": 21,
        "point": 750000000,
        "reward": 37500000
    },
    {
        "id": 49,
        "level": 49,
        "commission": 21,
        "point": 780000000,
        "reward": 39000000
    },
    {
        "id": 50,
        "level": 50,
        "commission": 22,
        "point": 810000000,
        "reward": 40500000
    },
    {
        "id": 51,
        "level": 51,
        "commission": 22,
        "point": 840000000,
        "reward": 42000000
    },
    {
        "id": 52,
        "level": 52,
        "commission": 23,
        "point": 870000000,
        "reward": 43500000
    },
    {
        "id": 53,
        "level": 53,
        "commission": 23,
        "point": 900000000,
        "reward": 45000000
    },
    {
        "id": 54,
        "level": 54,
        "commission": 24,
        "point": 930000000,
        "reward": 46500000
    },
    {
        "id": 55,
        "level": 55,
        "commission": 24,
        "point": 960000000,
        "reward": 48000000
    },
    {
        "id": 56,
        "level": 56,
        "commission": 25,
        "point": 990000000,
        "reward": 49500000
    },
    {
        "id": 57,
        "level": 57,
        "commission": 25,
        "point": 1020000000,
        "reward": 51000000
    },
    {
        "id": 58,
        "level": 58,
        "commission": 26,
        "point": 1050000000,
        "reward": 52500000
    },
    {
        "id": 59,
        "level": 59,
        "commission": 26,
        "point": 1080000000,
        "reward": 54000000
    },
    {
        "id": 60,
        "level": 60,
        "commission": 27,
        "point": 1110000000,
        "reward": 55500000
    },
    {
        "id": 61,
        "level": 61,
        "commission": 27,
        "point": 1140000000,
        "reward": 57000000
    },
    {
        "id": 62,
        "level": 62,
        "commission": 29,
        "point": 1200000000,
        "reward": 60000000
    },
    {
        "id": 63,
        "level": 63,
        "commission": 29,
        "point": 1260000000,
        "reward": 63000000
    },
    {
        "id": 64,
        "level": 64,
        "commission": 30,
        "point": 1320000000,
        "reward": 66000000
    },
    {
        "id": 65,
        "level": 65,
        "commission": 30,
        "point": 1380000000,
        "reward": 69000000
    },
    {
        "id": 66,
        "level": 66,
        "commission": 31,
        "point": 1440000000,
        "reward": 72000000
    },
    {
        "id": 67,
        "level": 67,
        "commission": 31,
        "point": 1500000000,
        "reward": 75000000
    },
    {
        "id": 68,
        "level": 68,
        "commission": 32,
        "point": 1560000000,
        "reward": 78000000
    },
    {
        "id": 69,
        "level": 69,
        "commission": 32,
        "point": 1620000000,
        "reward": 81000000
    },
    {
        "id": 70,
        "level": 70,
        "commission": 33,
        "point": 1680000000,
        "reward": 84000000
    },
    {
        "id": 71,
        "level": 71,
        "commission": 33,
        "point": 1760000000,
        "reward": 88000000
    },
    {
        "id": 72,
        "level": 72,
        "commission": 34,
        "point": 1840000000,
        "reward": 92000000
    },
    {
        "id": 73,
        "level": 73,
        "commission": 34,
        "point": 1920000000,
        "reward": 96000000
    },
    {
        "id": 74,
        "level": 74,
        "commission": 34,
        "point": 2000000000,
        "reward": 100000000
    },
    {
        "id": 75,
        "level": 75,
        "commission": 35,
        "point": 2080000000,
        "reward": 104000000
    },
    {
        "id": 76,
        "level": 76,
        "commission": 35,
        "point": 2160000000,
        "reward": 108000000
    },
    {
        "id": 77,
        "level": 77,
        "commission": 35,
        "point": 2240000000,
        "reward": 112000000
    },
    {
        "id": 78,
        "level": 78,
        "commission": 35,
        "point": 2320000000,
        "reward": 116000000
    },
    {
        "id": 79,
        "level": 79,
        "commission": 35,
        "point": 2400000000,
        "reward": 120000000
    },
    {
        "id": 80,
        "level": 80,
        "commission": 35,
        "point": 2480000000,
        "reward": 124000000
    },
    {
        "id": 81,
        "level": 81,
        "commission": 35,
        "point": 2560000000,
        "reward": 128000000
    },
    {
        "id": 82,
        "level": 82,
        "commission": 35,
        "point": 2640000000,
        "reward": 132000000
    },
    {
        "id": 83,
        "level": 83,
        "commission": 35,
        "point": 2720000000,
        "reward": 136000000
    },
    {
        "id": 84,
        "level": 84,
        "commission": 35,
        "point": 2800000000,
        "reward": 140000000
    },
    {
        "id": 85,
        "level": 85,
        "commission": 35,
        "point": 2880000000,
        "reward": 144000000
    },
    {
        "id": 86,
        "level": 86,
        "commission": 35,
        "point": 2960000000,
        "reward": 148000000
    },
    {
        "id": 87,
        "level": 87,
        "commission": 35,
        "point": 3040000000,
        "reward": 152000000
    },
    {
        "id": 88,
        "level": 88,
        "commission": 35,
        "point": 3120000000,
        "reward": 156000000
    },
    {
        "id": 89,
        "level": 89,
        "commission": 35,
        "point": 3200000000,
        "reward": 160000000
    },
    {
        "id": 90,
        "level": 90,
        "commission": 35,
        "point": 3280000000,
        "reward": 164000000
    }
] */
  let input = '{"Settings":' + JSON.stringify(sordData(siteInfoNew)) + "}";

  const saveObj = async (info) => {
    var _data = JSON.parse(info);
    var data = _data.Settings;

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
  };
  const confirmshutdown = async (data) => {
    MyConfirm("تایید تغییر  ", "", shutdown, data);
  };
  const shutdown = async (status) => {
    var data = { shutdown: !status };

    //console.log(data)
    //return false
    try {
      const res = await adminPostService(data, "shutdown");
      if (res.status == 200) {
        Alert("Done", "", "success");
      } else {
        Alert("متاسفم...!", res.data.message, "error");
      }
    } catch (error) {
      Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
    }
  };

  return (
    <>
      <div
        className="reportTable"
        style={{ height: "calc(100vh - 150px)", overflow: "auto" }}
      >
        <Button
          color={siteInfo.shutdown ? "green" : "red"}
          onClick={() => confirmshutdown(siteInfo.shutdown)}
        >
          {siteInfo.shutdown ? "Start Server" : "ShutDown Server"}
        </Button>
        <JsonEditor
          jsonObject={input}
          onChange={(output) => {
            saveObj(output);
          }}
        />
      </div>
    </>
  );
}

export default Admin;
