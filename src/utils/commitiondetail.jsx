import React, { useState } from "react";
import { Segment, Grid } from "semantic-ui-react";
import Bonus from "../layouts/admin/reffer/bonusget";
const moment = require("moment");

const depositArea = (prop) => {
  try {
    var desc = JSON.parse(prop.item);
  } catch (error) {
    return null;
  }
  var desc = JSON.parse(prop.item);

  const [user, setUser] = useState(desc);

  return (
    <div style={{ padding: "0px 5px" }} className={prop.className}>
      <Grid
        as={Segment}
        inverted
        size="mini"
        style={{ padding: "6px 0px", marginTop: 0 }}
      >{user && <> {user.map(function (use, i) {
        if (use.rake) return <Bonus key={i} user={use} {...prop} />;
      })}</>}
       
      </Grid>
    </div>
  );
};

export default depositArea;
