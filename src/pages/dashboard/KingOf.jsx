import React from "react";
import { List } from "semantic-ui-react";
import GalaxyIcon from "../../utils/svganim";
import TopPlayerResult from "./TopPlayersResult";
const LevelList = () => {
  var totalReward = 0;
  return (
    <span className="myaccount popupmenu">
      <List divided inverted verticalAlign="middle" className="myaccount">
        <List.Item>
          <List.Content className=" text-center">
            <GalaxyIcon
              mode="kingof"
              level=""
              text="King of Tournaments"
              classinside="iconinside0"
              number=""
              width="60px"
              amin="inline animated flipInY"
              iconamin=""
            />
          </List.Content>
        </List.Item>
        <TopPlayerResult />
      </List>
    </span>
  );
};

export default LevelList;
