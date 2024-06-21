import React, { useEffect, useState } from "react";
import { List } from "semantic-ui-react";
import Reward from "../../utils/Reward";
import MenuLoader from "../../utils/menuLoader";
import { getRewardsService } from "../../services/reward";
import RewardStat from "./rewardStat";
import LazyLoad from "react-lazyload";
import NoData from "../../utils/noData";
const LevelList = (prop) => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const handleGetRewards = async () => {
    setLoading(true);
    try {
      const res = await getRewardsService(
        "",
        prop.mode,
        "",
        prop.mode == "levels" ? 500 : 500
      );
      if (res.status === 200) {
        setData(res.data.filter((d) => d.amount>0 ||d.amount2>0 ).sort((a, b) => (a.date < b.date ? 1 : -1)));
        setLoading(false);
      }
    } catch (error) {
      ////console.log(error.message);
    }
  };

  useEffect(() => {
    handleGetRewards();
  }, []);
  var totalReward = 0;
  if (loading && data.length == 0) {
    return (
      <>
        <ul className="mm-listview">
          <li className="menutitle mm-listitem"></li>
          <li className="menutitle mm-listitem">
            <span className="mm-listitem__text">آخرین جوایز</span>
          </li>
        </ul>
        <MenuLoader />
      </>
    );
  } else {
    return (
      <>
        <ul className="mm-listview ">
          <li className="menutitle mm-listitem"></li>

          <li className="menutitle mm-listitem">
            <span className="mm-listitem__text">آخرین جوایز</span>
          </li>

          <div className={"animated fadeIn"}>
            <RewardStat lastReward={data} />
          </div>
        </ul>
        <List divided inverted verticalAlign="middle" className="myaccount">
          {data.length == 0 && (
            <>
              <List.Item>
                <List.Content>
                  <NoData msg="هیچ رکوردی یافت نشد." />
                </List.Content>
              </List.Item>
            </>
          )}

          <div style={{ padding: "0 5px 0 20px" }}>
            {data.map((x, i) => {
              var _lvl = 20 - i;
              var _text = x.username;

              return (
                <LazyLoad height={98} throttle={30} overflow key={i}>
                  <div className={"rewardname animated fadeIn"} mode={x.mode}>
                    <Reward item={x} {...prop} color={true} />
                  </div>
                </LazyLoad>
              );
            })}
          </div>
        </List>
      </>
    );
  }
};

export default LevelList;
