import React, { useState, useEffect } from "react";
import { Segment, Tab } from "semantic-ui-react";
import Users from "./Users";
import Dashboard from "./dashboard";
import { Navigate } from "react-router-dom";

import Bankroll from "./income/Bankroll";
import Runner from "./user/runner";
import Winners from "./user/winner";
import Botlist from "./user/Botlist";
import Bots from "./user/Bots";
import Income from "./income/Income";
import GetwaysList from "./setting/GetwaysList";
import SiteCartsList from "./setting/SiteCartsList";
import User from "./user/User";
import Amj from "./Amjbank";

import Setting from "./JsonSetting";
import Requests from "./Requests";
import Notification from "./Notification";
import Invitation from "./Invitation.jsx";

import { adminGetService } from "../../services/admin";
import { haveAdmin, haveModerator, haveOperator, haveRoot } from "../../const";
import { useAdminTicket } from "../../hook/infoHook";
var panes = [];
const getGateways = JSON.parse(localStorage.getItem("getGateways"));
function Admin(prop) {
  const loginToken = prop.loginToken;
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadingtickets, tickets] = useAdminTicket(
    haveOperator(loginToken.roles)
  );
  const handleTabChange = (e, { activeIndex }) => setActiveIndex(activeIndex);
  const [tabData, setTabData] = useState([]);
  const [getwaysData, setGetwaysData] = useState([]);
  const handleGetGeteways = async () => {
    if (getGateways) {
      setGetwaysData(getGateways);
    } else {
      try {
        const res = await adminGetService("getGateways");
        if (res.status === 200) {
          var sorted = res.data?.sort((a, b) => (a.id > b.id ? 1 : -1));
          localStorage.setItem("getGateways", JSON.stringify(sorted));
          setGetwaysData(sorted);
        }
      } catch (error) {
        //console.log(error.message);
      }
    }
  };
  useEffect(() => {
    panes = [
      {
        menuItem: "Dashboard",
        pane: (
          <Tab.Pane key="Dashboard" inverted>
            <Dashboard
              addTabData={addTabData}
              addMainTabData={addMainTabData}
              handleGetGeteways={handleGetGeteways}
              addGatewayTabData={addGatewayTabData}
              removeTabData={removeTabData}
              getwaysList={getwaysData}
              search="username"
              searchValue=""
              {...prop}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Users",
        pane: (
          <Tab.Pane key="Users">
            <Users
              addTabData={addTabData}
              addMainTabData={addMainTabData}
              handleGetGeteways={handleGetGeteways}
              addGatewayTabData={addGatewayTabData}
              removeTabData={removeTabData}
              getwaysList={getwaysData}
              search="username"
              searchValue=""
              {...prop}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: "VGC Bank",
        pane: (
          <Tab.Pane key="VGCBank">
            <Amj
              addTabData={addTabData}
              addMainTabData={addMainTabData}
              handleGetGeteways={handleGetGeteways}
              addGatewayTabData={addGatewayTabData}
              removeTabData={removeTabData}
              getwaysList={getwaysData}
              search="username"
              searchValue=""
              {...prop}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Requests",
        pane: (
          <Tab.Pane key="Requests">
            <Requests
              addTabData={addTabData}
              addMainTabData={addMainTabData}
              setGetwaysData={setGetwaysData}
              addGatewayTabData={addGatewayTabData}
              removeTabData={removeTabData}
              tickets={tickets}
              loadingtickets={loadingtickets}
              {...prop}
            />
          </Tab.Pane>
        ),
      },
    ];
    if (haveModerator(loginToken.roles)) {
      panes.push({
        menuItem: "Income",
        pane: (
          <Tab.Pane key="Income">
            <Income
              addTabData={addTabData}
              addMainTabData={addBankrollTabData}
              handleGetGeteways={handleGetGeteways}
              addGatewayTabData={addGatewayTabData}
              removeTabData={removeTabData}
              getwaysList={getwaysData}
              search="username"
              searchValue=""
              {...prop}
            />
          </Tab.Pane>
        ),
        
      });
    }
    if (haveRoot(loginToken.roles)) {
      panes.push(
        {
          menuItem: "Invitation",
          pane: (
            <Tab.Pane key="Invitation">
              <Invitation
                addTabData={addTabData}
                addMainTabData={addMainTabData}
                setGetwaysData={setGetwaysData}
                addGatewayTabData={addGatewayTabData}
                removeTabData={removeTabData}
                {...prop}
              />
            </Tab.Pane>
          ),
        },
       
        {
          menuItem: "Settings",
          pane: (
            <Tab.Pane key="Setting">
              <Setting
                addTabData={addTabData}
                addMainTabData={addMainTabData}
                setGetwaysData={setGetwaysData}
                addGatewayTabData={addGatewayTabData}
                removeTabData={removeTabData}
                {...prop}
              />
            </Tab.Pane>
          ),
        }
      );
    }
  }, [loadingtickets]);
  useEffect(() => {
    if (activeIndex == 0) setTabData(panes);
    if (activeIndex == -1) {
      setActiveIndex(0);
    }
  }, [activeIndex, loadingtickets]);
  const addTabData = (username, getwaysList) => {
    var newPanes1 = panes;
    const result1 = newPanes1.filter(checkAdult1);

    function checkAdult1(item) {
      return item.pane.key != username + "profile";
    }

    var newPanes2 = result1;

    newPanes2.push({
      menuItem: username,
      pane: (
        <Tab.Pane
          key={username + "profile"}
          className="ui inverted segment"
          style={{ height: "calc(100vh - 150px)", overflow: "auto" }}
        >
          <User
            username={username}
            removeTabData={removeTabData}
            getwaysList={getwaysList}
            addTabData={addTabData}
            handleGetGeteways={handleGetGeteways}
            {...prop}
          />
        </Tab.Pane>
      ),
    });

    panes = newPanes2;
    setTabData(newPanes2);
    setActiveIndex(newPanes2.length - 1);
  };
  const addMainTabData = (mode) => {
    var newPanes1 = panes;
    const result1 = newPanes1.filter(checkAdult1);

    function checkAdult1(item) {
      return item.pane.key != mode;
    }

    var newPanes2 = result1;

    newPanes2.push({
      menuItem: mode,
      pane: (
        <Tab.Pane
          key={mode}
          className="ui inverted segment"
          style={{ height: "calc(100vh - 150px)", overflow: "auto" }}
        >
          {mode == "Winners" ? (
            <Winners
              addTabData={addTabData}
              setGetwaysData={setGetwaysData}
              removeTabData={removeTabData}
              search="refer"
              searchValue={mode}
            />
          ) : mode == "Runner" ? (
            <Runner
              addTabData={addTabData}
              setGetwaysData={setGetwaysData}
              removeTabData={removeTabData}
              search="refer"
              searchValue={mode}
            />
          ) : (
            <>
              <Botlist
                addTabData={addTabData}
                setGetwaysData={setGetwaysData}
                removeTabData={removeTabData}
                search="refer"
                searchValue={"bots"}
              />
               <Bots
            addTabData={addTabData}
            setGetwaysData={setGetwaysData}
            removeTabData={removeTabData}
            search="refer"
            searchValue={mode}
          />
            </>
          )}
         
        </Tab.Pane>
      ),
    });

    panes = newPanes2;
    setTabData(newPanes2);
    setActiveIndex(newPanes2.length - 1);
  };
  const addBankrollTabData = (mode) => {
    var newPanes1 = panes;
    const result1 = newPanes1.filter(checkAdult1);

    function checkAdult1(item) {
      return item.pane.key != mode;
    }

    var newPanes2 = result1;

    newPanes2.push({
      menuItem: mode,
      pane: (
        <Tab.Pane
          key={mode}
          className="ui inverted segment"
          style={{ height: "calc(100vh - 150px)", overflow: "auto" }}
        >
          <Bankroll
            addTabData={addTabData}
            setGetwaysData={setGetwaysData}
            removeTabData={removeTabData}
            search="refer"
            searchValue={mode}
          />
        </Tab.Pane>
      ),
    });

    panes = newPanes2;
    setTabData(newPanes2);
    setActiveIndex(newPanes2.length - 1);
  };
  const addGatewayTabData = (mode) => {
    var newPanes1 = panes;
    const result1 = newPanes1.filter(checkAdult1);

    function checkAdult1(item) {
      return item.pane.key != mode;
    }

    var newPanes2 = result1;

    newPanes2.push({
      menuItem: mode,
      pane: (
        <Tab.Pane
          key={mode}
          className="ui inverted segment"
          style={{ height: "calc(100vh - 150px)", overflow: "auto" }}
        >
          {mode == "Gateways" ? (
            <GetwaysList removeTabData={removeTabData} />
          ) : (
            <SiteCartsList removeTabData={removeTabData} />
          )}
        </Tab.Pane>
      ),
    });

    panes = newPanes2;
    setTabData(newPanes2);
    setActiveIndex(newPanes2.length - 1);
  };
  const removeTabData = (id) => {
    var newPanes = panes;
    const result = newPanes.filter(checkAdult);

    function checkAdult(item) {
      return item.pane.key != id;
    }
    panes = result;
    setActiveIndex(-1);
  };
  if (!haveAdmin(loginToken?.roles) && !haveOperator(loginToken?.roles)) {
    return <Navigate to="/" />;
  }

  return (
    <Segment inverted>
    
      <Tab
      menu={{ color:"black", inverted: true, pointing: true }}
        panes={tabData}
        activeIndex={activeIndex}
        renderActiveOnly={false}
        onTabChange={handleTabChange}
      />
    </Segment>
  );
}

export default Admin;
