import React, { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import { addDays } from "date-fns";
import $ from "jquery";

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
    return sum + currentValue.amount;
  }, 0);
};
function Admin(prop) {
  const [data, setData] = useState([]);
  const loginToken = prop.loginToken;

  const [getwaysList, setGetwaysData] = useState();

  const [startDate, setStartDate] = useState(addDays(new Date(), -24));
  const [endDate, setEndDate] = useState(addDays(new Date(), 1));
  const gettotal = (data, status, target, mode, i, gateway) => {
    var _data = data.filter(
      (d) =>
        parseInt(moment(d.createDate).date()) === parseInt(i) &&
        d.mode.toLowerCase() == mode.toLowerCase() &&
        d.status.toLowerCase() == status.toLowerCase()
    );
    if (gateway) {
      _data = _data.filter(
        (d) => d.gateway.toLowerCase() == gateway.toLowerCase()
      );
    }
    var _totalReward = 0;
    {
      _data.map((x, i) => {
        var _am = x.endBalance >= x.startBalance ? x.amount : x.amount * -1;
        _totalReward = _totalReward + _am;
      });
    }
    if (target == "total") return _totalReward;
    if (target == "count") return _data.length;
  };
  s;
  useEffect(() => {
    var filteredItems = prop.filteredItems;
    var _gmode = groupBy(filteredItems, "mode");

    for (const property in _gmode) {
      console.log(property + ": " + sumOf(_gmode[property]));
      var _ggateway = groupBy(_gmode[property], "gateway");
      console.log(_ggateway);
      for (const rec in _ggateway) {
        console.log(rec + ": " + sumOf(_ggateway[rec]));
      }
    }

    var tdata = [];
    var labels = [];
    var cvalues = [];
    var dusdt = [];
    var dbtc = [];
    var dvalues = [];
    var bvalues = [];
    var _s = moment(startDate);
    var _e = moment(endDate);
    var _d = _e.diff(_s, "days");

    for (let index = 0; index < _d; index++) {
      var _day = moment(_s).add(index, "days").format("MM-DD");
      var _dayX = moment(_s).add(index, "days").format("D");

      labels.push(_day);
      dvalues.push(gettotal(filteredItems, "Done", "total", "deposit", _dayX));
      cvalues.push(gettotal(filteredItems, "Done", "total", "cashout", _dayX));
      bvalues.push(gettotal(filteredItems, "Done", "total", "bonus", _dayX));
      dusdt.push(
        gettotal(filteredItems, "Done", "total", "deposit", _dayX, "USDT")
      );
      dbtc.push(
        gettotal(filteredItems, "Done", "total", "deposit", _dayX, "BTC")
      );
    }

    var data = {
      labels: labels,
      datasets: [
        {
          label: "Deposit",
          data: dvalues,
          borderColor: "#4f7543",
          backgroundColor: "#4f7543",
          tension: 0.3,
        },
        {
          label: "Cashout",
          data: cvalues,
          borderColor: "#c31f1f",
          backgroundColor: "#c31f1f",
          tension: 0.3,
        },
        {
          label: "Bonus",
          data: bvalues,
          backgroundColor: "#d98a00",
          borderColor: "#d98a00",
          tension: 0.3,
        },
        {
          type: "bar",
          label: "USDT",
          backgroundColor: "#4f7543",
          data: dusdt,
          tension: 0.3,
        },
        {
          type: "bar",
          label: "BTC",
          backgroundColor: "#dd9b28",
          data: dbtc,
          tension: 0.3,
        },
      ],
    };
    setGetwaysData(data);
  }, [prop.filteredItems]);
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
            stacked: true,
            title: {
              display: true,
            },
          },
          y: {
            display: true,
            stacked: true,
            title: {
              display: true,
            },
            suggestedMin: -10,
            suggestedMax: 200,
          },
        },
      },
    });
  }, [getwaysList]);

  return (
    <>
      <Segment>
        <div
          style={{
            width: "calc(80vw )",
            margin: "auto",
          }}
          id="chart"
        ></div>
      </Segment>
    </>
  );
}

export default Admin;
