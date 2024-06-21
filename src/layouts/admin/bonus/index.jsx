import React, { useEffect } from "react";
import { Divider, List } from "semantic-ui-react";
import Bonus from "./bonus";

const BonusArea = (prop) => {
  const loginToken = prop.loginToken;
  var _bonuses = loginToken?.userGifts?.sort(function (a, b) {
    return a.id < b.id;
  });
  useEffect(() => {
    _bonuses = loginToken?.userGifts?.sort(function (a, b) {
      return a.id < b.id;
    });
  }, [loginToken?.userGifts]);
  return (
    <div style={{ margin: "5px 0 5px 0" }} className="bonuslist fadeoutend">
      {_bonuses.length > 0 && (
        <>
          <List divided inverted verticalAlign="middle">
            {_bonuses.map(function (bonus, i) {
              if (i <= 100) return <Bonus key={i} bonus={bonus} {...prop} />;
            })}
          </List>
          <Divider fitted />
        </>
      )}
    </div>
  );
};

export default BonusArea;
