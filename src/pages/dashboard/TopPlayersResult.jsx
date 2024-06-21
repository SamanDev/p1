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
      const res = await publicGetService("vip");
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
        <ul className="mm-listview menutitle-view">
          <li className="menutitle mm-listitem"></li>
        </ul>

        {Array.apply(0, Array(levelLeagueList.length)).map(function (x, i) {
          totalReward += levelLeagueReward(i);
          var _lvl = 20 - i;
          var _text = "Level " + (i + 1);
          if (i == 0) {
            _text = "HangOver";
            _lvl = 30;
          }
          return (
            <List.Item key={i} id={"lvl" + (i + 1)}>
              <List.Content floated="right" className="rtl">
                <span className="text-gold">{doCurrency(1000000)} </span>
                <span className="mysmall">
                  <small className="farsi">تومان پاداش</small>
                </span>
                <div className="mysmall">
                  {doCurrency(totalReward)}{" "}
                  <small className="farsi mysmall">مجموع پاداش</small>
                </div>
                <div className="mysmall">
                  {doCurrency(totalReward)}{" "}
                  <small className="farsi mysmall">امتیاز امروز</small>
                </div>
              </List.Content>
              <span style={{ float: "left" }}>
                <LevelIcon
                  mode="levels"
                  level="30"
                  text={_text}
                  classinside="iconinside0"
                  number=""
                  width="36px"
                />
              </span>
            </List.Item>
          );
        })}
      </>
    );
  }
};

export default LevelList;
