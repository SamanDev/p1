import React from "react";
import { List,Segment } from "semantic-ui-react";
import { doCurrency, levelDataInfo } from "../../const";
import GiftsDesc from "../../utils/GiftsDesc";
import GalaxyIcon from "../../utils/svganim";
import ConfettiArea from "../../utils/partymenu";
import BonusArea from "../../layouts/admin/bonus/index.jsx";
import LevelIcon from "../../utils/svg";
import LazyLoad from "react-lazyload";
import LastRewardList from "./LastRewardList";
import LevelBar from "../../utils/GiftLevelBar";
const LevelList = (prop) => {
  const loginToken = prop.loginToken;
  const siteInfo = prop.siteInfo;
  return (
    <span className="myaccount popupmenu">
      <span className="lazyarea">
        <ConfettiArea recycle={false} numberOfPieces="50" />
        
        <List
          divided
          inverted
          verticalAlign="middle"
          className="myaccount"
          style={{ padding: "0 20px" }}
        >
          <List.Item>
            <List.Content className="rtl text-center">
            
            <div style={{direction:"ltr",textAlign:"center"}}>
                <GalaxyIcon
                  mode="gifts"
                  level="1"
                  text="Galaxy Gifts"
                  classinside="iconinside0"
                  number="1"
                  width="60px"
                  amin="inline animated swing fast"
                  iconamin="swing inline animated"
                />
                <Segment inverted basic >
                  <p className="farsi mywrap lh-lg">برای دریافت هدیه باید <span className="text-gold">{siteInfo.secondForGift/60} دقیقه</span> روی میزهای گلکسی بازی نمایید.</p>
                <div className="giftlevelbar"><LevelBar progress {...prop} /></div></Segment>
                
              </div>
            </List.Content>
          </List.Item>

          <List.Item>
            <List.Content className="rtl text-center">
              <GiftsDesc
                desc={
                  <>
                    <div style={{ float: "right", margin: "0 10px" }}>
                      <LevelIcon
                        mode="gift3"
                        level="1"
                        text="Gold Gift"
                        classinside="iconinside0"
                        number="1"
                        width="60px"
                        amin="inline animated swing fast"
                        iconamin="swing inline animated"
                      />
                    </div>
                    <div
                      style={{
                        height: 80,
                        textAlign: "center",
                        lineHeight: "40px",
                      }}
                    >
                      مخصوص بازیکنان
                      <br /> لول {levelDataInfo[4].minLevel} و بالاتر
                    </div>
                  </>
                }
                subtitle={
                  <>
                    <br />
                    از{" "}
                    <span className="text-gold">
                      {doCurrency(levelDataInfo[4].minAmount)}
                    </span>{" "}
                    تا{" "}
                    <span className="text-gold">
                      {doCurrency(levelDataInfo[4].maxAmount)}
                    </span>
                  </>
                }
                title={<>هدیه طلایی</>}
              />
              <GiftsDesc
                desc={
                  <>
                    <div style={{ float: "right", margin: "0 10px" }}>
                      <LevelIcon
                        mode="gift2"
                        level="1"
                        text="Purple Gift"
                        classinside="iconinside0"
                        number="1"
                        width="60px"
                        amin="inline animated swing fast"
                        iconamin="swing inline animated"
                      />
                    </div>
                    <div
                      style={{
                        height: 80,
                        textAlign: "center",
                        lineHeight: "40px",
                      }}
                    >
                      مخصوص بازیکنان
                      <br /> لول {levelDataInfo[5].minLevel} تا{" "}
                      {levelDataInfo[5].maxLevel}
                    </div>
                  </>
                }
                subtitle={
                  <>
                    <br />
                    از{" "}
                    <span className="text-gold">
                      {doCurrency(levelDataInfo[5].minAmount)}
                    </span>{" "}
                    تا{" "}
                    <span className="text-gold">
                      {doCurrency(levelDataInfo[5].maxAmount)}
                    </span>
                  </>
                }
                title={<>هدیه بنفش</>}
              />
              <GiftsDesc
                desc={
                  <>
                    <div style={{ float: "right", margin: "0 10px" }}>
                      <LevelIcon
                        mode="gift1"
                        level="1"
                        text="Red Gift"
                        classinside="iconinside0"
                        number="1"
                        width="60px"
                        amin="inline animated swing fast"
                        iconamin="swing inline animated"
                      />
                    </div>
                    <div
                      style={{
                        height: 80,
                        textAlign: "center",
                        lineHeight: "40px",
                      }}
                    >
                      مخصوص بازیکنان
                      <br /> لول {levelDataInfo[6].maxLevel} و پایین تر
                    </div>
                  </>
                }
                subtitle={
                  <>
                    <br />
                    از{" "}
                    <span className="text-gold">
                      {doCurrency(levelDataInfo[6].minAmount)}
                    </span>{" "}
                    تا{" "}
                    <span className="text-gold">
                      {doCurrency(levelDataInfo[6].maxAmount)}
                    </span>
                  </>
                }
                title={<>هدیه قرمز</>}
              />
            </List.Content>
          </List.Item>
        </List>
        {loginToken?.accessToken &&
          !loginToken?.logout &&
          loginToken?.refer != "runner"  && loginToken?.refer != "bots" && (
            <LazyLoad height={300}>
              <ul className="mm-listview">
                <li className="menutitle mm-listitem"></li>
                <li className="menutitle mm-listitem">
                  <span className="mm-listitem__text"> جوایز من</span>
                </li>
              </ul>
              <div style={{ padding: "0 15px" }}>
                <BonusArea {...prop} />
              </div>
            </LazyLoad>
          )}

        <LazyLoad height={300}>
          <LastRewardList mode="gift" {...prop} />
        </LazyLoad>
      </span>
    </span>
  );
};

export default LevelList;
