import React, { useEffect, useState } from "react";
import { List } from "semantic-ui-react";

import { doCurrency, levelLeagueReward, levelLeagueList } from "../../const";
import LevelIcon from "../../utils/svg";
import MenuLoader from "../../utils/menuLoader";
import { publicGetService } from "../../services/public";
const LevelList = () => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const handleGetReports = async () => {
    setLoading(true);
    try {
      const res = await publicGetService("league");
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      //console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //handleGetReports();
  }, []);
  var totalReward = 0;
  if (loading) {
    return <MenuLoader />;
  } else {
    return (
      <>
        {Array.apply(0, Array(levelLeagueList.length)).map(function (x, i) {
          totalReward += levelLeagueReward(i);
          var _lvl = i + 1;
          var _text = "Level " + (i + 1);
          if (i == 0) {
            _text = "HangOver";
            _lvl = 30;
          }
          return (
            <List.Item key={i} id={"lvl" + (i + 1)}>
              <List.Content floated="right" className="rtl">
                <span className="text-gold">
                  {doCurrency(levelLeagueReward(i))}{" "}
                </span>
                <span className="mysmall">
                  <small className="farsi">تومان پاداش</small>
                </span>
                <div className="mysmall">
                  {doCurrency(totalReward)}{" "}
                  <small className="farsi mysmall">امتیاز امروز</small>
                </div>
              </List.Content>
              <span style={{ float: "left" }}>
                <LevelIcon
                  mode="league"
                  level={i + 1}
                  text={"Place " + (i + 1)}
                  classinside="iconinside0"
                  number=""
                  width="36px"
                  iconamin="swing"
                />
              </span>
              <div
                style={{
                  position: "relative",
                  left: -50,
                  transform: "scale(.8)",
                }}
              ></div>
            </List.Item>
          );
        })}
      </>
    );
  }
};

export default LevelList;
