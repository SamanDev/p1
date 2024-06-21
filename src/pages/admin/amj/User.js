import React, { useEffect, useState } from "react";
import { Dimmer, Loader, Icon } from "semantic-ui-react";
import { Tab } from "semantic-ui-react";
import { adminGetService } from "../../../services/admin";
import TableAdmin from "../utils/table";
import Report from "../report/List";
import Not from "./Not";
import Reward from "./Reward";
import Tickets from "../support/List";
import Users from "../Users";
import { Alert } from "../../../utils/alerts";
import { adminPutService } from "../../../services/admin";
import { isJson, haveAdmin, haveModerator } from "../../../const";
const getGateways = JSON.parse(localStorage.getItem("getGateways"));
function getPathOfKey(object, keys, getwaysList) {
  var newO = JSON.parse(JSON.stringify(object));
  var newOb = {};
  newOb["user"] = newO;

  var finalObj = [];
  // finalObj.push({'user':newO})
  for (const x in newO) {
    if (keys.indexOf("," + x + ",") == -1) {
    } else {
      if (isJson(JSON.parse(JSON.stringify(newO[x])))) {
        var newO1 = JSON.parse(JSON.stringify(newO[x]));

        for (const y in newO1) {
          if (isJson(JSON.parse(JSON.stringify(newO1[y])))) {
            var newO2 = JSON.parse(JSON.stringify(newO1[y]));
            for (const z in newO2) {
              if (isJson(JSON.parse(JSON.stringify(newO2[z])))) {
              } else {
                if (z == "active") {
                  if (x == "cashierGateways") {
                    finalObj.push({
                      id: newO2["id"],
                      name: newO2["name"],

                      value: newO2[z],
                      user: newO,
                    });
                    newOb[newO2["name"]] = newO2[z];
                  }
                  if (x == "bankInfos") {
                    finalObj.push({
                      name: newO2["bankName"] + " - " + newO2["cardNumber"],
                      id: newO2["id"],
                      value: newO2[z],
                      user: newO,
                      card: newO2,
                    });
                    newOb[newO2["name"]] = newO2[z];
                  }
                }
              }
            }
          } else {
            if (y == "label") {
              finalObj.push({
                name: x,
                value: newO1[y],
                user: newO1["value"].toLowerCase(),
              });
              newOb[x] = newO1[y];
            }
          }
        }
      } else {
        finalObj.push({ name: x, value: newO[x], user: null });
        newOb[x] = newO[x];
      }
    }
  }
  var finalObj2 = JSON.parse(JSON.stringify(finalObj));
  var newOb2 = {};
  newOb2["final"] = finalObj2;
  getwaysList?.sort((a, b) => (a.id > b.id ? 1 : -1));
  getwaysList?.map(function (ways) {
    var blnIs = false;
    for (const y in finalObj2) {
      if (finalObj2[y].name == ways.name) {
        blnIs = true;
      }
    }
    if (!blnIs) {
      finalObj.push({
        id: ways.id,
        name: ways.name,

        value: false,
        user: newO,
      });
    }
  });
  finalObj?.sort((a, b) => (a.id > b.id ? 1 : -1));

  //finalObj.push({'data':newOb})

  return finalObj;
}
function getPathOfKey2(object, keys, getwaysList) {
  var newO = JSON.parse(JSON.stringify(object));
  var newOb = {};
  newOb["user"] = newO;

  var finalObj = [];
  // finalObj.push({'user':newO})
  for (const x in newO) {
    if (keys.indexOf("," + x + ",") == -1) {
    } else {
      if (isJson(JSON.parse(JSON.stringify(newO[x])))) {
        var newO1 = JSON.parse(JSON.stringify(newO[x]));
        finalObj.push({ name: x, value: newO1.length, user: newO });
        newOb[x] = newO[x];
      } else {
        finalObj.push({ name: x, value: newO[x], user: newO });
        newOb[x] = newO[x];
      }
    }
  }
  var finalObj2 = JSON.parse(JSON.stringify(finalObj));
  var newOb2 = {};
  newOb2["final"] = finalObj2;
  getwaysList?.sort((a, b) => (a.id > b.id ? 1 : -1));
  getwaysList?.map(function (ways) {
    var blnIs = false;
    for (const y in finalObj2) {
      if (finalObj2[y].name == ways.name) {
        blnIs = true;
      }
    }
    if (!blnIs) {
      finalObj.push({
        name: ways.name,

        value: false,
        user: newO,
      });
    }
  });
  finalObj.sort((a, b) => (a.name > b.name ? 1 : -1));
  //finalObj.push({'data':newOb})

  return finalObj;
}

