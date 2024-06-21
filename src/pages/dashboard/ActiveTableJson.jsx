import React, { useEffect, useState } from "react";
import { List, Statistic, Button } from "semantic-ui-react";
import { activeColorList, getEvent } from "../../const";
import { MyToastActive } from "../../utils/myAlert";
import { useActiveTable } from "../../hook/userHook";
import $ from "jquery";
const groupBy = (array, key) => {
  // Return the end result
  return array.reduce((result, currentValue) => {
    // If an array already present for key, push it to the array. Else create an array and push the object
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
    return result;
  }, {}); // empty object is the initial value for result object
};
const sumOf = (array) => {
  return array.reduce((sum, currentValue) => {
    var _am = currentValue.amount;
    return sum + _am;
  }, 0);
};

const ActiveTable = (prop) => {
  var _sortDataOld = [];

  var _sortD = [];
  try {
    _sortDataOld = JSON.parse(localStorage.getItem("activeTableSort"));
  } catch (error) {
    localStorage.removeItem("activeTableSort");
  }
  if (_sortDataOld == null) {
    _sortDataOld = [];
  }
  const loginToken = prop.loginToken;
  const siteInfo = prop.siteInfo;
  var _event = getEvent(siteInfo);
  siteInfo?.galaxyPassSet?.sort((a, b) => (a.id > b.id ? 1 : -1));
  var gpassrules = siteInfo?.galaxyPassSet[0];
  siteInfo?.vipTables?.sort((a, b) => (a.id > b.id ? 1 : -1));
  var viprules = siteInfo?.vipTables[0];
  siteInfo?.dailyLeagueSet?.sort((a, b) => (a.id > b.id ? 1 : -1));
  var leaguerules = siteInfo?.dailyLeagueSet[0];
  const [activeTable] = useActiveTable();

  const [fil, setFil] = useState("");
  const [_sortData, setSortData] = useState(_sortDataOld);
  const [_filterData, setFilterData] = useState([]);
  const GenTable = (x) => {
    var aarName = x.name.split(" ");
    return (
      <div className={"ui  inverted button  fluid"}>
        <Statistic
          horizontal
          inverted
          color={x.color}
          size="mini"
          style={{ width: "100%", display: "block" }}
        >
          <Statistic.Value className="left floated text-center fw-lighter">
            {aarName[0]}
            <div className="detail">{aarName[1]}</div>
          </Statistic.Value>
          <Statistic.Label
            style={
              x.status.indexOf("0/") > -1
                ? {
                    textTransform: "none",
                    filter: "grayscale(100%)",
                  }
                : { textTransform: "none" }
            }
            className="name left floated text-start"
          >
            {aarName[2]}
            <br />
            {_event == "VIP" &&
              parseInt(x.minstack / 20) >=
                parseInt(viprules.bigBlindLimit * 1000) && (
                <small className="text-gold fw-lighter">VIP Table</small>
              )}
            {_event == "GPass" &&
              parseInt(x.minstack / 20) >=
                parseInt(gpassrules.bigBlindLimit * 1000) && (
                <small className="text-gold fw-lighter">GPass Table</small>
              )}
            {_event == "League" && (
              <small className="text-gold fw-lighter">Daily League</small>
            )}
          </Statistic.Label>
          <Statistic.Value
            style={
              x.status.indexOf("0/") > -1 &&
              parseInt(x.minstack) > loginToken?.balance
                ? {
                    filter: "grayscale(100%)",
                  }
                : {}
            }
            className={
              x?.class == "update"
                ? "animated bounceIn text-end right floated lh-base"
                : "text-end right floated lh-base"
            }
          >
            {x.status.indexOf("0/") == -1 ? (
              <>{x.status}</>
            ) : (
              <>
                <small className="text-gold fw-lighter">Open</small>
              </>
            )}
          </Statistic.Value>
        </Statistic>
      </div>
    );
  };
  useEffect(() => {
    if (activeTable.RingGames) {
      {
        Array.apply(0, Array(activeTable?.RingGames)).map(function (x, i) {
          if (
            activeTable.Status[i].indexOf("Waiting: 0/") > -1 ||
            activeTable.Status[i].indexOf("Waiting: 1/") > -1 ||
            activeTable.Status[i].indexOf("Playing") > -1
          ) {
            var _p = activeTable.Status[i].split(": ")[1].split("/")[0];
            var strColor = "#cbff2c";
            strColor =
              activeColorList[parseInt(activeTable.Name[i].split(" ")[0])];

            if (
              _sortDataOld.filter((d) => d.name == activeTable.Name[i])
                .length == 0
            ) {
              _sortD.push({
                name: activeTable.Name[i],
                color: strColor,
                status: _p + "/" + activeTable.Seats[i],
                minstack: activeTable.BuyInMin[i],
                stack: activeTable.SmallBlind[i] + activeTable.BigBlind[i],
                blind:
                  activeTable.SmallBlind[i] + "/" + activeTable.BigBlind[i],
                class: " bounceIn " + strColor,
              });
            } else {
              if (
                _sortDataOld.filter(
                  (d) =>
                    d.name == activeTable.Name[i] &&
                    d.status == _p + "/" + activeTable.Seats[i]
                ).length == 0
              ) {
                _sortD.push({
                  name: activeTable.Name[i],
                  color: strColor,
                  status: _p + "/" + activeTable.Seats[i],
                  minstack: activeTable.BuyInMin[i],
                  stack: activeTable.SmallBlind[i] + activeTable.BigBlind[i],
                  blind:
                    activeTable.SmallBlind[i] + "/" + activeTable.BigBlind[i],
                  class: "update",
                });
              } else {
                _sortD.push({
                  name: activeTable.Name[i],
                  color: strColor,
                  status: _p + "/" + activeTable.Seats[i],
                  minstack: activeTable.BuyInMin[i],
                  stack: activeTable.SmallBlind[i] + activeTable.BigBlind[i],
                  blind:
                    activeTable.SmallBlind[i] + "/" + activeTable.BigBlind[i],
                  class: strColor,
                });
              }
            }
          }
        });
      }
      if (_sortD.length > 0) {
        _sortD.sort((a, b) => (a.stack < b.stack ? 1 : -1));
        setSortData(_sortD);
        localStorage.setItem("activeTableSort", JSON.stringify(_sortD));
      }
    }
  }, [activeTable]);
  useEffect(() => {
    if (_sortData.length > 0) {
      var _data = _sortData;
      if (fil != "") {
        _data = _data.filter((d) => d.name.indexOf(fil) !== -1);
      }
      var _g = groupBy(_data, "minstack");
      _sortD = [];
      for (const property in _g) {
        _g[property].sort((a, b) => (a.status < b.status ? 1 : -1));
        _g[property]?.map(function (x, i) {
          if (x.status.indexOf("0/") == -1 || i == 0) {
            _sortD.push(x);
          }
        });
      }
      _sortD.sort((a, b) => (a.name < b.name ? 1 : -1));

      setFilterData(_sortD);
    }
  }, [_sortData, fil]);

  useEffect(() => {
    _filterData?.map(function (x, i) {
      var aarName = x.name.split(" ");

      if (
        x.minstack < loginToken?.balance &&
        x.status.indexOf("1/") > -1 &&
        x?.class.indexOf("update") > -1 &&
        x.name.indexOf(fil) !== -1 &&
        !prop.activePanel
      ) {
        MyToastActive(x, prop.handleOpenTable);
      }
    });
  }, [_filterData]);

  return (
    <>
      <div
        className="step1-2"
        style={{
          padding: 10,
          borderBottom: "1px solid gray",
          background: "#333",
        }}
      >
        <Button.Group widths="3" size="mini">
          <Button
            onClick={() => {
              setFil("");
            }}
            active={fil == "" ? true : false}
            color={fil == "" ? "red" : "grey"}
            basic
            inverted
          >
            All
          </Button>
          <Button
            onClick={() => {
              setFil("HO");
            }}
            active={fil == "HO" ? true : false}
            color={fil == "HO" ? "yellow" : "grey"}
            inverted
            basic
          >
            Holdem
          </Button>
          <Button
            active={fil == "OM" ? true : false}
            color={fil == "OM" ? "yellow" : "grey"}
            inverted
            basic
            onClick={() => {
              setFil("OM");
            }}
          >
            Omaha
          </Button>
        </Button.Group>
        {/* <Button.Group widths="3" size="mini">
          <Button
            onClick={() => {
              setFil("");
            }}
            active={fil == "" ? true : false}
            color={fil == "" ? "red" : "grey"}
            basic
            inverted
          >
            All
          </Button>
          <Button
            onClick={() => {
              setFil("HO");
            }}
            active={fil == "HO" ? true : false}
            color={fil == "HO" ? "yellow" : "grey"}
            inverted
            basic
          >
            Holdem
          </Button>
          <Button
            active={fil == "OM" ? true : false}
            color={fil == "OM" ? "yellow" : "grey"}
            inverted
            basic
            onClick={() => {
              setFil("OM");
            }}
          >
            Omaha
          </Button>
        </Button.Group> */}
      </div>
      <List
        divided
        inverted
        relaxed
        verticalAlign="middle"
        className="activetable step1-1"
      >
        {_filterData.length == 0 ? (
          <List.Item className="text-center">
            <div className={"nodata"}>No active table avaliable now</div>
          </List.Item>
        ) : (
          <>
            {_filterData?.map(function (x, i) {
              var minstack = 1000000;
              if (loginToken?.balance) {
                minstack = loginToken?.balance * 2;
              }
              if (minstack < 1000000) {
                minstack = 1000000;
              }
              if (x.minstack < minstack || x.status.indexOf("0/") == -1) {
                return (
                  <List.Item
                    key={i}
                    id={"lvl" + (i + 1)}
                    as="div"
                    className={
                      x.minstack > loginToken?.balance
                        ? "tablename  " + x?.class
                        : "tablename " + x?.class
                    }
                    onClick={() => {
                      prop.handleOpenTable(x.name);
                      if (
                        $(".swal2-container").html() == "" ||
                        $(".swal2-container").length == 0
                      ) {
                        //MyToastActive(x, prop.handleOpenTable);
                      }
                      $("#nav-icon1.open:visible").parent().trigger("click");
                    }}
                  >
                    {GenTable(x)}
                  </List.Item>
                );
              }
            })}
          </>
        )}
      </List>
    </>
  );
};

export default ActiveTable;
