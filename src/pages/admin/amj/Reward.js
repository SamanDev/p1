import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Button, Dimmer, Icon, Modal } from "semantic-ui-react";
import { convertDateToJalali } from "../../../utils/convertDate";
import AmountColor from "../../../utils/AmountColor";
import { addDays } from "date-fns";
const moment = require("moment");
import { adminGetService } from "../../../services/admin";
import Moment from "react-moment";
import DateReng from "../utils/dateReng";
import FilterMode from "../report/Filter";
import { doCurrency } from "../../../const";
const conditionalRowStyles = [
  {
    when: (row) => row.status == "Pending",
    style: {
      backgroundColor: "rgba(0,0,255,.1)",
    },
  },
  {
    when: (row) => moment(row.expireDate) < moment(),
    style: {
      backgroundColor: "rgba(255,0,0,.1)",
    },
  },
  {
    when: (row) => row.status == "Done",
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

function Admin(prop) {
  const [data, setData] = useState(prop.user.userGifts);

  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [dataSortedID, setDataSortedID] = useState(1);
  const [dataSorted, setDataSorted] = useState("id");
  const [dataSortedDir, setDataSortedDir] = useState("desc");
  const [dataSearch, setDataSearch] = useState("");
  const [dataMode, setDataMode] = useState("all");
  const [getwaysList, setGetwaysData] = useState([]);

  const [startDate, setStartDate] = useState(addDays(new Date(), -6));
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const [filterText, setFilterText] = React.useState("");
  const [filterOk, setFilterOk] = React.useState(false);
  const filteredItems = data.filter((item) => item.username);

  const [firstOpen, setFirstOpen] = React.useState(false);
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  // data provides access to your row data
  const ExpandedComponent = ({ data }) => (
    <div style={{ overflow: "auto", width: "90vw" }}>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );

  const fetchUsers = async (page) => {
    setLoading(true);
    var _s = moment(startDate).format("YYYY-MM-DD");
    var _e = moment(endDate).format("YYYY-MM-DD");

    try {
      const res = await adminGetService(
        `getReports?username=${prop.user.username}&mode=${dataMode.replace(
          "all",
          ""
        )}&page=${page}&number=500&sort=${dataSorted}&order=${dataSortedDir}&start=${_s}&end=${_e}`
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

  const handlePageChange = (page) => {
    fetchUsers(page);
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
    //fetchUsers(1); // fetch page 1 of users
  }, [dataSorted, dataSortedDir, dataMode]);

  useEffect(() => {
    //if (!firstOpen && filterOk) fetchUsers(1); // fetch page 1 of users
  }, [filterOk, firstOpen]);

  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
      width: "80px",
    },

    {
      name: "Status",
      selector: (row) => row.status,
      format: (row) => <>{row.status}</>,
      sortable: true,
      width: "80px",
    },

    {
      name: "Amount",
      selector: (row) => row.amount,
      format: (row) => (
        <>
          <AmountColor amount={row.amount} />
        </>
      ),
      sortable: true,
      width: "100px",
    },

    {
      name: "Mode",
      selector: (row) => row.mode,
      format: (row) => <>{row.mode}</>,
      sortable: true,
      width: "120px",
    },
    {
      name: "Text",
      selector: (row) => row.text,
      format: (row) => <>{row.text}</>,
      sortable: true,
      width: "120px",
    },
    {
      name: "Label",
      selector: (row) => row.label,
      format: (row) => <div className="farsi">{row.label} </div>,
      sortable: true,
    },
    {
      name: "Received",
      selector: (row) => row.received,
      format: (row) => <>{row.received ? "Yes" : "No"}</>,
      sortable: true,
    },
    {
      name: "startDate",
      selector: (row) => row.startDate,
      format: (row) => (
        <>
          <Moment fromNow ago>
            {row.startDate}
          </Moment>
        </>
      ),
      sortable: true,
    },
    {
      name: "expireDate",
      selector: (row) => row.expireDate,
      format: (row) => (
        <>
          <Moment fromNow ago>
            {row.expireDate}
          </Moment>
        </>
      ),
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.data,
      format: (row) => (
        <div className="blacktext">{convertDateToJalali(row.data)}</div>
      ),
      sortable: true,
    },
  ];
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    var _s = moment(startDate).format("YYYY-MM-DD");
    var _e = moment(endDate).format("YYYY-MM-DD");
    return (
      <>
        <Button size="small" onClick={() => setFirstOpen(true)}>
          {_s} to {_e}
        </Button>
        <FilterMode
          onFilter={(e) => {
            setDataMode(e.target.outerText);
            console.log(e.target.outerText);
          }}
          value={dataMode}
        />
      </>
    );
  }, [filterText, resetPaginationToggle, data]);
  const gettotal = (data, status, target) => {
    var _data = data.filter(
      (d) => d.status.toLowerCase() === status.toLowerCase()
    );
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
  return (
    <>
      <Modal
        onClose={() => setFirstOpen(false)}
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
        dimmer="inverted"
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

      <div
        className="reportTable"
        style={{ height: "calc(100vh - 300px)", overflow: "auto" }}
      >
        <DataTable
          columns={columns}
          data={filteredItems}
          progressPending={loading}
          onChangeRowsPerPage={handlePerRowsChange}
          defaultSortFieldId={dataSortedID}
          paginationPerPage={perPage}
          defaultSortAsc={false}
          expandOnRowClicked={true}
          expandableRowsHideExpander={true}
          conditionalRowStyles={conditionalRowStyles}
          noDataComponent={noDataComponent}
          pagination
          paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
          persistTableHead
          paginationRowsPerPageOptions={[10, 25, 50, 100, 500]}
          expandableRows
          expandableRowsComponent={ExpandedComponent}
          paginationComponentOptions={{
            rowsPerPageText: footerTxt,
            rangeSeparatorText: "of",
            noRowsPerPage: false,
            selectAllRowsItem: false,
            selectAllRowsItemText: "All",
          }}
        />
      </div>
    </>
  );
}

export default Admin;
