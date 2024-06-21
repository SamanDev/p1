import React from "react";
import { List } from "semantic-ui-react";
import { doCurrency, levelClassInside } from "../../const";
import LevelIcon from "../../utils/svg";

import LevelBar from "../../utils/LevelBar";
import LastRewardList from "./LastRewardList";
import LazyLoad from "react-lazyload";
const LevelList = (prop) => {
  var totalReward = 0;

  const siteInfo = prop.siteInfo;
  const loginToken = prop.loginToken;
  siteInfo?.levelUps?.sort((a, b) => (a.id > b.id ? 1 : -1));
  var lvls = [
    {
      "id": 70,
      "level": 70,
      "commission": 33,
      "point": 9000000000,
      "reward": 90000000
    },
    {
      "id": 77,
      "level": 77,
      "commission": 35,
      "point": 10400000000,
      "reward": 104000000
    },
    {
      "id": 53,
      "level": 53,
      "commission": 23,
      "point": 5600000000,
      "reward": 56000000
    },
    {
      "id": 61,
      "level": 61,
      "commission": 27,
      "point": 7200000000,
      "reward": 72000000
    },
    {
      "id": 25,
      "level": 25,
      "commission": 15,
      "point": 150000000,
      "reward": 4500000
    },
    {
      "id": 13,
      "level": 13,
      "commission": 12,
      "point": 20000000,
      "reward": 800000
    },
    {
      "id": 62,
      "level": 62,
      "commission": 29,
      "point": 7400000000,
      "reward": 74000000
    },
    {
      "id": 73,
      "level": 73,
      "commission": 34,
      "point": 9600000000,
      "reward": 96000000
    },
    {
      "id": 26,
      "level": 26,
      "commission": 15,
      "point": 166666666,
      "reward": 5000000
    },
    {
      "id": 18,
      "level": 18,
      "commission": 13,
      "point": 40000000,
      "reward": 1600000
    },
    {
      "id": 44,
      "level": 44,
      "commission": 20,
      "point": 3800000000,
      "reward": 38000000
    },
    {
      "id": 76,
      "level": 76,
      "commission": 35,
      "point": 10200000000,
      "reward": 102000000
    },
    {
      "id": 68,
      "level": 68,
      "commission": 32,
      "point": 8600000000,
      "reward": 86000000
    },
    {
      "id": 46,
      "level": 46,
      "commission": 20,
      "point": 4200000000,
      "reward": 42000000
    },
    {
      "id": 84,
      "level": 84,
      "commission": 35,
      "point": 11800000000,
      "reward": 118000000
    },
    {
      "id": 49,
      "level": 49,
      "commission": 21,
      "point": 4800000000,
      "reward": 48000000
    },
    {
      "id": 78,
      "level": 78,
      "commission": 35,
      "point": 10600000000,
      "reward": 106000000
    },
    {
      "id": 12,
      "level": 12,
      "commission": 12,
      "point": 17500000,
      "reward": 700000
    },
    {
      "id": 67,
      "level": 67,
      "commission": 31,
      "point": 8400000000,
      "reward": 84000000
    },
    {
      "id": 40,
      "level": 40,
      "commission": 18,
      "point": 1500000000,
      "reward": 30000000
    },
    {
      "id": 6,
      "level": 6,
      "commission": 11,
      "point": 2000000,
      "reward": 100000
    },
    {
      "id": 36,
      "level": 36,
      "commission": 17,
      "point": 1100000000,
      "reward": 22000000
    },
    {
      "id": 80,
      "level": 80,
      "commission": 35,
      "point": 11000000000,
      "reward": 110000000
    },
    {
      "id": 21,
      "level": 21,
      "commission": 14,
      "point": 83333333,
      "reward": 2500000
    },
    {
      "id": 43,
      "level": 43,
      "commission": 19,
      "point": 3600000000,
      "reward": 36000000
    },
    {
      "id": 71,
      "level": 71,
      "commission": 33,
      "point": 9200000000,
      "reward": 92000000
    },
    {
      "id": 51,
      "level": 51,
      "commission": 22,
      "point": 5200000000,
      "reward": 52000000
    },
    {
      "id": 31,
      "level": 31,
      "commission": 16,
      "point": 600000000,
      "reward": 12000000
    },
    {
      "id": 64,
      "level": 64,
      "commission": 30,
      "point": 7800000000,
      "reward": 78000000
    },
    {
      "id": 48,
      "level": 48,
      "commission": 21,
      "point": 4600000000,
      "reward": 46000000
    },
    {
      "id": 85,
      "level": 85,
      "commission": 35,
      "point": 12000000000,
      "reward": 120000000
    },
    {
      "id": 27,
      "level": 27,
      "commission": 15,
      "point": 200000000,
      "reward": 6000000
    },
    {
      "id": 79,
      "level": 79,
      "commission": 35,
      "point": 10800000000,
      "reward": 108000000
    },
    {
      "id": 66,
      "level": 66,
      "commission": 31,
      "point": 8200000000,
      "reward": 82000000
    },
    {
      "id": 1,
      "level": 1,
      "commission": 10,
      "point": 20000,
      "reward": 1000
    },
    {
      "id": 90,
      "level": 90,
      "commission": 35,
      "point": 13000000000,
      "reward": 130000000
    },
    {
      "id": 15,
      "level": 15,
      "commission": 13,
      "point": 25000000,
      "reward": 1000000
    },
    {
      "id": 4,
      "level": 4,
      "commission": 10,
      "point": 600000,
      "reward": 30000
    },
    {
      "id": 16,
      "level": 16,
      "commission": 13,
      "point": 30000000,
      "reward": 1200000
    },
    {
      "id": 10,
      "level": 10,
      "commission": 12,
      "point": 10000000,
      "reward": 500000
    },
    {
      "id": 72,
      "level": 72,
      "commission": 34,
      "point": 9400000000,
      "reward": 94000000
    },
    {
      "id": 17,
      "level": 17,
      "commission": 13,
      "point": 35000000,
      "reward": 1400000
    },
    {
      "id": 82,
      "level": 82,
      "commission": 35,
      "point": 11400000000,
      "reward": 114000000
    },
    {
      "id": 45,
      "level": 45,
      "commission": 20,
      "point": 4000000000,
      "reward": 40000000
    },
    {
      "id": 42,
      "level": 42,
      "commission": 19,
      "point": 3400000000,
      "reward": 34000000
    },
    {
      "id": 39,
      "level": 39,
      "commission": 18,
      "point": 1400000000,
      "reward": 28000000
    },
    {
      "id": 23,
      "level": 23,
      "commission": 14,
      "point": 116666666,
      "reward": 3500000
    },
    {
      "id": 69,
      "level": 69,
      "commission": 32,
      "point": 8800000000,
      "reward": 88000000
    },
    {
      "id": 47,
      "level": 47,
      "commission": 21,
      "point": 4400000000,
      "reward": 44000000
    },
    {
      "id": 28,
      "level": 28,
      "commission": 15,
      "point": 233333333,
      "reward": 7000000
    },
    {
      "id": 20,
      "level": 20,
      "commission": 14,
      "point": 50000000,
      "reward": 2000000
    },
    {
      "id": 3,
      "level": 3,
      "commission": 10,
      "point": 300000,
      "reward": 15000
    },
    {
      "id": 8,
      "level": 8,
      "commission": 11,
      "point": 6000000,
      "reward": 300000
    },
    {
      "id": 81,
      "level": 81,
      "commission": 35,
      "point": 11200000000,
      "reward": 112000000
    },
    {
      "id": 54,
      "level": 54,
      "commission": 24,
      "point": 5800000000,
      "reward": 58000000
    },
    {
      "id": 32,
      "level": 32,
      "commission": 16,
      "point": 700000000,
      "reward": 14000000
    },
    {
      "id": 38,
      "level": 38,
      "commission": 18,
      "point": 1300000000,
      "reward": 26000000
    },
    {
      "id": 22,
      "level": 22,
      "commission": 14,
      "point": 100000000,
      "reward": 3000000
    },
    {
      "id": 59,
      "level": 59,
      "commission": 26,
      "point": 6800000000,
      "reward": 68000000
    },
    {
      "id": 5,
      "level": 5,
      "commission": 11,
      "point": 1000000,
      "reward": 50000
    },
    {
      "id": 87,
      "level": 87,
      "commission": 35,
      "point": 12400000000,
      "reward": 124000000
    },
    {
      "id": 63,
      "level": 63,
      "commission": 29,
      "point": 7600000000,
      "reward": 76000000
    },
    {
      "id": 33,
      "level": 33,
      "commission": 16,
      "point": 800000000,
      "reward": 16000000
    },
    {
      "id": 37,
      "level": 37,
      "commission": 17,
      "point": 1200000000,
      "reward": 24000000
    },
    {
      "id": 9,
      "level": 9,
      "commission": 11,
      "point": 8000000,
      "reward": 400000
    },
    {
      "id": 60,
      "level": 60,
      "commission": 27,
      "point": 7000000000,
      "reward": 70000000
    },
    {
      "id": 89,
      "level": 89,
      "commission": 35,
      "point": 12800000000,
      "reward": 128000000
    },
    {
      "id": 58,
      "level": 58,
      "commission": 26,
      "point": 6600000000,
      "reward": 66000000
    },
    {
      "id": 2,
      "level": 2,
      "commission": 10,
      "point": 100000,
      "reward": 5000
    },
    {
      "id": 57,
      "level": 57,
      "commission": 25,
      "point": 6400000000,
      "reward": 64000000
    },
    {
      "id": 55,
      "level": 55,
      "commission": 24,
      "point": 6000000000,
      "reward": 60000000
    },
    {
      "id": 29,
      "level": 29,
      "commission": 15,
      "point": 266666666,
      "reward": 8000000
    },
    {
      "id": 83,
      "level": 83,
      "commission": 35,
      "point": 11600000000,
      "reward": 116000000
    },
    {
      "id": 65,
      "level": 65,
      "commission": 30,
      "point": 8000000000,
      "reward": 80000000
    },
    {
      "id": 19,
      "level": 19,
      "commission": 13,
      "point": 45000000,
      "reward": 1800000
    },
    {
      "id": 50,
      "level": 50,
      "commission": 22,
      "point": 5000000000,
      "reward": 50000000
    },
    {
      "id": 35,
      "level": 35,
      "commission": 17,
      "point": 1000000000,
      "reward": 20000000
    },
    {
      "id": 24,
      "level": 24,
      "commission": 14,
      "point": 133333333,
      "reward": 4000000
    },
    {
      "id": 56,
      "level": 56,
      "commission": 25,
      "point": 6200000000,
      "reward": 62000000
    },
    {
      "id": 52,
      "level": 52,
      "commission": 23,
      "point": 5400000000,
      "reward": 54000000
    },
    {
      "id": 74,
      "level": 74,
      "commission": 34,
      "point": 9800000000,
      "reward": 98000000
    },
    {
      "id": 41,
      "level": 41,
      "commission": 19,
      "point": 3200000000,
      "reward": 32000000
    },
    {
      "id": 11,
      "level": 11,
      "commission": 12,
      "point": 15000000,
      "reward": 600000
    },
    {
      "id": 86,
      "level": 86,
      "commission": 35,
      "point": 12200000000,
      "reward": 122000000
    },
    {
      "id": 7,
      "level": 7,
      "commission": 11,
      "point": 4000000,
      "reward": 200000
    },
    {
      "id": 75,
      "level": 75,
      "commission": 35,
      "point": 10000000000,
      "reward": 100000000
    },
    {
      "id": 14,
      "level": 14,
      "commission": 12,
      "point": 22500000,
      "reward": 900000
    },
    {
      "id": 34,
      "level": 34,
      "commission": 16,
      "point": 900000000,
      "reward": 18000000
    },
    {
      "id": 30,
      "level": 30,
      "commission": 16,
      "point": 333333333,
      "reward": 10000000
    },
    {
      "id": 88,
      "level": 88,
      "commission": 35,
      "point": 12600000000,
      "reward": 126000000
    }
  ]
  lvls?.sort((a, b) => (a.id > b.id ? 1 : -1));
  console.log(lvls)
  return (
    <span className="myaccount popupmenu">
      <span className="lazyarea">
        <List
          divided
          inverted
          verticalAlign="middle"
          className="myaccount"
          style={{ padding: "0 20px" }}
        >
          {siteInfo.levelUps.map((x, i) => {
            var x2 = 100000;
            var y = 1;
            if(i>9){x2 = 300000;y = -6;}
            if(i>19){x2 = 700000;y = -14;}
            if(i>29){x2 = 1500000;y = -22;}
            if(i>59){x2 = 3000000;y = -41;}
            if(i>69){x2 = 4000000;y = -48;}
            x.reward = ((i+y)*x2)
            totalReward += x.reward;
            lvls[i].reward = ((i+y)*x2);
            lvls[i].point = ((i+y)*x2)*20;
            
            return (
              <LazyLoad key={i} height={98} className="item">
                <List.Item
                  id={"lvl" + (i + 1)}
                  className={
                    loginToken?.level == x.level
                      ? "animated fadeIn"
                      : "animated fadeIn"
                  }
                >
                  <List.Content floated="right" className="rtl float-end ">
                    <span className="text-gold">{doCurrency(x.reward)} </span>
                    <span className="mysmall">
                      <small className="farsi">تومان پاداش</small>
                    </span>
                    <div className="mysmall">
                      <span className="text-gold">{x.commission}% </span>
                      <small className="farsi">ریک بک</small>
                      <br />
                      <span className="text-gold">{x.commission}% </span>
                      <small className="farsi">کمیسیون</small>
                      <div>
                        {doCurrency(totalReward)}{" "}
                        <small className="farsi mysmall">مجموع پاداش</small>
                      </div>
                    </div>
                  </List.Content>
                  <LevelIcon
                    level={x.level}
                    mode="levels"
                    text={"Level " + x.level}
                    classinside={levelClassInside(i)}
                    number={x.level}
                    width="38px"
                  />

                  {loginToken?.accessToken && (
                    <div className="levelbar">
                      {loginToken.level == i + 1 ? (
                        <>
                          <LevelBar progress {...prop} />
                        </>
                      ) : (
                        <>
                          {loginToken.level > i + 1 ? (
                            <>
                              <LevelBar val="100" progress {...prop} />
                            </>
                          ) : (
                            <>
                              <LevelBar val="0" {...prop} />
                            </>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </List.Item>
              </LazyLoad>
            );
          })}
          {console.log(lvls)}
        </List>
        <LazyLoad height={300}>
          <LastRewardList mode="levels" {...prop} />
        </LazyLoad>
      </span>
    </span>
    
  );
};

export default LevelList;
