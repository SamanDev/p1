import React from "react";
import { Grid } from "semantic-ui-react";
import LevelIcon from "../../../utils/svg";
import { doCurrency, levelClassInside } from "../../../const";
import { convertDateToJalali } from "../../../utils/convertDate";
import $ from "jquery";
const moment = require("moment");

const openDeposit = () => {
  $("#opendeposit").trigger("click");
};

const BonusArea = (prop) => {
  const loginToken = prop.user;
  const siteInfo = prop.siteInfo;

  var _lvl = loginToken.level;
  return (
    <Grid.Row style={{ paddingBottom: 0 }}>
      <Grid.Column width={6} style={{ margin: 0 }}>
        <div style={{ marginLeft: 10 }}>
          <LevelIcon
            level={_lvl}
            number={_lvl}
            mode={"levels"}
            text={loginToken.username}
            classinside={levelClassInside(_lvl - 1)}
            width="36px"
          />
        </div>
      </Grid.Column>
      <Grid.Column width={10} textAlign="right">
        <div className="farsi">آخرین ورود</div>

        {convertDateToJalali(loginToken.lastLogin)}
      </Grid.Column>
    </Grid.Row>
  );
};

export default BonusArea;
