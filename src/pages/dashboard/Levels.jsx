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
            totalReward += x.reward;

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
        </List>
        <LazyLoad height={300}>
          <LastRewardList mode="levels" {...prop} />
        </LazyLoad>
      </span>
    </span>
  );
};

export default LevelList;
