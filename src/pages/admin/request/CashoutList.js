import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Segment,
  Button,
  Dimmer,
  Icon,
  Modal,
  Grid,
  Divider,
  Input,
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
var _timer = 10000;
function Admin(prop) {
  const [data, setData] = useState([]);
  const [carts, setCarts] = useState([]);

  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [dataSortedID, setDataSortedID] = useState(8);
  const [dataSorted, setDataSorted] = useState("id");
  const [dataSortedDir, setDataSortedDir] = useState("desc");
  const [dataSearch, setDataSearch] = useState("");
  const [dataMode, setDataMode] = useState("Pending");
  const [getwaysList, setGetwaysData] = useState([]);

  const [startDate, setStartDate] = useState(addDays(new Date(), -14));
  const [endDate, setEndDate] = useState(addDays(new Date(), 1));
  const [loading, setLoading] = useState(false);

  const [filterText, setFilterText] = React.useState("");
  const [filterOk, setFilterOk] = React.useState(false);
  var filteredItems = data.filter((item) => item.gateway != "Cancele Cashout");
  if (filterText)
    filteredItems = filteredItems.filter(
      (item) =>
   
        item.username.toLowerCase().includes(filterText.toLowerCase()) || item.description.toLowerCase().includes(filterText.toLowerCase())
    );
  if (dataMode == "Pending") {
    filteredItems = filteredItems.filter((item) => {
      return (
        dataMode == item.status ||
        item.cashoutDescription.remainedAmount >= 100000 ||
        (
          item.gateway == "IranShetab" &&
          item.cashoutDescription.remainedAmount > 0 &&
          item.status != "Canceled" &&
          item.description.indexOf("V-G-C") == -1)
      );
    });
  }
  if (dataMode != "All" && dataMode != "Pending") {
    filteredItems = filteredItems.filter((item) => {
      return dataMode == item.status;
    });
  }
  const [firstOpen, setFirstOpen] = React.useState(false);
  const [firstDone, setFirstDone] = React.useState(false);
  const [firstDoneRow, setFirstDoneRow] = React.useState(false);
  const [firstStatus, setFirstStatus] = React.useState(false);
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

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
  const fetchUsers = async (page, load) => {
    setLoading(true);

    var _s = moment(startDate).format("YYYY-MM-DD");
    var _e = moment(endDate).format("YYYY-MM-DD");

    try {
      const res = await adminGetService(
        `getReports?mode=cashout&page=${page}&number=500&start=${_s}&end=${_e}`
      );
      if (res.status === 200) {
        setData(res.data);

        setFilterOk(false);
      }
    } catch (error) {
      //console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  const gettotal = (data, status, target) => {
    if (!data) return false;
    var _data = data.filter(
      (d) =>
        d.status.toLowerCase() === status.toLowerCase() ||
        (status.toLowerCase() == "done" &&
          d.status.toLowerCase() == "pending" &&
          d.pendingAmount != d.pending)
    );
    var _totalReward = 0;
    {
      _data.map((x, i) => {
        var _am =
          x.amount == x.pendingAmount || x.pendingAmount == 0
            ? x.amount
            : x.pendingAmount;
        if (
          status.toLowerCase() == "done" &&
          x.status.toLowerCase() == "pending"
        ) {
          _am = x.amount - x.pendingAmount;
        }
        _totalReward = _totalReward + _am;
      });
    }
    if (target == "total") return _totalReward;
    if (target == "count") return _data.length;
  };
  var footerTxt = "";
  if (doCurrency(gettotal(filteredItems, "Done", "count")) > 0) {
    footerTxt =
      footerTxt +
      "Done (" +
      doCurrency(gettotal(filteredItems, "Done", "count")) +
      "): " +
      doCurrency(gettotal(filteredItems, "Done", "total")) +
      "  َ  َ  َ |  َ  َ  َ  ";
  }
  if (doCurrency(gettotal(filteredItems, "Pending", "count")) > 0) {
    footerTxt =
      footerTxt +
      " Pending (" +
      doCurrency(gettotal(filteredItems, "Pending", "count")) +
      "): " +
      doCurrency(gettotal(filteredItems, "Pending", "total")) +
      "  َ  َ  َ |  َ  َ  َ  ";
  }

  if (doCurrency(gettotal(filteredItems, "Canceled", "count")) > 0) {
    footerTxt =
      footerTxt +
      " Canceled (" +
      doCurrency(gettotal(filteredItems, "Canceled", "count")) +
      "): " +
      doCurrency(gettotal(filteredItems, "Canceled", "total")) +
      "  َ  َ  َ |  َ  َ  َ  ";
  }
  footerTxt = footerTxt + "Rows per page:";
  const handlePageChange = (page) => {
    fetchUsers(page, true);
  };
  const handleSort = (column, sortDirection) => {
    console.log(sortDirection);
    setDataSortedID(column.id);
    setDataSorted(column.name);
    setDataSortedDir(sortDirection);
  };
  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
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
  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
      width: "80px",
    },
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
      width: "120px",
    },

    {
      name: "Status",
      selector: (row) => row.status,
      format: (row) => <>{row.status}</>,
      sortable: true,
      width: "80px",
    },
    {
      name: "Gateway",
      selector: (row) => row.gateway,
      format: (row) => <>{row.gateway}</>,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) =>
        row.endBalance >= row.startBalance ? row.amount : row.amount * -1,
      format: (row) => (
        <>
          {row.amount2 ? (
            <>
              <AmountColor
                amount={row.amount2}
                sign={row.endBalance2 - row.startBalance2}
              />{" "}
              $
            </>
          ) : (
            <AmountColor
              amount={row.amount}
              sign={row.endBalance - row.startBalance}
            />
          )}
        </>
      ),
      sortable: true,
      width: "100px",
    },
    {
      name: "PendingAmount",
      selector: (row) => row.pendingAmount,
      format: (row) => (
        <span className=" fw-bold">
          <AmountColor amount={row.pendingAmount} />
        </span>
      ),
      sortable: true,
    },
    {
      name: "Desc",
      selector: (row) => row.description,
      format: (row) => (
        <>
          {row.description.indexOf("AmjadCard") > -1 ? (
            <>{prinDesc(row.description)}</>
          ) : (
            <>
              {row.description} -{" "}
              {row.status === "Done" &&
                row.gateway == "IranShetab" &&
                row.description.indexOf("V-G-C") == -1 && (
                  <CshList id={row.id} item={row.cashoutDescription} />
                )}
            </>
          )}
        </>
      ),
      sortable: true,
      width: "600px",
    },

    {
      name: "Date",
      selector: (row) => row.createDate,
      format: (row) => (
        <div className="blacktext">{convertDateToJalali(row.createDate)}</div>
      ),
      sortable: true,
      width: "200px",
    },
    {
      name: "Action",
      selector: (row) => row.id,
      format: (row) => (
        <ActionBtn row={row} carts={carts} updateStatus={updateStatus} />
      ),
      sortable: false,
      width: "200px",
    },
  ];
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
            </Grid.Column>
            <Grid.Column>
              <FilterComponent
                onFilter={(e) => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
              />
              <FilterMode
                onFilter={(e, { value }) => {
                  setDataMode(value.toString());
                }}
                value={dataMode}
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
        onClose={() => setFirstDone(false)}
        onOpen={() => setFirstDone(true)}
        open={firstDone}
        style={{ height: "auto" }}
        basic
        closeOnDimmerClick={false}
        closeIcon
      >
        <div className="myaccount popupmenu" style={{ margin: 50 }}>
          <Confirm
            {...prop}
            carts={carts}
            gateway="BankTransfer"
            setFilterOk={setFilterOk}
            item={firstDoneRow}
            status={firstStatus}
            setFirstDone={setFirstDone}
            setFirstStatus={setFirstStatus}
          />
        </div>
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
          persistTableHead
          paginationComponentOptions={{
            rowsPerPageText: footerTxt,
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
      </div>
    </>
  );
}

export default Admin;
