import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Segment,
  Button,
  Dimmer,
  Loader,
  Icon,
  Modal,
  Grid,
  Header,
} from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { addDays } from "date-fns";
import { convertDateToJalali } from "../../../utils/convertDate";
const moment = require("moment");
import { adminGetService } from "../../../services/admin";
import DateReng from "../utils/dateReng";

import { doCurrency } from "../../../const";
const style = {
  opacity: 0.9,
  padding: "1.5em",
};
const conditionalRowStyles = [
  {
    when: (row) => row.endBalance < row.startBalance,
    style: {
      backgroundColor: "rgba(255,0,0,.1)",
    },
  },
  // You can also pass a callback to style for additional customization
  {
    when: (row) => row.endBalance > row.startBalance,
    style: {
      backgroundColor: "rgba(0,255,0,.1)",
    },
  },
];

const noDataComponent = (
  <div
    style={{
      minHeight: 300,
      position: "relative",
      marginTop: 20,
      width: "100%",
      zIndex: 0,
    }}
  >
    <Dimmer active inverted>
      <div
        style={{
          textAlign: "center",
          color: "rgba(0,0,0,.5)",
          paddingTop: 30,
          width: "100%",
        }}
      >
        <Icon size="huge" color="grey" name="list ul" />
        <h4>Empty List.</h4>
      </div>
    </Dimmer>
  </div>
);

function listgames(list) {
  return list.map((link, i) => (
    <small key={i} className="dplock">
      {link.gameName}:
      <span className="float-end">
        {doCurrency(link.amount)}
        {link.currency == "Dollar" && <>$</>}
      </span>
    </small>
  ));
}

