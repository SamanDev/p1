import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Segment, Button, Dimmer, Icon, Modal, Grid } from "semantic-ui-react";
import { convertDateToJalali } from "../../../utils/convertDate";
import { adminPostService } from "../../../services/admin";
import CartFormat from "../../../utils/CartFormat";
import { addDays } from "date-fns";
const moment = require("moment");
import { adminGetService } from "../../../services/admin";
import { Alert } from "../../../utils/alerts";

import CheckboxToggle from "../utils/toggle";
import DateReng from "../utils/dateReng";
import FilterMode from "./FilterCheck";

const conditionalRowStyles = [
  {
    when: (row) => !row.active,
    style: {
      backgroundColor: "rgba(0,0,255,.1)",
    },
  },
  // You can also pass a callback to style for additional customization
  {
    when: (row) => row.active,
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
var _timer = 10000;
function Admin(prop) {
  const [data, setData] = useState([]);

  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [dataSortedID, setDataSortedID] = useState(1);
  const [dataSorted, setDataSorted] = useState("id");
  const [dataSortedDir, setDataSortedDir] = useState("desc");
  const [dataSearch, setDataSearch] = useState("");
  const [dataMode, setDataMode] = useState("All");
  const [getwaysList, setGetwaysData] = useState([]);

  const [startDate, setStartDate] = useState(addDays(new Date(), -14));
  const [endDate, setEndDate] = useState(addDays(new Date(), 1));
  const [loading, setLoading] = useState(true);

  const [filterText, setFilterText] = React.useState("");
  const [filterOk, setFilterOk] = React.useState(false);

  var filteredItems = data.filter((item) => item.cardNumber);
  if (dataMode != "All") {
    filteredItems = data.filter((item) => {
      return dataMode == "true" ? item.active : !item.active;
    });
  }
  const [firstOpen, setFirstOpen] = React.useState(false);
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  // data provides access to your row data
  const ExpandedComponent = ({ data }) => (
    <div style={{ overflow: "auto", width: "90vw" }}>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
  const updateUserObj = async (e, data) => {
    var _key = data.userkey;
    var curU = JSON.parse(JSON.stringify(data.user));
    var values = { id: curU.id, active: data.checked };

    try {
      const res = await adminPostService(values, "editUserBankInfo");
      if (res.status == 200) {
      } else {
        Alert("متاسفم...!", res.data.message, "error");
      }
    } catch (error) {
      Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
    }
  };
  const fetchUsers = async (page) => {
    setLoading(true);
    var _s = moment(startDate).format("YYYY-MM-DD");
    var _e = moment(endDate).format("YYYY-MM-DD");

    try {
      const res = await adminGetService(
        `getAllUserBankInfo?page=${page}&number=500&start=${_s}&end=${_e}`
      );
      if (res.status === 200) {
        if (res.data?.content) {
          setData(res.data.content);
        } else {
          setData(res.data);
        }

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
    fetchUsers(1); // fetch page 1 of users
  }, []);

  useEffect(() => {
    // if (!firstOpen && filterOk) fetchUsers(1); // fetch page 1 of users
  }, [filterOk, firstOpen]);
  const updateStatus = (row, status) => {
    var pay = row;
    var id = pay.userId;
    adminService.changeReportStatus("deposit", id, status).then((response) => {
      if (response) {
        Swal.fire({
          title: "Success",
          text: "Saved",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: `Ok`,
        }).then(() => {});
      }
    });
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
      selector: (row) => row.active,
      format: (row) => (
        <>
          <CheckboxToggle
            check={row.active}
            user={row}
            userkey="cartBlock"
            onChange={updateUserObj}
          />
        </>
      ),
      sortable: true,
      width: "180px",
    },

    {
      name: "Info",
      selector: (row) => row.cardNumber,
      format: (row) => <CartFormat row={row} />,
      sortable: true,
      width: "250px",
    },
    {
      name: "Date",
      selector: (row) => row.date,
      format: (row) => (
        <div className="blacktext">{convertDateToJalali(row.date)}</div>
      ),
      sortable: true,
    },
  ];
  const subHeaderComponentMemo = React.useMemo(() => {
    var _s = moment(startDate).format("YYYY-MM-DD");
    var _e = moment(endDate).format("YYYY-MM-DD");
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
  }, [filterText, resetPaginationToggle, data]);

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
        style={{ height: "calc(100vh - 250px)", overflow: "auto" }}
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
          conditionalRowStyles={conditionalRowStyles}
          noDataComponent={noDataComponent}
          pagination
          paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
          persistTableHead
          paginationRowsPerPageOptions={[10, 25, 50, 100, 500]}
        />
      </div>
    </>
  );
}

export default Admin;
