import React, { useEffect, useState } from "react";
import { Dimmer, Loader, Icon, Divider } from "semantic-ui-react";
import { Tab, Modal, Button } from "semantic-ui-react";
import { adminGetService } from "../../../services/admin";
import TableAdmin from "../utils/table";
import Report from "../report/List";
import Not from "./Not";
import Tickets from "../support/List";
import Reward from "../report/Gifts";
import Maven from "../report/Maven";
import Users from "../Users";
import { Alert } from "../../../utils/alerts";
import { MyConfirm } from "../../../utils/myAlert";
import { adminPutService, adminPostService } from "../../../services/admin";
import { isJson, haveAdmin, haveModerator, haveRoot } from "../../../const";
import AddCashier from "../AddCashier";

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
      if (finalObj2[y].name == ways.name || !ways.active) {
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
      if (finalObj2[y].name == ways.name || !ways.active) {
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
  const getGateways = JSON.parse(localStorage.getItem("getGateways"));
  const [activeIndex, setActiveIndex] = useState(0);
  const [cashierOpen, setCashierOpen] = React.useState(false);
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

  const confirmdeleteBankInfo = async (e, data) => {
    MyConfirm("تایید حذف", "", deleteBankInfo, data);
  };
  const confirmchangePass = async (data) => {
    MyConfirm("تایید تغییر کلمه عبور", "", changePass, data);
  };
  const changePass = async (data) => {
    var values = {
      username: data,
    };

    try {
      const res = await adminPostService(values, "changePassAdmin");
      if (res.status == 200) {
        Alert("Done!", res.data, "success");
      } else {
        Alert("متاسفم...!", res.data.message, "error");
      }
    } catch (error) {
      Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
    }
  };
  const deleteBankInfo = async (data) => {
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
      id: _childid,
    };

    try {
      const res = await adminPostService(values, "deleteUserBankInfo");
      if (res.status == 200) {
        Alert("Done!", "", "success");
      } else {
        Alert("متاسفم...!", res.data.message, "error");
      }
    } catch (error) {
      Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
    }
  };
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
        ",id,username,level,balance,balance2,email,mobile,fullName,refer,createDate,lastLogin,blockDateOut,inviteBlockDate,bankInfos,cashierGateways,userBlock,userActivate,multiAccount,totalDeposit,totalDeposit2,totalCashout,totalCashout2,totalCommission,totalCommission2,vipPlaySecond,totalPoint,levelPoint,dailyPoint,glevel,glevelSecond,"
      ),
    ];
  } else {
    if (haveModerator(loginToken.roles)) {
      var newdataInfo = [
        getPathOfKey2(
          user,
          ",id,username,level,balance,balance2,email,fullName,refer,createDate,lastLogin,bankInfos,cashierGateways,multiAccount,totalDeposit,totalDeposit2,totalCashout,totalCashout2,totalCommission,totalCommission2,vipPlaySecond,totalPoint,levelPoint,dailyPoint,glevel,glevelSecond,"
        ),
      ];
    }
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
            updateUserObj={confirmdeleteBankInfo}
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
      menuItem: "Maven",
      render: () => (
        <Tab.Pane as="span">
          <Maven
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
      <Modal
        onClose={() => setCashierOpen(false)}
        onOpen={() => setCashierOpen(true)}
        open={cashierOpen}
        size="large"
        style={{ height: "auto" }}
      >
        <AddCashier username={user.username} setCashierOpen={setCashierOpen} />
      </Modal>
      {haveRoot(loginToken.roles) && (
        <Button
          color="blue"
          className="float-end"
          disabled={!user.accessToken}
          onClick={() =>
            localStorage.setItem(user.username + "Token", JSON.stringify(user))
          }
        >
          Lginas
        </Button>
      )}

      <Button
        color="blue"
        className="float-end"
        onClick={() => setCashierOpen(true)}
      >
        Cashier
      </Button>
      <Button
        color="red"
        className="float-end"
        onClick={() => confirmchangePass(user.username)}
      >
        ChangePass
      </Button>

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
      <Divider />
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
