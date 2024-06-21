import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Segment,
  Button,
  Dimmer,
  Loader,
  Icon,
  Modal,
  Statistic,
  Divider,
} from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { addDays } from "date-fns";
import { convertDateToJalali } from "../../../utils/convertDate";
const moment = require("moment");
import { adminGetService } from "../../../services/admin";
import { rateService } from "../../../services/cashier";
import DateReng from "../utils/dateReng";

import { doCurrency } from "../../../const";

function Admin(prop) {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const getRate = localStorage.getItem("getRate");
  const getbtcRate = localStorage.getItem("getbtcRate");
  const [btcrate, setBtcRate] = useState(getbtcRate || 50000);
  const [rate, setRate] = useState(getRate || 50000);

  const handleGetRate = async () => {
    try {
      const res = await rateService();
      if (res.status === 200) {
        localStorage.setItem("getRate", res.data);
        setRate(res.data);
      }
    } catch (error) {
      //console.log(error.message);
    }
  };
  const handleGetBTCRate = async () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var result = JSON.parse(this.responseText)["data"][1]["quotes"]["USD"][
          "price"
        ];
        localStorage.setItem("getbtcRate", result);
        setBtcRate(result);
      }
    };
    xhttp.open(
      "GET",
      "https://api.alternative.me/v2/ticker/?convert=USD",
      true
    );
    xhttp.send();
  };
  const fetchUsers = async () => {
    setLoading(true);
    try {
      var res;

      res = await adminGetService(`getBankRoll`);

      if (res.status === 200) {
        setData(res.data);
        console.log(res.data);
      }
    } catch (error) {
      //console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetBTCRate();
    handleGetRate();
    fetchUsers(); // fetch page 1 of users
  }, []);

  if (loading) {
    return (
      <>
        <Segment
          basic
          style={{ height: "calc(100vh - 150px)", overflow: "auto" }}
        >
          <Dimmer active inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>
        </Segment>
      </>
    );
  }
  var btc = parseInt(data.btc * btcrate * rate);
  var usdt = parseInt(data.usdt * rate);
  var perfectMoney = parseInt(data.perfectMoney * rate);
  var vgc = parseInt(data.bank);
  var total = btc + usdt + vgc + perfectMoney;

  var totalchips =
    data.totalPlayers +
    parseInt(data.totalPlayers2 * rate) +
    parseInt(data.ringGame) +
    parseInt(data.ringGame2 * rate) +
    parseInt(data.finalTotal) +
    parseInt(data.finalTotal2 * rate) -
    data.pendingCashout;
  return (
    <>
      <Statistic.Group
        color="red"
        horizontal
        size="mini"
        className="bankroll"
        style={{ float: "left", minWidth: 500 }}
      >
        <Statistic color="olive" inverted>
          <Statistic.Value>{doCurrency(data.totalPlayers)}</Statistic.Value>
          <Statistic.Label>Players Bank</Statistic.Label>
        </Statistic>
        <Statistic color="olive" inverted>
          <Statistic.Value>
            {doCurrency(parseInt(data.totalPlayers2 * rate))}
          </Statistic.Value>
          <Statistic.Label>
            Players Bank2
            <br />
            <b>{doCurrency(parseInt(data.totalPlayers2))}$</b>
          </Statistic.Label>
        </Statistic>
        <Statistic color="orange" inverted>
          <Statistic.Value>{doCurrency(data.ringGame)}</Statistic.Value>
          <Statistic.Label>On Ring Games</Statistic.Label>
        </Statistic>
        <Statistic color="orange" inverted>
          <Statistic.Value>
            {doCurrency(parseInt(data.ringGame2 * rate))}
          </Statistic.Value>
          <Statistic.Label>
            On Ring Games2
            <br />
            <b>{doCurrency(parseInt(data.ringGame2))}$</b>
          </Statistic.Label>
        </Statistic>

        <Statistic color="pink" inverted>
          <Statistic.Value>
            {doCurrency(parseInt(data.finalTotal))}
          </Statistic.Value>
          <Statistic.Label>Income</Statistic.Label>
        </Statistic>
        <Statistic color="pink" inverted>
          <Statistic.Value>
            {doCurrency(parseInt(data.finalTotal2 * rate))}
          </Statistic.Value>
          <Statistic.Label>
            Income2
            <br />
            <b>{doCurrency(parseInt(data.finalTotal2))}$</b>
          </Statistic.Label>
        </Statistic>
        <Statistic color="blue" inverted>
          <Statistic.Value>{doCurrency(data.pendingCashout)}</Statistic.Value>
          <Statistic.Label>Pending Cashouts</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>
            <Divider inverted />
          </Statistic.Value>
          <Statistic.Label>
            <Divider inverted />
          </Statistic.Label>
        </Statistic>
        <Statistic color={"red"} inverted size="large">
          <Statistic.Value>{doCurrency(totalchips)}</Statistic.Value>
          <Statistic.Label>Total Chips</Statistic.Label>
        </Statistic>
      </Statistic.Group>
      <Statistic.Group
        size="mini"
        horizontal
        className="bankroll"
        style={{ minWidth: 400, minHeight: 380, float: "left" }}
      >
        <Statistic color="yellow" inverted>
          <Statistic.Value>{doCurrency(btc)}</Statistic.Value>
          <Statistic.Label>
            <b>{data.btc}</b> BTC <br />
            <b>{doCurrency(parseInt(data.btc * btcrate))}$</b>
          </Statistic.Label>
        </Statistic>
        <Statistic color="green" inverted>
          <Statistic.Value>{doCurrency(usdt)}</Statistic.Value>
          <Statistic.Label>
            USDT Bank
            <br />
            <b>{doCurrency(parseInt(data.usdt))}$</b>
          </Statistic.Label>
        </Statistic>
        <Statistic color="red" inverted>
          <Statistic.Value>{doCurrency(perfectMoney)}</Statistic.Value>
          <Statistic.Label>
            PerfectMoney Bank
            <br />
            <b>{doCurrency(parseInt(data.perfectMoney))}$</b>
          </Statistic.Label>
        </Statistic>
        <Statistic inverted color="teal">
          <Statistic.Value>{doCurrency(vgc)}</Statistic.Value>
          <Statistic.Label>VGC Bank</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>
            <Divider inverted />
          </Statistic.Value>
          <Statistic.Label>
            <Divider inverted />
          </Statistic.Label>
        </Statistic>
        <Statistic inverted>
          <Statistic.Value>{doCurrency(btcrate)}$</Statistic.Value>
          <Statistic.Label>BTC Rate</Statistic.Label>
        </Statistic>
        <Statistic inverted>
          <Statistic.Value>{doCurrency(rate)}</Statistic.Value>
          <Statistic.Label>Dollar Rate</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>
            <Divider inverted />
          </Statistic.Value>
          <Statistic.Label>
            <Divider inverted />
          </Statistic.Label>
        </Statistic>
        <Statistic color={"green"} inverted size="small">
          <Statistic.Value>{doCurrency(total)}</Statistic.Value>
          <Statistic.Label>Total Bank</Statistic.Label>
        </Statistic>
      </Statistic.Group>
      <Statistic inverted size="large">
        <Statistic.Value>{doCurrency(total - totalchips)}</Statistic.Value>
        <Statistic.Label>Total Roll</Statistic.Label>
      </Statistic>
      <Button
        onClick={() => {
          fetchUsers();
        }}
      >
        Reload
      </Button>
    </>
  );
}

export default Admin;