function Admin(prop) {
  const [activeIndex, setActiveIndex] = useState(0);
  const loginToken = prop.loginToken;
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const handleGetReports = async () => {
    try {
      setLoading(true);
      const res = await adminGetService(
        "getUsersByAdmin?name=username&page=1&number=100&contain=false&value=" +
          prop.username
      );
      if (res.status === 200) {
        if (res.data.users.length > 0) {
          setUser(
            res.data.users.filter((item) => item.username == prop.username)[0]
          );
        } else {
          prop.removeTabData(prop.username + "profile");
        }
      }
    } catch (error) {
      prop.removeTabData(prop.username + "profile");
      //console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetReports();
  }, []);

  const handleTabChange = (e, { activeIndex }) => setActiveIndex(activeIndex);

  const updateUserObj = async (e, data) => {
    var _key = data.userkey;
    var _childid = data.childid;
    if (_childid && _key.indexOf("-") == -1) {
      _key = "GateWays";
    }
    if (_childid && _key.indexOf("-") > -1) {
      _key = "BankCards";
    }
    var curU = JSON.parse(JSON.stringify(data.user));
    var values = {
      id: curU.id,
      key: _key,
      childId: _childid,
      value: data.checked,
    };

    try {
      const res = await adminPutService(values, "updateUserByAdmin");
      if (res.status == 200) {
      } else {
        Alert("متاسفم...!", res.data.message, "error");
      }
    } catch (error) {
      Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
    }
  };

  if (loading) {
    return (
      <>
        <Dimmer active>
          <Loader size="large">Loading</Loader>
        </Dimmer>
      </>
    );
  }
  if (haveAdmin(loginToken.roles)) {
    var newdataInfo = [
      getPathOfKey2(
        user,
        ",username,level,balance,balance2,email,mobile,fullName,refer,firstLogin,lastLogin,bankInfos,cashierGateways,userBlock,userActivate,multiAccount,"
      ),
    ];
  }
  if (haveModerator(loginToken.roles)) {
    var newdataInfo = [
      getPathOfKey2(
        user,
        ",username,level,balance,balance2,fullName,refer,firstLogin,lastLogin,bankInfos,cashierGateways,"
      ),
    ];
  }
  var newdataBankInfo = [getPathOfKey(user, ",bankInfos,")];

  var newdataGetways = [getPathOfKey(user, ",cashierGateways,", getGateways)];
  var newdataInfoData = JSON.parse(JSON.stringify(newdataInfo));
  var newdatabankInfoData = JSON.parse(JSON.stringify(newdataBankInfo));
  var newdataGetwaysData = JSON.parse(JSON.stringify(newdataGetways));
  const openProfile = (user) => {
    prop.setUserProfile(user);
    prop.setUserOpen(true);
  };
  const panes = [
    {
      menuItem: user.username,
      render: () => (
        <Tab.Pane as="span">
          <Not user={user} />
          <TableAdmin
            data={newdataInfoData}
            getwaysList={getGateways}
            setActiveIndex={setActiveIndex}
            addTabData={prop.addTabData}
            removeTabData={prop.removeTabData}
            updateUserObj={updateUserObj}
          />
          <TableAdmin
            data={newdatabankInfoData}
            updateUserObj={updateUserObj}
          />
          <TableAdmin
            data={newdataGetwaysData}
            updateUserObj={updateUserObj}
            getwaysList={getGateways}
          />
        </Tab.Pane>
      ),
    },

    {
      menuItem: "Report",
      render: () => (
        <Tab.Pane as="span">
          <Report
            user={user}
            addTabData={prop.addTabData}
            removeTabData={prop.removeTabData}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Rewards",
      render: () => (
        <Tab.Pane as="span">
          <Reward
            user={user}
            mode="deposit"
            addTabData={prop.addTabData}
            removeTabData={prop.removeTabData}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Tickets",
      render: () => (
        <Tab.Pane as="span">
          <Tickets
            user={user}
            addTabData={prop.addTabData}
            removeTabData={prop.removeTabData}
          />
        </Tab.Pane>
      ),
    },

    {
      menuItem: "DownLine",
      render: () => (
        <Tab.Pane as="span">
          <Users {...prop} search="refer" searchValue={prop.username} />
        </Tab.Pane>
      ),
    },
  ];
  return (
    <>
      <h4>
        <Icon
          link
          name="close"
          onClick={() => {
            prop.removeTabData(user.username + "profile");
          }}
        />{" "}
        <span
          className="text-gold"
          onClick={() => {
            openProfile(user.username);
          }}
        >
          {user.username}
        </span>
      </h4>
      <Tab
        panes={panes}
        activeIndex={activeIndex}
        onTabChange={handleTabChange}
        menu={{
          color: "black",
          inverted: true,
          attached: false,
          tabular: false,
        }}
      />
    </>
  );
}

export default Admin;
