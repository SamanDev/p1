import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Input,
  Segment,
  Button,
  Dimmer,
  Loader,
  Icon,
  Modal,
  Grid,
  Label,
} from "semantic-ui-react";
import Moment from "react-moment";
import { useParams } from "react-router-dom";
import { addDays } from "date-fns";
const moment = require("moment");
import { adminGetService, adminPutService } from "../../services/admin";
import { Alert } from "../../utils/alerts";

import CheckboxToggle from "./utils/toggle";
import AddGift from "./AddGift";
import SendMail from "./SendMail.js";
import AddCashier from "./AddCashier";
import AddOverCashier from "./AddOverCashier.js";
import Filter from "./Filter";
import LevelIcon from "../../utils/svg";

import {
  haveAdmin,
  haveModerator,
  haveRoot,
  doCurrency,
  levelDataInfo,
  doCurrencyMil,
  levelClassInside,
} from "../../const";

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

const FilterComponent = ({
  filterText,
  onFilterOk,
  onFilter,
  onClear,
  setExMode,
}) => (
  <>
    <Input
      icon="search"
      placeholder="Search..."
      id="search"
      type="text"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
      onBlur={onFilterOk}
    />
  </>
);
const updateUserObj = async (e, data) => {
  var _key = data.userkey;
  var curU = JSON.parse(JSON.stringify(data.user));
  var values = { id: curU.id, key: _key, value: data.checked };

  try {
    const res = await adminPutService(values, "updateUserByAdmin");
    if (res.status == 200) {
      if (res.data?.address) {
      }
    } else {
      Alert("متاسفم...!", res.data.message, "error");
    }
  } catch (error) {
    Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
  }
};
function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}
const setGiftAmount = (level) => {
  if (level >= levelDataInfo[4].minLevel) {
    var g = generateRandomInteger(
      levelDataInfo[4].minAmount,
      levelDataInfo[4].maxAmount
    );
  } else if (level >= levelDataInfo[5].minLevel) {
    var g = generateRandomInteger(
      levelDataInfo[5].minAmount,
      levelDataInfo[5].maxAmount
    );
  } else {
    var g = generateRandomInteger(
      levelDataInfo[6].minAmount,
      levelDataInfo[6].minAmount * (level + 1)
    );
  }
  g = Math.round(g / 1000) * 1000;
  return g;
};
function genLink(user) {
  var rules = JSON.parse(localStorage.getItem("siteInfoAdmin"));
  if (!rules?.siteUrl1) {
    rules = {
      siteUrl1: "https://www.00glxy8.com",
      siteUrl2: "https://www.5glxy15.com",
      siteUrl3: "https://www.10glxy25.com",
      siteUrl4: "https://www.trpkr.com",
      siteUrl5: "https://www.trpkr.com",
    };
  }
  var url = rules.siteUrl1;
  if (user.level >= 5) {
    url = rules.siteUrl2;
  }
  if (user.level >= 12) {
    url = rules.siteUrl3;
  }
  if (user.level >= 25) {
    url = rules.siteUrl4;
  }
  if (user.level >= 30) {
    url = rules.siteUrl5;
  }
  //url = "http://localhost:3000";
  return url + "/login/" + btoa(user.username) + "/" + btoa(user.lastLogin);
}
function genWALink(number, user) {
  var num = "+98" + number.slice(1);
  var txt =
    "با سلام (" +
    user.username +
    ") عزیز %0A %0A %0A %0A لینک ورود یکبار مصرف:%0A" +
    genLink(user);
  //url = "http://localhost:3000";
  return (
    <>
      <a
        href={"https://api.whatsapp.com/send?phone=" + num + "&text=" + txt}
        target="_blank"
      >
        <i aria-hidden="true" className="whatsapp green icon" />
      </a>
    </>
  );
}

