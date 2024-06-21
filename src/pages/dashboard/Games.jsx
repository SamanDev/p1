import React from "react";
import { List } from "semantic-ui-react";
import { gameData } from "../../const";
import LazyLoad from "react-lazyload";
import GameBox from "../../utils/GameBox";
const LevelList = (prop) => {
  var totalReward = 0;

  const siteInfo = prop.siteInfo;
  const loginToken = prop.loginToken;
  siteInfo?.galaxyPassSet?.sort((a, b) => (a.id > b.id ? 1 : -1));
  var rules = siteInfo?.galaxyPassSet[0];
  return (
    <span className="myaccount popupmenu">
      <span className="lazyarea">
        <List
          inverted
          verticalAlign="middle"
          className="myaccount"
          style={{ padding: "0 20px" }}
        >
          {gameData.map((submenu, i) => {
            return (
              <LazyLoad key={i} height={130}>
                <div
                  id={"open" + submenu}
                  as="a"
                  onClick={() => {
                    prop.closeMenu();
                    prop.navigate("/games/" + submenu);
                  }}
                  style={{ padding: 0, paddingBottom: 15, overflow: "hidden" }}
                  className="mm-btn  mm-listitem__btn mm-listitem__text animated fadeIn"
                >
                  <GameBox game={submenu} height="120px" />
                </div>
              </LazyLoad>
            );
          })}
        </List>
      </span>
    </span>
  );
};

export default LevelList;
