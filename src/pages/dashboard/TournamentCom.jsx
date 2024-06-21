import React, { useState } from "react";

import Tournament25 from "./TournamentVIP25";
import Tournament15 from "./TournamentVIP15";
import Tournament from "./Tournament";

import AccessMsg from "../../utils/accessMsg";

import { Divider, Header } from "semantic-ui-react";
const depositArea = (prop) => {
  const [refresh, setRefresh] = useState(false);
  const loginToken = prop.loginToken;

  if (loginToken?.accessToken && !loginToken?.logout) {
    return (
      <span className="myaccount popupmenu">
        {prop.title && (
          <>
            <Header
              as="h4"
              inverted
              className="farsi"
              style={{ marginTop: 10 }}
            >
              {prop.title}
            </Header>

            <Divider inverted section />
          </>
        )}
        {prop.cashMode === "vip25" && (
          <Tournament25 {...prop} setRefresh={setRefresh} list={true} />
        )}
        {prop.cashMode === "vip15" && (
          <Tournament15 {...prop} setRefresh={setRefresh} list={true} />
        )}
        {prop.cashMode === "2525" && (
          <Tournament {...prop} setRefresh={setRefresh} list={true} />
        )}
      </span>
    );
  } else {
    return <AccessMsg {...prop} />;
  }
};

export default depositArea;
