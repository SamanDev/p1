import React from "react";
import { Progress, Icon } from "semantic-ui-react";

const Balance = (prop) => {
  const loginToken = prop.loginToken;
  const siteInfo = prop.siteInfo;
  siteInfo?.levelUps?.sort((a, b) => (a.id > b.id ? 1 : -1));
  var rules = siteInfo?.levelUps;
  if (loginToken?.accessToken && !loginToken?.logout) {
    if (loginToken.level == 0) {
      loginToken.level = 1;
    }
    var _lvlFinal = rules.filter((d) => d.level === loginToken.level);
    var lvlPercent = parseInt(
      (loginToken.levelPoint * 100) / _lvlFinal[0].point
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
