import React from "react";
import { Progress, Icon } from "semantic-ui-react";
const Balance = (prop) => {
  const loginToken = prop.loginToken;
  const siteInfo = prop.siteInfo;
  siteInfo?.galaxyPassSet?.sort((a, b) => (a.id > b.id ? 1 : -1));
  var rules = siteInfo?.galaxyPassSet[0];
  if (loginToken?.accessToken && !loginToken?.logout) {
    if (loginToken.glevel == 0) {
      loginToken.glevel = 1;
    }

    var lvlPercent = parseFloat(
      (loginToken.glevelSecond * 100) / (rules.hoursLimit * 3600)
    ).toFixed(2);
    if (lvlPercent > 100) {
      lvlPercent = 100;
    }
    if (prop.val == "0") {
      return null;
    }
    return (
      <>
        <Progress
          percent={prop.val ? prop.val : lvlPercent}
          disabled={prop.val ? true : false}
          inverted
          indicating
          size="tiny"
        />
        {!prop.val && <Icon as="small">%{lvlPercent}</Icon>}
        {prop.val == "0" && (
          <Icon as="small" className="text-muted" style={{ opacity: 0.5 }}>
            %0
          </Icon>
        )}
        {prop.val == "100" && <Icon name="check" color="green" />}
      </>
    );
  } else {
    return null;
  }
};

export default Balance;
