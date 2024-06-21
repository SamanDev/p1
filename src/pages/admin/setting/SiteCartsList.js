import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Button, Dimmer, Icon, Modal } from "semantic-ui-react";
import { convertDateToJalali } from "../../../utils/convertDate";
import CartFormat from "../../../utils/CartFormat";
import { addDays } from "date-fns";
const moment = require("moment");
import { adminGetService, adminPutServiceList } from "../../../services/admin";
import { Alert } from "../../../utils/alerts";
import AddCart from "./AddCart";
import CheckboxToggle from "../utils/toggle";

const conditionalRowStyles = [
  {
    when: (row) => !row.active,
    style: {
      backgroundColor: "rgba(0,0,255,.1)",
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

  const [startDate, setStartDate] = useState(addDays(new Date(), -6));
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const [filterText, setFilterText] = React.useState("");
  const [filterOk, setFilterOk] = React.useState(false);
  var filteredItems = data.filter((item) => item.cardNumber);
  if (dataMode != "All") {
    filteredItems = data.filter((item) => {
      return dataMode == item.active;
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
  const updateUserObj = async (e, eData) => {
    var newData = data;

    var curU = JSON.parse(JSON.stringify(eData.user));
    curU.active = eData.checked;

    for (var i = 0; i < newData.length; i++) {
      if (newData[i].id === curU.id) {
        newData[i] = curU;
        break;
      }
    }

    try {
      const res = await adminPutServiceList(newData, "editSiteBankCards");
      if (res.status == 200) {
        Alert("Done", "انجام شد.", "success");
      } else {
        Alert("متاسفم...!", res.data.message, "error");
      }
    } catch (error) {
      Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
    }
    console.log(newData);
  };
  const updateUserObjDelete = async (e, eData) => {
    var newData = data;

    var curU = JSON.parse(JSON.stringify(eData.user));

    for (var i = 0; i < newData.length; i++) {
      if (newData[i].id === curU.id) {
        newData.splice(i, 1);
        break;
      }
    }

    try {
      const res = await adminPutServiceList(newData, "editSiteBankCards");
      if (res.status == 200) {
      } else {
        Alert("متاسفم...!", res.data.message, "error");
      }
    } catch (error) {
      Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
    }
    console.log(newData);
  };
  const fetchUsers = async (page) => {
    setLoading(true);
    var _s = moment(startDate).format("YYYY-MM-DD");
    var _e = moment(endDate).format("YYYY-MM-DD");

    try {
      const res = await adminGetService(`getSiteBankCards`);
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
    fetchUsers(1); // fetch page 1 of users
  }, [dataSorted, dataSortedDir]);

  useEffect(() => {
    if (!firstOpen && filterOk) fetchUsers(1); // fetch page 1 of users
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
      name: "Info",
      selector: (row) => row.cardNumber,
      format: (row) => <CartFormat row={row} />,
      sortable: true,
      width: "300px",
    },
    {
      name: "date",
      selector: (row) => row.createDate,
      format: (row) => (
        <div className="blacktext">{convertDateToJalali(row.createDate)}</div>
      ),
      sortable: true,
      width: "200px",
    },
    {
      name: "status",
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
      width: "100px",
    },
    {
      name: "Delete",
      selector: (row) => row.active,
      format: (row) => (
        <CheckboxToggle
          check={row.active}
          user={row}
          onChange={updateUserObjDelete}
        />
      ),
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
        <Button onClick={() => setFirstOpen(true)}>Add Cart</Button>
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
        basic
        size="mini"
      >
        <div className="myaccount popupmenu">
          <AddCart size="mini" labelcolor="orange" setFilterOk={setFilterOk} />
        </div>
      </Modal>

      <div
        className="reportTable"
        style={{ height: "calc(100vh - 250px)", overflow: "auto" }}
      >
        <h2>
          <Icon
            link
            name="close"
            onClick={() => {
              prop.removeTabData("SiteCarts");
            }}
          />{" "}
          Site Carts List
          <Button
            color="red"
            onClick={() => setFirstOpen(true)}
            style={{ float: "right" }}
          >
            Add New Cart
          </Button>
        </h2>
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