function listadmin(list) {
  var newlist = [];
  const result = list

    .filter(
      (item, pos, self) =>
        self.findIndex((v) => v.pokerPercent === item.pokerPercent) === pos
    )
    .sort((a, b) =>
      a.pokerPercent < b.pokerPercent ? 1 : a.user < b.user ? -1 : 1
    );

  return result
    .sort((a, b) => (a.pokerPercent < b.pokerPercent ? 1 : -1))
    .map((link, i) => (
      <Segment
        key={i}
        color="red"
        size="tiny"
        attached="top"
        style={{ margin: 0 }}
      >
        <Header>
          {link.user}
          <br />
          {doCurrency(link.total)}
          <span className="float-end">{doCurrency(link.total2)}$</span>
        </Header>
        <Segment attached style={{ margin: "0px !important" }}>
          {listadminchild(link)}
        </Segment>
      </Segment>
    ));
}
function listpercent(list, amount, amount2) {
  var newlist = [];
  const result = list

    .filter(
      (item, pos, self) =>
        self.findIndex((v) => v.pokerPercent === item.pokerPercent) === pos
    )
    .sort((a, b) => (a.pokerPercent < b.pokerPercent ? 1 : -1));
  return result.map((link, i) => (
    <small key={i} className="dplock">
      <span className="float-start">{link.user}:</span>
      <div className="text-end">
        {amount != 0 && (
          <>{doCurrency(parseInt((link.pokerPercent * amount) / 100))}</>
        )}
        {amount2 != 0 && (
          <>
            {amount != 0 && (
              <>
                <br />
              </>
            )}
            {doCurrency(
              parseFloat((link.casinoPercent * amount2) / 100).toFixed(2)
            )}
            $
          </>
        )}
      </div>
    </small>
  ));
}
function listadminchild(list) {
  var newlist = [];
  for (const [key, value] of Object.entries(list)) {
    if (
      key != "id" &&
      key != "date" &&
      key != "user" &&
      value != 0 &&
      key.indexOf("Percent") == -1
    ) {
      if (
        key.indexOf("total") == -1 &&
        key.indexOf("casinoToman") == -1 &&
        key.indexOf("casinoAmount") == -1 &&
        key.indexOf("casinoGamesSet") == -1
      ) {
        if (key.indexOf("rewards") > -1) {
          newlist.push({ name: key, value: value * -1 });
        } else {
          newlist.push({ name: key, value: value });
        }
      }
    }
  }
  return newlist
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .map((link, i) => (
      <small key={i} className="dplock">
        {link.name}:
        <span className="float-end">
          {doCurrency(link.value)}
          {link.name.indexOf("2") > -1 && <>$</>}
        </span>
      </small>
    ));
}
function listpoker(list) {
  var newlist = [];
  for (const [key, value] of Object.entries(list)) {
    if (key.indexOf("poker") > -1 || key.indexOf("tourney") > -1) {
      if (
        key.indexOf("Total") == -1 &&
        key.indexOf("Cost") == -1 &&
        value != 0
      ) {
        newlist.push({ name: key, value: value });
      }
    }
  }
  return newlist
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .map((link, i) => (
      <small key={i} className="dplock">
        {link.name}:
        <span className="float-end">
          {doCurrency(link.value)}
          {link.name.indexOf("2") > -1 && <>$</>}
        </span>
      </small>
    ));
}
function listfinal(list) {
  var newlist = [];
  for (const [key, value] of Object.entries(list)) {
    if (
      key.indexOf("Total") > -1 ||
      key.indexOf("Cost") > -1 ||
      key.indexOf("Rewards") > -1 ||
      key.indexOf("casino") > -1
    ) {
      if (
        key.indexOf("finalTotal") == -1 &&
        key.indexOf("casinoCost") == -1 &&
        key.indexOf("casinoToman") == -1 &&
        key.indexOf("totalRewards") == -1 &&
        key.indexOf("pokerTotalFinal") == -1 &&
        key.indexOf("pokerCost") == -1 &&
        key.indexOf("casinoGamesSet") == -1
      ) {
        newlist.push({ name: key, value: value });
      }
    }
  }
  return newlist
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .map((link, i) => (
      <small key={i} className="dplock">
        {link.name}:
        <span className="float-end">
          {doCurrency(link.value)}
          {(link.name.indexOf("2") > -1 || link.name.indexOf("Dollar")) >
            -1 && <>$</>}
        </span>
      </small>
    ));
}
function listreward(list) {
  var newlist = [];
  for (const [key, value] of Object.entries(list)) {
    if (key != "id" && key != "date" && value != 0) {
      newlist.push({ name: key, value: value });
    }
  }
  return newlist
    .sort((a, b) => (a.value < b.value ? 1 : -1))
    .map((link, i) => (
      <small key={i} className="dplock">
        {link.name}:
        <span className="float-end">
          {doCurrency(link.value)}
          {link.name.indexOf("2") > -1 && <>$</>}
        </span>
      </small>
    ));
}
function listcosts(list) {
  var newlist = [];
  for (const [key, value] of Object.entries(list)) {
    if (key == "pokerCost" || key == "casinoCost") {
      newlist.push({ name: key, value: value });
    }
  }
  return newlist
    .sort((a, b) => (a.value < b.value ? 1 : -1))
    .map((link, i) => (
      <small key={i} className="dplock">
        {link.name}:
        <span className="float-end">
          {doCurrency(link.value)}
          {(link.name.indexOf("2") > -1 || link.name.indexOf("casinoCost")) >
            -1 && <>$</>}
        </span>
      </small>
    ));
}
function Admin(prop) {
  const [data, setData] = useState([]);
  const loginToken = prop.loginToken;
  const [totalRows, setTotalRows] = useState(1000);
  const [perPage, setPerPage] = useState(100);
  const [dataSortedID, setDataSortedID] = useState(0);
  const params = useParams();
  const [dataSearch, setDataSearch] = useState("");
  const [live, setLive] = useState(false);
  const [startDate, setStartDate] = useState(addDays(new Date(), -1));
  const [endDate, setEndDate] = useState(addDays(new Date(), -1));
  const [selectedList, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filterText, setFilterText] = React.useState("");
  const [filterOk, setFilterOk] = React.useState(false);
  const [firstOpen, setFirstOpen] = React.useState(false);
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  var columns = [
    {
      name: "Income",
      selector: (row) => row.pokerTotal,
      width: "100%",
      format: (row) => (
        <>
          <br />
          <Segment
            inverted
            color="black"
            size="large"
            style={{ margin: "20px 0px 0px 0px", width: "calc(100vw - 102px)" }}
          >
            <Header>
              <div className="blacktext">{row.date}</div>
            </Header>
          </Segment>
          <Segment.Group
            horizontal
            attached="top"
            style={{ margin: 0, width: "100%" }}
          >
            <Segment inverted color="green" size="tiny" attached="top">
              <Header>
                Poker
                <br />
                {doCurrency(row.pokerTotal)}
                <span className="float-end">
                  {doCurrency(row.pokerTotal2)}$
                </span>
              </Header>
              <Segment raised inverted attached>
              <small className="dplock">
              botsRake:
        <span className="float-end">
          {doCurrency(row.botsRake)}
         
        </span>
      </small>
      <small className="dplock">
      runnersRake:
        <span className="float-end">
          {doCurrency(row.runnersRake)}
         
        </span>
      </small>
      <small className="dplock">
      playersRake:
        <span className="float-end">
          {doCurrency(row.pokerRake-row.botsRake-row.runnersRake)}
         
        </span>
      </small>
                {listpoker(row)}
                <br />
                {listpercent(
                  row.adminIncomeSet,
                  row.pokerRake,
                  row.pokerTotal2
                )}
              </Segment>
            </Segment>
            

            <Segment inverted color="blue" size="tiny" attached="top">
              <Header>
                Casino
                <br />
                {doCurrency(row.casinoToman)}
                <span className="float-end">
                  {doCurrency(row.casinoDollar)}$
                </span>
              </Header>
              <Segment raised inverted attached>
                {listgames(row.casinoGamesSet)}
                <br />
                {listpercent(
                  row.adminIncomeSet,
                  row.casinoToman,
                  row.casinoDollar
                )}
              </Segment>
            </Segment>
            <Segment inverted color="red" size="tiny" attached="top">
              <Header>
                Rewards
                <br />
                {doCurrency((row.totalRewards - row.pokerCost) * -1)}
                <span className="float-end">
                  {doCurrency(row.totalRewards2 ? row.totalRewards2 * -1 : 0)}$
                </span>
              </Header>
              <Segment raised inverted attached>
                {listreward(row.rewards)}
               
                <small className="dplock fw-bold">
                  Total:
                  <span className="float-end">
                    {doCurrency(row.totalRewards * -1)}
                  </span>
                </small>
                <small className="dplock fw-bold">
                  Total2:
                  <span className="float-end">
                    {doCurrency(row.totalRewards2 ? row.totalRewards2 * -1 : 0)}
                    $
                  </span>
                </small>
                <br />
                
                {listcosts(row)}
              </Segment>
            </Segment>
            <Segment inverted color="grey" size="tiny" attached="top">
              <Header>
                Total
                <br />
                {doCurrency(row.finalTotal+row.botsTotal+row.runnersTotal)}
                <span className="float-end">
                  {doCurrency(row.finalTotal2)}$
                </span>
              </Header>
              <Segment raised inverted attached>
                {listfinal(row)}
                <small className="dplock">
                  Rewards:
                  <span className="float-end">
                    {doCurrency((row.totalRewards - row.pokerCost) * -1)}
                  </span>
                </small>
                <small className="dplock">
                  Rewards2:
                  <span className="float-end">
                    {doCurrency(row.totalRewards2 ? row.totalRewards2 * -1 : 0)}
                    $
                  </span>
                </small>
              </Segment>
            </Segment>
            
            <Segment inverted color="black" size="tiny" attached="top">
              <Header>
                Admins Final
                <br />
                {doCurrency(row.finalTotal)}
                <span className="float-end">
                  {doCurrency(row.finalTotal2)}$
                </span>
              </Header>
              <Segment raised attached>
                {listpercent(
                  row.adminIncomeSet,
                  row.finalTotal,
                  row.finalTotal2
                )}
              </Segment>
            </Segment>
          </Segment.Group>
          <Segment.Group horizontal style={{ margin: 0, display: "none" }}>
            {listadmin(row.adminIncomeSet)}
          </Segment.Group>
        </>
      ),
    },
  ];

  const fetchUsers = async (page) => {
    var _s = moment(startDate).format("YYYY-MM-DD");
    var _e = moment(endDate).format("YYYY-MM-DD");
    setLoading(true);
    try {
      var res;
      if (page == 0) {
        res = await adminGetService(`getIncome?page=1&number=${perPage}`);
      } else {
        res = await adminGetService(
          `getIncome?page=${page}&number=${perPage}&startDate=${_s}&endDate=${_e}`
        );
      }

      if (res.status === 200) {
        setData(res.data);
        setFilterOk(false);
        //setTotalRows(res.data.count);
      }
    } catch (error) {
      //console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
    setFilterOk(true);
  };
  const handlePageChange = (page) => {
    fetchUsers(page);
  };
  var filteredItems = data.sort((a, b) => (a.date < b.date ? 1 : -1));

  useEffect(() => {
    // fetchUsers(1); // fetch page 1 of users
  }, [dataSearch]);

  useEffect(() => {
    //if (!firstOpen && filterOk) fetchUsers(1); // fetch page 1 of users
  }, [filterOk, firstOpen]);
  useEffect(() => {
    if (firstOpen) setLive(false); // fetch page 1 of users
  }, [firstOpen]);
  useEffect(() => {
    if (filterOk) {
      setFilterOk(false);
    } else {
      setFilterOk(true);
    }
  }, [live]);
  const subHeaderComponentMemo = React.useMemo(() => {
    var _s = moment(startDate).format("YY-MM-DD");
    var _e = moment(endDate).format("YY-MM-DD");
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    return (
      <>
        <Grid
          verticalAlign="middle"
          columns={2}
          centered
          as={Segment}
          color="red"
        >
          <Grid.Row>
            <Grid.Column>
              <Button
                onClick={() => {
                  setLive(true);
                  fetchUsers(0);
                }}
              >
                Live
              </Button>

              <Button onClick={() => prop.addMainTabData("Bankroll")}>
                Bankroll
              </Button>
              <Button
                className="float-end"
                color="red"
                onClick={() => {
                  if (filterOk) {
                    setFilterOk(false);
                  } else {
                    setFilterOk(true);
                  }
                  fetchUsers(1);
                }}
              >
                Search
              </Button>
            </Grid.Column>

            <Grid.Column>
              <Button
                size="small"
                floating="left"
                onClick={() => setFirstOpen(true)}
              >
                {_s} / {_e}
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }, [
    filterText,
    resetPaginationToggle,
    data,
    selectedList,
    live,
    startDate,
    endDate,
  ]);
  const CustomLoader = () => (
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
  if (loading && 1 == 2) {
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
  return (
    <>
      <div
        style={{ height: "calc(100vh - 150px)", overflow: "auto" }}
        className="ttotal"
      >
        <Modal
          onClose={() => setFirstOpen(false)}
          onOpen={() => setFirstOpen(true)}
          open={firstOpen}
          style={{ height: "auto" }}
        >
          <DateReng
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setFilterOk={setFilterOk}
          />
        </Modal>
        {subHeaderComponentMemo}
        <DataTable
          columns={columns}
          data={filteredItems}
          progressPending={loading}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          paginationPerPage={perPage}
          defaultSortFieldId={dataSortedID}
          defaultSortAsc={false}
          conditionalRowStyles={conditionalRowStyles}
          noDataComponent={noDataComponent}
          pagination
          progressComponent={<CustomLoader />}
        />
      </div>
    </>
  );
}

export default Admin;