function Admin(prop) {
  const [data, setData] = useState([]);
  const loginToken = prop.loginToken;
  const [totalRows, setTotalRows] = useState(1000);
  const [perPage, setPerPage] = useState(10);
  const [dataSortedID, setDataSortedID] = useState(1);
  const params = useParams();
  const [dataSearch, setDataSearch] = useState("");
  const [dataLoginDay, setDataLoginDay] = useState("");
  const getRate = localStorage.getItem("getRate")
    ? localStorage.getItem("getRate")
    : 50000;
  const [selectedList, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filterText, setFilterText] = React.useState("");
  const [filterOk, setFilterOk] = React.useState(false);

  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const handleChangeSearch = (e, { value }) => {
    setDataSearch(value);
  };
  const handleChangeLogin = (e, { value }) => {
    setDataLoginDay(value);
  };
  const columnsDownLine = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
      grow: 0.5,
    },
    {
      name: "level",
      selector: (row) => row.level,
      format: (row) => <>{row.level}</>,
      sortable: true,
    },
    {
      name: "Glevel",
      selector: (row) => row.glevel,
      format: (row) => <>{row.glevel}</>,
      sortable: true,
    },
    {
      name: "username",
      selector: (row) => row.username,
      format: (row) => (
        <>
          <span
            className="msglink fw-bold"
            onClick={() => prop.addTabData(row.username, prop.getwaysList)}
          >
            {row.username}
          </span>
        </>
      ),
      sortable: true,
      grow: 2,
    },

    {
      name: "balance",
      selector: (row) => row.balance,
      format: (row) => <>{doCurrency(row.balance)}</>,
      sortable: true,
    },
    {
      name: "balance2",
      selector: (row) => row.balance2,
      format: (row) => <>{doCurrency(row.balance2)}</>,
      sortable: true,
    },
    {
      name: "point",
      selector: (row) => row.dailyPoint,
      format: (row) => <>{row.dailyPoint}</>,
      sortable: true,
    },
    {
      name: "vip",
      selector: (row) => row.vipPlaySecond,
      format: (row) => <>{row.vipPlaySecond}</>,
      sortable: true,
    },
    {
      name: "gpass",
      selector: (row) => row.glevelSecond,
      format: (row) => <>{row.glevelSecond}</>,
      sortable: true,
    },
    {
      name: "lastLogin",
      selector: (row) => row.lastLogin,
      format: (row) => (
        <>
          <Moment fromNow>{row.lastLogin.replace("-08:00", "")}</Moment>
        </>
      ),
      sortable: true,
    },

    {
      name: "userBlock",
      selector: (row) => row.userBlock,
      format: (row) => (
        <>
          <CheckboxToggle
            check={row.userBlock}
            user={row}
            userkey="userBlock"
            onChange={updateUserObj}
          />
        </>
      ),
      sortable: true,
    },
  ];
  var columns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
      grow: 0.5,
    },
    {
      name: "level",
      selector: (row) => row.level,
      format: (row) => (
        <>
          <LevelIcon
            level={row.level}
            text=""
            mode="levels"
            classinside={levelClassInside(row.level)}
            number=""
            width="40px"
          />
        </>
      ),
      sortable: true,
    },
    {
      name: "msg",
      selector: (row) => "+98" + row?.bankInfos[0]?.mobile,
      format: (row) => (
        <>
          {haveAdmin(loginToken.roles) && row.bankInfos.length > 0 && (
            <>{genWALink(row.bankInfos[0].mobile, row)}</>
          )}
        </>
      ),
      sortable: true,
    },
    {
      name: "username",
      selector: (row) => row.username,
      format: (row) => (
        <>
          <span
            className="msglink fw-bold"
            onClick={() => prop.addTabData(row.username, prop.getwaysList)}
          >
            {row.username}
          </span>
        </>
      ),
      sortable: true,
      grow: 2,
    },

    {
      name: "refer",
      selector: (row) => (row.refer ? row.refer : ""),
      format: (row) => (
        <>
          {row.refer && (
            <span
              className="msglink fw-bold "
              onClick={() => prop.addTabData(row.refer, prop.getwaysList)}
            >
              {row.refer}
            </span>
          )}
        </>
      ),
      sortable: true,
      grow: 2,
    },

    {
      name: "balance",
      selector: (row) => row.balance,
      format: (row) => <>{doCurrency(row.balance)}</>,
      sortable: true,
    },
    {
      name: "balance2",
      selector: (row) => row.balance2,
      format: (row) => <>{doCurrency(row.balance2)}</>,
      sortable: true,
    },
    {
      name: "Tot",
      selector: (row) => row.totalCashout - row.totalDeposit,
      format: (row) => (
        <>
          {row.totalCashout - row.totalDeposit != 0 && (
            <Label
              size="tiny"
              color={row.totalCashout - row.totalDeposit > 0 ? "green" : "red"}
            >
              {doCurrencyMil(row.totalCashout - row.totalDeposit, 0)}
            </Label>
          )}
        </>
      ),
      sortable: true,
    },
    {
      name: "point",
      selector: (row) => row.dailyPoint,
      format: (row) => <>{row.dailyPoint}</>,
      sortable: true,
    },
    {
      name: "vip",
      selector: (row) => row.vipPlaySecond,
      format: (row) => <>{row.vipPlaySecond}</>,
      sortable: true,
    },
    {
      name: "Glevel",
      selector: (row) => row.glevel,
      format: (row) => <>{row.glevel}</>,
      sortable: true,
    },
    {
      name: "gpass",
      selector: (row) => row.glevelSecond,
      format: (row) => <>{row.glevelSecond}</>,
      sortable: true,
    },
    {
      name: "lastLogin",
      selector: (row) => row.lastLogin,
      format: (row) => (
        <>
          <Moment fromNow ago>
            {row.lastLogin.replace("-08:00", "")}
          </Moment>
        </>
      ),
      sortable: true,
    },
  ];
  const fetchUsers = async (page) => {
    var _name = prop.search;
    var _val = prop.searchValue;
    var _contain = true;
    if (dataSearch) {
      _name = "level";
      _val = dataSearch.toString();

      if (_val.indexOf("up") == -1) {
        _contain = false;
      }
      _val = _val.replace("up", "");
      if (_val == "chip") {
        _name = "chip";
        _val = "";
        _contain = false;
      }
      if (_val == "gpass") {
        _name = "glevel";
        _val = "";
        _contain = false;
      }
      if (_val == "vip") {
        _name = "vipPlaySecond";
        _val = "";
        _contain = false;
      }
      if (_val == "dailypoint") {
        _name = "dailypoint";
        _val = "";
        _contain = false;
      }
    }
    if (_name == "") {
      _name = "username";
    }
    if (filterText) {
      _name = "username";
      _val = filterText;
      _contain = true;
    }
    if (filterText.indexOf("@") > -1) {
      _name = "email";
      _val = filterText;
      _contain = true;
    }

    setLoading(true);
    try {
      const res = await adminGetService(
        `getUsersByAdmin?name=${_name}&value=${_val}&page=${page}&number=${perPage}&login=${dataLoginDay}&contain=${_contain}`
      );
      if (res.status === 200) {
        setData(res.data.users);
        setTotalRows(res.data.count);
        // setFilterOk(false);
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
  var filteredItems = data.filter((item) => item.username);
  var _val = dataSearch.toString();

  if (_val.indexOf("up") > -1) {
    filteredItems = filteredItems.filter(
      (item) =>
        item.level >= parseInt(_val.replace("level", "").replace(" up", "")) &&
        item.level < parseInt(_val.replace("level", "").replace(" up", "")) + 5
    );
  }

  if (dataLoginDay) {
    var startDate = addDays(new Date(), dataLoginDay);

    filteredItems = data.filter((item) => {
      var _Date = new Date(item.lastLogin);
      return _Date <= startDate;
    });
  }

  useEffect(() => {
    if (dataSearch) {
      var _val = dataSearch.toString();
      setDataSortedID(2);
      if (_val.indexOf("up") > -1) {
        setPerPage(2500);
      }
      _val = _val.replace("up", "");

      if (_val == "chip") {
        setDataSortedID(6);
      }
      if (_val == "point") {
        setDataSortedID(8);
      }
    }
  }, [dataSearch]);

  useEffect(() => {
    // if (filterOk) fetchUsers(1); // fetch page 1 of users
  }, [filterOk]);

  const [firstOpen, setFirstOpen] = React.useState(false);
  const [mailOpen, setMailOpen] = React.useState(false);
  const [notOpen, setNotOpen] = React.useState(false);

  const [cashierOpen, setCashierOpen] = React.useState(false);
  const [overCashierOpen, setOverCashierOpen] = React.useState(false);
  const contextActions = React.useMemo(() => {
    return <Button onClick={() => setFirstOpen(true)}>Gift</Button>;
  }, [data]);
  const handleChange = ({ selectedRows }) => {
    // You can set state or dispatch with something like Redux so we can use the retrieved data

    var newSelect = [];
    {
      selectedRows.map((user, i) => {
        if (
          !user?.multiAccount &&
          user?.refer != "runner" &&
          user?.refer != "bots"
        ) {
          var newUser = {};
          newUser.username = user.username;
          newUser.level = user.level;
          newUser.email = user.email;
          newUser.link = genLink(user);
          newUser.id = user.id;
          newUser.amount = setGiftAmount(user.level);
          newUser.amount2 = parseFloat(
            setGiftAmount(user.level) / getRate
          ).toFixed(2);

          newSelect.push(newUser);
        }
      });
    }
    setSelected(newSelect);
  };

  useEffect(() => {
    prop.handleGetGeteways();
    if (params.username) {
      prop.addTabData(params.username, prop.getwaysList);
    }
  }, []);

  if (haveAdmin(loginToken.roles) && 1 == 2) {
    columns.push(
      {
        name: "userBlock",
        selector: (row) => row.userBlock,
        format: (row) => (
          <>
            <CheckboxToggle
              check={row.userBlock}
              user={row}
              userkey="userBlock"
              onChange={updateUserObj}
            />
          </>
        ),
        sortable: true,
      },
      {
        name: "Admin",
        selector: (row) => row.roles,
        format: (row) => (
          <CheckboxToggle
            check={haveAdmin(row.roles)}
            user={row}
            userkey="Roles"
            onChange={updateUserObj}
          />
        ),
        sortable: true,
      },
      {
        name: "Moderator",
        selector: (row) => row.roles,
        format: (row) => (
          <CheckboxToggle
            check={haveModerator(row.roles)}
            user={row}
            userkey="Roles"
            onChange={updateUserObj}
          />
        ),
        sortable: true,
      }
    );
  }

  const subHeaderComponentMemo = React.useMemo(() => {
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
              {haveAdmin(loginToken.roles) && (
                <>
                  <Button onClick={() => prop.addGatewayTabData("Gateways")}>
                    Gateways
                  </Button>
                  <Button
                    color="blue"
                    className="float-end"
                    onClick={() => setCashierOpen(true)}
                  >
                    Cashier
                  </Button>
                  <Button
                    color="orange"
                    className="float-end"
                    onClick={() => setOverCashierOpen(true)}
                  >
                    OverCashout
                  </Button>
                </>
              )}

              <Button onClick={() => prop.addMainTabData("Winners")}>
                Winners
              </Button>
              <Button onClick={() => prop.addMainTabData("Runner")}>
                Runners
              </Button>
              <Button onClick={() => prop.addMainTabData("Bots")}>Bots</Button>
              {selectedList.length > 0 && (
                <Button color="red" onClick={() => setFirstOpen(true)}>
                  Gift {selectedList.length}
                </Button>
              )}
              {selectedList.length > 0 && (
                <Button color="blue" onClick={() => setMailOpen(true)}>
                  Mail {selectedList.length}
                </Button>
              )}
              {selectedList.length > 0 && (
                <Button color="yellow" onClick={() => setNotOpen(true)}>
                  Notif {selectedList.length}
                </Button>
              )}
              <Button
                className="float-end"
                color="red"
                onClick={() => fetchUsers(1)}
              >
                Search
              </Button>
            </Grid.Column>

            <Grid.Column style={{ textAlign: "right" }}>
              <Filter onFilter={handleChangeSearch} value={dataSearch} />
              <Filter
                onFilter={handleChangeLogin}
                value={dataLoginDay}
                mymode="login"
              />
              <FilterComponent
                onFilter={(e) => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
                onFilterOk={() => {
                  setFilterOk(true);
                }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }, [
    filterText,

    data,
    selectedList,
    dataLoginDay,
    dataSearch,
    dataSortedID,
    perPage,
  ]);
  const subHeaderComponentMemoDown = React.useMemo(() => {
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
                className="float-end"
                color="red"
                onClick={() => fetchUsers(1)}
              >
                Search
              </Button>
            </Grid.Column>

            <Grid.Column style={{ textAlign: "right" }}>
              <Filter onFilter={handleChangeSearch} value={dataSearch} />
              <Filter
                onFilter={handleChangeLogin}
                value={dataLoginDay}
                mymode="login"
              />
              <FilterComponent
                onFilter={(e) => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
                onFilterOk={() => {
                  setFilterOk(true);
                }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }, [
    filterText,

    data,
    selectedList,
    dataLoginDay,
    dataSearch,
    dataSortedID,
    perPage,
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
  return (
    <>
      <Modal
        onClose={() => setCashierOpen(false)}
        onOpen={() => setCashierOpen(true)}
        open={cashierOpen}
        size="large"
        style={{ height: "auto" }}
      >
        <AddCashier
          selectedList={selectedList}
          setCashierOpen={setCashierOpen}
        />
      </Modal>
      <Modal
        onClose={() => setOverCashierOpen(false)}
        onOpen={() => setOverCashierOpen(true)}
        open={overCashierOpen}
        size="tiny"
        style={{ height: "auto" }}
      >
        <AddOverCashier />
      </Modal>

      <Modal
        onClose={() => setFirstOpen(false)}
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
        size="large"
        style={{ height: "auto" }}
      >
        <AddGift selectedList={selectedList} />
      </Modal>
      <Modal
        onClose={() => setMailOpen(false)}
        onOpen={() => setMailOpen(true)}
        open={mailOpen}
        size="large"
        style={{ height: "auto" }}
      >
        <SendMail selectedList={selectedList} {...prop} />
      </Modal>
      <Modal
        onClose={() => setNotOpen(false)}
        onOpen={() => setNotOpen(true)}
        open={notOpen}
        size="large"
        style={{ height: "auto" }}
      >
        <SendMail mode="notif" selectedList={selectedList} {...prop} />
      </Modal>
      <div style={{ height: "calc(100vh - 150px)", overflow: "auto" }}>
        {prop.search == "refer" && prop.searchValue != "bots" ? (
          <>
            {subHeaderComponentMemoDown}
            <DataTable
              columns={columnsDownLine}
              data={filteredItems}
              progressPending={loading}
              paginationPerPage={perPage}
              paginationServer
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handlePerRowsChange}
              defaultSortFieldId={dataSortedID}
              defaultSortAsc={false}
              expandOnRowClicked={true}
              expandableRowsHideExpander={true}
              conditionalRowStyles={conditionalRowStyles}
              noDataComponent={noDataComponent}
              pagination
              paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
              persistTableHead
              paginationTotalRows={totalRows}
              contextActions={contextActions}
              paginationRowsPerPageOptions={[10, 25, 50, 100]}
              onSelectedRowsChange={handleChange}
              selectableRows
            />
          </>
        ) : (
          <>
            {subHeaderComponentMemo}
            <DataTable
              columns={columns}
              data={filteredItems}
              progressPending={loading}
              onChangeRowsPerPage={handlePerRowsChange}
              onChangePage={handlePageChange}
              paginationPerPage={perPage}
              expandOnRowClicked={true}
              defaultSortFieldId={dataSortedID}
              defaultSortAsc={false}
              expandableRowsHideExpander={true}
              conditionalRowStyles={conditionalRowStyles}
              noDataComponent={noDataComponent}
              pagination
              paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
              persistTableHead
              paginationServer
              contextActions={contextActions}
              paginationRowsPerPageOptions={[10, 25, 50, 100, 500, 1000, 5000]}
              paginationTotalRows={totalRows}
              onSelectedRowsChange={handleChange}
              selectableRows
            />
          </>
        )}
      </div>
    </>
  );
}

export default Admin;
