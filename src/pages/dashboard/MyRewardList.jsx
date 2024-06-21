import React, { useEffect, useState } from "react";
import { List } from "semantic-ui-react";
import Reward from "../../utils/Reward";
import NoData from "../../utils/noData";
import { levelLeagueReward } from "../../const";
import MenuLoader from "../../utils/menuLoader";
import { getRewardsService } from "../../services/reward";
const LevelList = (prop) => {
  const loginToken = prop.loginToken;

  var _defUserID = "";
  var _defUser = "";
  if (loginToken) {
    _defUserID = loginToken.id;
    _defUser = loginToken.username;
  }
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const handleGetRewards = async () => {
    setLoading(true);
    try {
      const res = await getRewardsService(_defUserID, "", _defUser);
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
    handleGetRewards();
  }, []);
  var totalReward = 0;
  if (loading) {
    return (
      <>
        <MenuLoader />
      </>
    );
  } else {
    return (
      <>
        <ul
          className="mm-listview menutitle-view"
          style={{ position: "relative", top: -10 }}
        >
          <li>
            {data.length == 0 && !prop.pending && (
              <>
                <List.Item>
                  <List.Content>
                    <NoData msg="هیچ رکوردی یافت نشد." />
                  </List.Content>
                </List.Item>
              </>
            )}
            <div style={{ paddingLeft: 15 }}>
              {data
                .sort((a, b) => (a.date < b.date ? 1 : -1))
                .map((x, i) => {
                  totalReward += levelLeagueReward(i);

                  return (
                    <div className={"rewardname"} mode={x.mode} key={i}>
                      <Reward item={x} {...prop} color={true} />
                    </div>
                  );
                })}
            </div>
          </li>
        </ul>
      </>
    );
  }
};

export default LevelList;
