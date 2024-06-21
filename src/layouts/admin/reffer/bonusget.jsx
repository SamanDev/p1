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
    <Grid.Row style={{ paddingTop: 0 }}>
      <Grid.Column width={8}>
        <div style={{ marginLeft: 20 }}>{loginToken.username}</div>
      </Grid.Column>
      <Grid.Column width={8} textAlign="right">
        <div className="farsi">
          <span className="text-gold">{doCurrency(loginToken.rake)}</span>{" "}
        </div>
      </Grid.Column>
    </Grid.Row>
  );
};

export default BonusArea;
