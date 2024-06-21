import React from "react";
import { List } from "semantic-ui-react";
import AccessMsg from "../../utils/accessMsg";
import MyRewardList from "./MyRewardList";
const LevelList = (prop) => {
  const loginToken = prop.loginToken;
  if (loginToken?.accessToken && !loginToken?.logout) {
    return (
      <span className="myaccount popupmenu">
        <List divided inverted verticalAlign="middle" className="myaccount">
          <MyRewardList {...prop} />
        </List>
      </span>
    );
  } else {
    return <AccessMsg {...prop} />;
  }
};

export default LevelList;
