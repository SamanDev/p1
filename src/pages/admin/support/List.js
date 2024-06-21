import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Segment,
  Button,
  Dimmer,
  Divider,
  Icon,
  Modal,
  Grid,
} from "semantic-ui-react";
import { convertDateToJalali } from "../../../utils/convertDate";

import { addDays } from "date-fns";
const moment = require("moment");
import { adminGetService } from "../../../services/admin";
import { getReportPenService } from "../../../services/report";
import Comment from "./Comment";

import Ticket from "./Add";

import DateReng from "../utils/dateReng";
import FilterMode from "./Filter";

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
  const [data, setData] = useState([]);
  const loginToken = prop.loginToken;
  const conditionalRowStyles = [
    {
      when: (row) => row.status == "Closed",
      style: {
        backgroundColor: "rgba(0,0,0,.1)",
      },
    },

    {
      when: (row) => row.status != "Closed",
      style: {
        backgroundColor: "rgba(255,0,0,.1)",
      },
    },
    {
      when: (row) =>
        row.status != "Closed" &&
        row.username != row.ticketMessages[0].adminUser,
      style: {
        backgroundColor: "rgba(0,255,0,.1)",
      },
    },
  ];
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [dataSortedID, setDataSortedID] = useState(1);
  const [dataSorted, setDataSorted] = useState("id");
  const [dataSortedDir, setDataSortedDir] = useState("desc");
  const [dataSearch, setDataSearch] = useState("");
  const [dataMode, setDataMode] = useState(["Open"]);
  const [getwaysList, setGetwaysData] = useState([]);

  const [startDate, setStartDate] = useState(addDays(new Date(), -14));
  const [endDate, setEndDate] = useState(addDays(new Date(), 1));
  const [loading, setLoading] = useState(false);

  const [filterText, setFilterText] = React.useState("");
  const [filterOk, setFilterOk] = React.useState(false);

  if (dataMode == "Open") {
    var filteredItems = data
      .sort((a, b) => (a.id < b.id ? 1 : -1))
      .filter(
        (item) =>
          item.ticketMessages.sort((a, b) => (a.id < b.id ? 1 : -1))[0]
            .adminUser == item.username
      );
  } else {
    var filteredItems = data
      .sort((a, b) => (a.id < b.id ? 1 : -1))
      .filter(
        (item) =>
          item.ticketMessages.sort((a, b) => (a.id < b.id ? 1 : -1))[0]
            .adminUser != "Admin"
      );
  }
  //.filter((item) => item.id);
  const [firstOpen, setFirstOpen] = React.useState(false);
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  // data provides access to your row data
  const getSampleMsg = async () => {
    try {
      var res = await getReportPenService("getMessageSample?mode=true", false);
      if (res.status === 200) {
        localStorage.setItem("sampleMessage", JSON.stringify(res.data));
      }
    } catch (error) {
      //console.log(error.message);
    } finally {
    }
  };
  const sortData = (data) => {
    return data.sort((a, b) => (a.id < b.id ? 1 : -1));
  };
  const ExpandedComponent = ({ data }) => (
    <div style={{ overflow: "auto" }}>
      <Segment inverted basic padded="very">
        <Ticket
          departman={data.department}
          id={data.id}
          userid={data.usersId}
          fetchUsers={fetchUsers}
          {...prop}
        />
        {data.status === "Open" ? (
          <Ticket
            departman={data.department}
            id={data.id}
            userid={data.usersId}
            {...prop}
            fetchUsers={fetchUsers}
            status="Close"
          />
        ) : (
          <Ticket
            departman={data.department}
            id={data.id}
            userid={data.usersId}
            {...prop}
            fetchUsers={fetchUsers}
            status="Open"
          />
        )}

        <Divider inverted />
        {data.ticketMessages
          .sort((a, b) => (a.id < b.id ? 1 : -1))
          .map((msg, j) => (
            <Comment msg={msg} key={j} data={data} />
          ))}
      </Segment>
    </div>
  );
  const fetchUsers = async (page) => {
    getSampleMsg();
    setLoading(true);
    var _s = moment(startDate).format("YYYY-MM-DD");
    var _e = moment(endDate).format("YYYY-MM-DD");
    if (prop?.user?.username) {
      var res = await adminGetService(
        `getTickets?page=${page}&number=500&status=${dataMode
          .toString()
          .replace("Open,Closed", "")}&username=${
          prop.user.username
        }&start=${_s}&end=${_e}`
      );
    } else {
      var res = await adminGetService(
        `getTickets?page=${page}&number=500&status=${dataMode
          .toString()
          .replace("Open,Closed", "")}&start=${_s}&end=${_e}`
      );
    }
    try {
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
      name: "username",
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
    },
    {
      name: "status",
      selector: (row) => row.status,
      format: (row) => <>{row.status}</>,
      sortable: true,
      width: "180px",
    },

    {
      name: "department",
      selector: (row) => row.department,
      format: (row) => <span className="farsi">{row.department}</span>,
      sortable: true,
      width: "120px",
    },
    {
      name: "Last Msg",
      selector: (row) => sortData(row.ticketMessages)[0].message,
      format: (row) => (
        <>
          <span className="fw-bold">{row.ticketMessages[0].adminUser}</span>

          <br />
          <span className="farsi">
            {sortData(row.ticketMessages)[0].message}
          </span>
        </>
      ),
      sortable: true,
      width: "720px",
    },

    {
      name: "date",
      selector: (row) => row.date,
      format: (row) => (
        <div className="blacktext">{convertDateToJalali(row.date)}</div>
      ),
      sortable: true,
    },
  ];

  const subHeaderComponentMemo = React.useMemo(() => {
    var _s = moment(startDate).format("YY-MM-DD");
    var _e = moment(endDate).format("YY-MM-DD");
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
            </Grid.Column>
            <Grid.Column>
              <Button
                className="float-end"
                color="red"
                onClick={() => fetchUsers(1)}
              >
                Search
              </Button>
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

      <div
        className="reportTable"
        style={{ height: "calc(100vh - 300px)", overflow: "auto" }}
      >
        {subHeaderComponentMemo}
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
        />
      </div>
    </>
  );
}

export default Admin;
