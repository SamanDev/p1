import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Segment,
  Button,
  Dimmer,
  Icon,
  Modal,
  Grid,
  Divider,  Input,
} from "semantic-ui-react";
import { convertDateToJalali } from "../../../utils/convertDate";
import ActionBtn from "../../../utils/actionBtn";
import AmountColor from "../../../utils/AmountColor";
import { addDays } from "date-fns";
import CartFormat from "../../../utils/CartFormat";
const moment = require("moment");
import { adminGetService } from "../../../services/admin";
import { doCurrency, isJson } from "../../../const";
import DateReng from "../utils/dateReng";
import FilterMode from "./Filter";
import Confirm from "./Confirm";
import CshList from "./getcashlistadmin";
import AddCashier from "../AddCost";
const conditionalRowStyles = [
  {
    when: (row) => row.status == "Pending" && row.amount == row.pendingAmount,
    style: {
      backgroundColor: "rgba(0,0,255,.1)",
    },
  },
  {
    when: (row) => row.status == "Pending" && row.amount != row.pendingAmount,
    style: {
      backgroundColor: "rgb(105 28 242 / 10%)",
    },
  },

  // You can also pass a callback to style for additional customization
  {
    when: (row) => row.status == "Done",
    style: {
      backgroundColor: "rgba(0,255,0,.1)",
    },
  },
  {
    when: (row) => row.status == "Canceled",
    style: {
      backgroundColor: "rgba(255,0,0,.1)",
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
const gettotal = (data, status, target) => {
  var _data = data
  var _totalReward = 0;
  {
    _data.map((x, i) => {
      var _am = x.amount ;
      _totalReward = _totalReward + _am;
    });
  }
  if (target == "total") return _totalReward;
  if (target == "count") return _data.length;
};

var _timer = 10000;
function Admin(prop) {
  const [data, setData] = useState([]);
  const [carts, setCarts] = useState([]);

  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [dataSortedID, setDataSortedID] = useState(6);
  const [dataSorted, setDataSorted] = useState("id");
  const [dataSortedDir, setDataSortedDir] = useState("desc");
  const [dataSearch, setDataSearch] = useState("");
  const [dataMode, setDataMode] = useState("Pending");
  const [getwaysList, setGetwaysData] = useState([]);
  const [footerTxt, setFooterTxt] = useState("");
  const [startDate, setStartDate] = useState(addDays(new Date(), -1));
  const [endDate, setEndDate] = useState(addDays(new Date(), 1));
  const [loading, setLoading] = useState(false);

  const [filterText, setFilterText] = React.useState("");
  const [filterOk, setFilterOk] = React.useState(false);
  var filteredItems = data.filter(
    (item) =>
     
      item.description.toLowerCase().includes(filterText.toLowerCase())
  );
  const [firstOpen, setFirstOpen] = React.useState(false);
  const [firstDone, setFirstDone] = React.useState(false);
  const [firstDoneRow, setFirstDoneRow] = React.useState(false);
  const [firstStatus, setFirstStatus] = React.useState(false);
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const [cashierOpen, setCashierOpen] = React.useState(false);
  // data provides access to your row data
  const ExpandedComponent = ({ data }) => (
    <div style={{ overflow: "auto", width: "90vw" }}>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
  const fetchCart = async (page) => {
    try {
      const res = await adminGetService(`getSiteBankCards`);
      if (res.status === 200) {
        setCarts(res.data);
      }
    } catch (error) {
      //console.log(error.message);
    }
  };
  const prinDesc = (desc) => {
    const _desc = desc.split(",");
    var res = "";
    _desc.forEach((element) => {
      if (element.indexOf(" orderId") > -1) {
        res = res + element.split("=")[1] + " | ";
      }
      if (element.indexOf("cardNumber") > -1) {
        res = res + element.split("=")[1] + " | ";
      }
      if (element.indexOf("shebaNumber") > -1) {
        res = res + element.split("=")[1];
      }
    });
    return res.replace(/'/g, "");
  };

  useEffect(() => {
    //fetchUsers(1, true); // fetch page 1 of users
  }, [dataSorted, dataSortedDir]);

  useEffect(() => {
    //if (!firstOpen && filterOk) fetchUsers(1, true); // fetch page 1 of users
  }, [filterOk, firstOpen]);
  useEffect(() => {
    //if (!firstDone && firstStatus == "reload") fetchUsers(1); // fetch page 1 of users
  }, [firstDone]);
  useEffect(() => {
    //fetchCart();
  }, []);
  const updateStatus = (row, status) => {
    setFirstDone(true);
    setFirstDoneRow(row);
    setFirstStatus(status);
  };
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
  const getDesc = (link, ftxt) => {
    if (doCurrency(gettotal(filteredItems, "Done", "count")) > 0) {
      ftxt =
      ftxt +
        "Done (" +
        doCurrency(gettotal(filteredItems, "Done", "count")) +
        "): " +
        doCurrency(gettotal(filteredItems, "Done", "total"))
    }

   
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
 
  const fetchUsers = async (page, load) => {
    setLoading(true);

    var _s = moment(startDate).format("YYYY-MM-DD");
    var _e = moment(endDate).format("YYYY-MM-DD");

    try {
      const res = await adminGetService(
        `getCost?mode=cashout&page=${page}&number=500&start=${_s}&end=${_e}`
      );
      if (res.status === 200) {
        setData(res.data.content);

        setFilterOk(false);
      }
    } catch (error) {
      //console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
      width: "80px",
    },
    {
      name: "User",
      selector: (row) => row.user,
      format: (row) => (
        <>
          <span className="msglink fw-bold">{row.user}</span>
        </>
      ),
      sortable: true,
    },

    {
      name: "Mode",
      selector: (row) => row.mode,
      format: (row) => <>{row.mode}</>,
      sortable: true,
      width: "80px",
    },

    {
      name: "Amount",
      selector: (row) =>
        row.endBalance >= row.startBalance ? row.amount : row.amount * -1,
      format: (row) => (
        <>
          <AmountColor
            amount={row.amount}
            sign={row.endBalance - row.startBalance}
          />
        </>
      ),
      sortable: true,
      width: "100px",
    },

    {
      name: "Desc",
      selector: (row) => row.description,
      format: (row) => (
        <>
          <>{row.description}</>
        </>
      ),
      sortable: true,
      width: "600px",
    },

    {
      name: "Date",
      selector: (row) => row.date,
      format: (row) => (
        <div className="blacktext">{convertDateToJalali(row.date)}</div>
      ),
      sortable: true,
      width: "200px",
    },
  ];
  const subHeaderComponentMemo = React.useMemo(() => {
    var _s = moment(startDate).format("YYYY-MM-DD");
    var _e = moment(endDate).format("YYYY-MM-DD");
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
                size="small"
                floating="left"
                onClick={() => setFirstOpen(true)}
              >
                {_s} / {_e}
              </Button>
              <Button color="red" onClick={() => fetchUsers(1)}>
                Search
              </Button>
              <Button
                color="blue"
                className="float-end"
                onClick={() => setCashierOpen(true)}
              >
                Cashier
              </Button>
            </Grid.Column>
            <Grid.Column>
              
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
  }, [filterText, resetPaginationToggle, data, startDate, endDate]);

  return (
    <>
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
      <Modal
        onClose={() => setCashierOpen(false)}
        onOpen={() => setCashierOpen(true)}
        open={cashierOpen}
        size="large"
        style={{ height: "auto" }}
      >
        <AddCashier setCashierOpen={setCashierOpen} />
      </Modal>
     

      <div
        className="reportTable"
        style={{ height: "calc(100vh - 250px)", overflow: "auto" }}
      >
        {subHeaderComponentMemo}
        <DataTable
          columns={columns}
          data={filteredItems}
          progressPending={loading}
          //onChangeRowsPerPage={handlePerRowsChange}
          defaultSortFieldId={dataSortedID}
          paginationPerPage={perPage}
          defaultSortAsc={false}
          conditionalRowStyles={conditionalRowStyles}
          noDataComponent={noDataComponent}
          pagination
          paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
      
          paginationComponentOptions={{
            rangeSeparatorText: "of",
            noRowsPerPage: false,
            selectAllRowsItem: false,
            selectAllRowsItemText: "All",
          }}
          //onChangePage={handlePageChange}
          //paginationServer
          paginationRowsPerPageOptions={[10, 25, 50, 100, 500, 1000, 5000]}
          paginationTotalRows={totalRows}
        />
        {footerTxt}
      </div>
    </>
  );
}

export default Admin;
