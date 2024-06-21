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
} from "semantic-ui-react";
import Moment from "react-moment";
import { addDays } from "date-fns";
const moment = require("moment");
import AmountColor from "../../../utils/AmountColor";
import { adminGetService, adminPutService } from "../../../services/admin";
import { Alert } from "../../../utils/alerts";
import AddCashier from "../AddRunner";
import CheckboxToggle from "../utils/toggle";
import AddCredit from "../AddCredit";
import AddGift from "../AddGift";
import { haveAdmin, haveModerator, doCurrency } from "../../../const";

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
      className="float-end"
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

const getGateways = JSON.parse(localStorage.getItem("getGateways"));
function Admin(prop) {
  const [data, setData] = useState([]);

  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [dataSortedID, setDataSortedID] = useState(3);

  const [dataSearch, setDataSearch] = useState("");
  const [dataLoginDay, setDataLoginDay] = useState("");

  const [selectedList, setSelected] = useState([]);
  const [getwaysList, setGetwaysData] = useState([]);
  const [obj, setObj] = useState({});
  const [loading, setLoading] = useState(false);
  const [dayNum, setDayNum] = useState(2);
  const [resNum, setResNum] = useState(15);
  const [footerTxt, setFooterTxt] = useState("");
  const [filterText, setFilterText] = React.useState("");
  const [filterOk, setFilterOk] = React.useState(false);
  const [cashierOpen, setCashierOpen] = React.useState(false);
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const handleChangeSearch = (e, { value }) => {
    setDataSearch(value);
  };
  const handleChangeLogin = (e, { value }) => {
    setDataLoginDay(value);
  };

  const fetchUsers = async (page) => {
    var _name = prop.search;
    var _val = prop.searchValue;
    var _contain = true;

    setLoading(true);
    try {
      const res = await adminGetService(`getTopLoserWinner?dayNumber=${dayNum}&resultNumber=${resNum}`);
      if (res.status === 200) {
        var newdata = res.data.topLosers
    

const children = newdata.concat(res.data.topWinners); 
     
        setData(children);
        setTotalRows(res.data.totalUser)
        setFilterOk(false);
      }
    } catch (error) {
      //console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    //fetchUsers(1); // fetch page 1 of users
  }, [dataSearch]);
  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };

  var filteredItems = data.filter(
    (item) =>
      item.username &&
      (item.username.toLowerCase().includes(filterText.toLowerCase()))
  );
  if (dataLoginDay) {
    var startDate = addDays(new Date(), dataLoginDay);

    filteredItems = data.filter((item) => {
      var _Date = new Date(item.lastLogin);
      return _Date <= startDate;
    });
  }

  const [firstOpen, setFirstOpen] = React.useState(false);
  const contextActions = React.useMemo(() => {
    return <Button onClick={() => setFirstOpen(true)}>Gift</Button>;
  }, [data]);
  const handleChange = ({ selectedRows }) => {
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    console.log("Selected Rows: ", selectedRows);
    var newSelect = [];
    {
      selectedRows.map((user, i) => {
        var newUser = user;

        newSelect.push(newUser);
      });
    }
    setSelected(newSelect);
  };

  const handleGetGeteways = async () => {
    if (getGateways) {
      setGetwaysData(getGateways);
    } else {
      setLoading(true);
      try {
        const res = await adminGetService("getGateways");
        if (res.status === 200) {
          var sorted = res.data?.sort((a, b) => (a.id > b.id ? 1 : -1));
          localStorage.setItem("getGateways", JSON.stringify(sorted));
          setGetwaysData(sorted);
        }
      } catch (error) {
        //console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const columns = [
   

    {
      name: "Username",
      selector: (row) => row.username,
      format: (row) => (
        <>
          <span
            className="msglink fw-bold"
            onClick={() => prop.addTabData(row.username)}
          >
            {row.username}
          </span>
        </>
      ),
      sortable: true,
      width: "180px",
    },
    {
      name: "gateway",
      selector: (row) => row.gateway,
      format: (row) => (
        <>
          <span
            className="msglink fw-bold"
          
          >
            {row.gateway}
          </span>
        </>
      ),
      sortable: true,
      width: "180px",
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      format: (row) => <>{doCurrency(row.amount)}</>,
      sortable: true,
    },
   
  ];
  const gettotal = (data, status, target) => {
    if (!data) return 0;
    var _data = data.filter((d) => d.amount != 0);
    var _totalReward = 0;
    {
      _data.map((x, i) => {
        var _am = x.amount;

        _totalReward = _totalReward + _am;
      });
    }
    if (target == "total") return _totalReward;
    if (target == "count") return _data.length;
  };
  const gettotal2 = (data, status, target) => {
    if (!data) return 0;
    var _data = data.filter((d) => d.totalRake != 0);
    var _totalReward = 0;
    {
      _data.map((x, i) => {
        var _am = x.totalRake;

        _totalReward = _totalReward + _am;
      });
    }
    if (target == "total") return _totalReward;
    if (target == "count") return _data.length;
  };
  const gettotal3 = (data, status, target) => {
    if (!data) return 0;
    var _data = data.filter((d) => d.total != 0);
    var _totalReward = 0;
    {
      _data.map((x, i) => {
        var _am = x.total;

        _totalReward = _totalReward + _am;
      });
    }
    if (target == "total") return _totalReward;
    if (target == "count") return _data.length;
  };
  const gettotal4 = (data, status, target) => {
    if (!data) return 0;
    var _data = data.filter((d) => d.liveChip != 0);
    var _totalReward = 0;
    {
      _data.map((x, i) => {
        var _am = x.liveChip;

        _totalReward = _totalReward + _am;
      });
    }
    if (target == "total") return _totalReward;
    if (target == "count") return _data.length;
  };

  const getDesc = (link, ftxt) => {
    ftxt = ftxt + "@" + link.toUpperCase() + "@";

    if (doCurrency(gettotal(filteredItems, "Done", "count")) > 0) {
      ftxt =
        ftxt +
        "credit (" +
        doCurrency(gettotal(filteredItems, "Done", "count")) +
        "): " +
        doCurrency(gettotal(filteredItems, "Done", "total")) +
        "  َ  َ  َ |  َ  َ  َ  ";
    }
    if (doCurrency(gettotal4(filteredItems, "Done", "count")) > 0) {
      ftxt =
        ftxt +
        "Chips (" +
        doCurrency(gettotal4(filteredItems, "Done", "count")) +
        "): " +
        doCurrency(gettotal4(filteredItems, "Done", "total")) +
        "  َ  َ  َ |  َ  َ  َ  ";
    }
    if (doCurrency(gettotal2(filteredItems, "Done", "count")) > 0) {
      ftxt =
        ftxt +
        "rake (" +
        doCurrency(gettotal2(filteredItems, "Done", "count")) +
        "): " +
        doCurrency(gettotal2(filteredItems, "Done", "total")) +
        "  َ  َ  َ |  َ  َ  َ  ";
    }
    if (doCurrency(gettotal3(filteredItems, "Done", "count")) > 0) {
      ftxt =
        ftxt +
        "total (" +
        doCurrency(gettotal3(filteredItems, "Done", "count")) +
        "): " +
        doCurrency(gettotal3(filteredItems, "Done", "total")) +
        "  َ  َ  َ |  َ  َ  َ  ";
    }

    ftxt = ftxt + "@";
    return ftxt;
  };
  useEffect(() => {
    var ftxt = "";
    if (filteredItems.length) {
      var link = "Total";
      ftxt = getDesc(link, ftxt);
      
    }
    setFooterTxt(ftxt);
  }, [filteredItems, data]);
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <>
        <Grid verticalAlign="middle" columns={2} as={Segment} color="red">
          <Grid.Row>
            <Grid.Column>
              <h1>{prop.searchValue} - TotalUsers: {totalRows}</h1>
            </Grid.Column>
            <Grid.Column>
            <Input
      defaultValue={dayNum}
    
      onChange={(e)=>{setDayNum(e.target.value)}}
      style={{ position: "relative", zIndex: 100000 }}
    />
    <Input
      defaultValue={resNum}
    
      onChange={(e)=>{setResNum(e.target.value)}}
      style={{ position: "relative", zIndex: 100000 }}
    />
              <Button color="red" onClick={() => fetchUsers(1)}>
                Reload
              </Button>
              
              {selectedList.length > 0 && (
                <Button color="red" onClick={() => setFirstOpen(true)}>
                  Gift {selectedList.length}
                </Button>
              )}
            
              <FilterComponent
                onFilter={(e) => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }, [filterText,dayNum,resNum, resetPaginationToggle, data, selectedList]);

  if (loading) {
    return (
      <>
      <div style={{ height: "calc(100vh - 150px)", overflow: "auto" }}>
        {subHeaderComponentMemo}
        <Segment
          basic
          style={{ height: "calc(100vh - 150px)", overflow: "auto" }}
        >
          <Dimmer active inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>
        </Segment>
      </div>
        
      </>
    );
  }
  return (
    <>
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
        onClose={() => {
          setCashierOpen(false);
          fetchUsers(1);
        }}
        onOpen={() => setCashierOpen(true)}
        open={cashierOpen}
        size="large"
        style={{ height: "auto" }}
      >
        <AddCashier obj={obj} setCashierOpen={setCashierOpen} />
      </Modal>
      <div style={{ height: "calc(100vh - 150px)", overflow: "auto" }}>
        {subHeaderComponentMemo}
        <DataTable
          columns={columns}
          data={filteredItems}
          progressPending={loading}
          onChangeRowsPerPage={handlePerRowsChange}
          paginationPerPage={perPage}
          defaultSortFieldId={dataSortedID}
          defaultSortAsc={false}
          expandOnRowClicked={true}
          expandableRowsHideExpander={true}
          conditionalRowStyles={conditionalRowStyles}
          noDataComponent={noDataComponent}
          pagination
          paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
          persistTableHead
          contextActions={contextActions}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          onSelectedRowsChange={handleChange}
          selectableRows
        />
       
      </div>
    </>
  );
}

export default Admin;
