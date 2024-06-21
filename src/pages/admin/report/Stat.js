import React, { useEffect, useState } from "react";
import { doCurrency } from "../../../const";
import { addDays } from "date-fns";
import $ from "jquery";
import List from "./List";
import Chart from "chart.js/auto";
const moment = require("moment");

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
    try {
      var desc = JSON.parse(currentValue.description);
    } catch (error) {
      var desc = { dollarPrice: 50000 };
    }
    var _am =
      currentValue.endBalance != currentValue.startBalance
        ? currentValue.amount
        : currentValue.amount2 * desc.dollarPrice;
    if (_am < 0) {
      _am = _am*-1;
    }
    return sum + _am;
  }, 0);
};
const getChartColor = (name) => {
  var text = "blue";
  var _name = name.replace("Bonus ", "");
  switch (_name) {
    case "Cashout":
      text = "rgba(255, 0, 0, 1)";
      break;

    case "Deposit":
      text = "rgba(120, 255, 0, 1)";
      break;
    case "Transfer":
      text = "rgba(0, 0, 255, 1)";
      break;
    case "Bonus":
      text = "rgba(255, 170, 0, 1)";
      break;
    case "TotalIncome":
      text = "rgba(25, 170, 190, 1)";
      break;

    default:
      text = "green";
      break;
  }
  if (name.indexOf("Bonus ") > -1) {
    text = "rgba(255, 170, 0,0.3)";
  }
  if (name.indexOf("Transfer ") > -1) {
    text = "rgba(0,0,255,0.3)";
  }
  if (name.indexOf("Deposit ") > -1) {
    text = "rgba(0,255,0,0.3)";
  }
  if (name.indexOf("TotalIncome ") > -1) {
    text = "rgba(25, 170, 190,0.3)";
  }
  if (name.indexOf("Cashout ") > -1) {
    text = "rgba(255,0,0,0.3)";
  }
  return text;
};
var footerTxt = "";
function Admin(prop) {
  const [data, setData] = useState([]);
 
  const [dataSearch, setDataSearch] = useState("");
  if (prop?.user?.username) {
    var defmde = ["cashout", "deposit"];
  } else {
    var defmde = ["cashout", "deposit"];
  }

  const [dataMode, setDataMode] = useState(defmde);
  const [getwaysList, setGetwaysData] = useState();

  const [startDate, setStartDate] = useState(addDays(new Date(), -6));
  const [endDate, setEndDate] = useState(addDays(new Date(), 1));

  const filteredItems = data
    .sort((a, b) => (a.id < b.id ? 1 : -1))
    .filter(
      (item) =>
        item.status != "Canceled" &&
      (item.gateway != "AdminSystem" || dataSearch=="AdminSystem") &&
        (item.gateway || item.mode == "TotalIncome")
    );
 
  useEffect(() => {
    var labels = [];
    footerTxt = "";
    var _s = moment(startDate);
    var _e = moment(endDate);
    if (_s == _e) {
      _e = moment(_s).add("day", 1).format("YYYY-MM-DD");
    }
    var _d = _e.diff(_s, "days");
    for (let index = 0; index < _d; index++) {
      var _day = moment(_s).add(index, "days").format("MM-DD");

      labels.push(_day);
    }
    
    const getdays = (data) => {
      var _data = data;
      var newdata = [];

      for (let index = 0; index < _d; index++) {
        var i = moment(_s).add(index, "days").format("YYYY-MM-DD");
        var ffdata = _data.filter(
          (d) =>
            parseInt(moment(d.createDate.replace("-08:00", "")).date()) ===
              parseInt(moment(i).date()) &&
            parseInt(moment(d.createDate.replace("-08:00", "")).month()) ===
              parseInt(moment(i).month()) &&
            d.status == "Done"
        );
        //console.log(ffdata);
        newdata.push(sumOf(ffdata));
      }
      return newdata;
    };
    var _gmode = groupBy(filteredItems, "mode");
    var tdata = [];

    for (const property in _gmode) {
      tdata.push({
        label: property,
        data: getdays(_gmode[property]),
        borderColor: getChartColor(property),
        backgroundColor: getChartColor(property),
        tension: 0.2,
      });
      //console.log(property + ": " + sumOf(_gmode[property]));
      var _ggateway = groupBy(_gmode[property], "gateway");

      var oop = 0;
      if (dataMode.toString().indexOf(",") == -1 || 1 == 1) {
        for (const rec in _ggateway) {
          oop = oop + 50;
          tdata.push({
            type: "bar",
            label: rec,
            data: getdays(_ggateway[rec]),
            borderColor: getChartColor(property + " " + rec),
            backgroundColor: getChartColor(property + " " + rec),
          });
          footerTxt = footerTxt + " @ " + rec + " "+ property + " (" + (_ggateway[rec].length) + "): " + doCurrency(sumOf(_ggateway[rec])) + "  "
         
        }
      }footerTxt = footerTxt + " @ "
    }
    console.log(footerTxt);
    //console.log(tdata);
    var data = {
      labels: labels,
      datasets: tdata,
    };
    setGetwaysData(data);
  }, [data]);
  useEffect(() => {
    $("#chart").html("");
    $("#chart").append('<canvas id="acquisitions"></canvas>');
    new Chart(document.getElementById("acquisitions"), {
      type: "line",
      data: getwaysList,

      options: {
        responsive: true,

        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            display: true,

            title: {
              display: true,
            },
          },
          y: {
            display: true,
          },
        },
      },
    });
  }, [getwaysList]);
 
  const mychaty = (
    <div
      style={{
        width: "100%",
        margin: "auto",
      }}
      id="chart"
    ></div>
  );
  return (
    <>
      <List
        setData={setData}
        mychaty={mychaty}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        footer={footerTxt}
      />
    </>
  );
}

export default Admin;
