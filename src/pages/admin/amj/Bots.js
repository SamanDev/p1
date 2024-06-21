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
import { adminGetService, adminPutService } from "../../../services/admin";
import { Alert } from "../../../utils/alerts";

import CheckboxToggle from "../utils/toggle";
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
  const [dataSortedID, setDataSortedID] = useState(1);

  const [dataSearch, setDataSearch] = useState("");
  const [dataLoginDay, setDataLoginDay] = useState("");
  const [getwaysList, setGetwaysData] = useState([]);

  const [selectedList, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setDataSortedID(5);
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

    setLoading(true);
    try {
      const res = await adminGetService(
        `getUsersByAdmin?name=${_name}&value=${_val}&page=${page}&number=500&login=${dataLoginDay}&contain=${_contain}`
      );
      if (res.status === 200) {
        setData(res.data.users);
        setTotalRows(res.count);
        setFilterOk(false);
      }
    } catch (error) {
      //console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers(1); // fetch page 1 of users
  }, [dataSearch]);
  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };

  var filteredItems = data.filter(
    (item) =>
      item.username &&
      item.username.toLowerCase().includes(filterText.toLowerCase())
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
        var newUser = {};
        newUser.username = user.username;

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

  useEffect(() => {
    handleGetGeteways();
  }, []);

  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
      width: "100px",
    },
    {
      name: "Level",
      selector: (row) => row.level,
      format: (row) => <>{row.level}</>,
      sortable: true,
      width: "100px",
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
      width: "180px",
    },
    {
      name: "Balance",
      selector: (row) => row.balance,
      format: (row) => <>{doCurrency(row.balance)}</>,
      sortable: true,
    },
    {
      name: "Credit",
      selector: (row) => row.balance,
      format: (row) => <>{doCurrency(row.balance)}</>,
      sortable: true,
    },
    {
      name: "lastLogin",
      selector: (row) => row.lastLogin,
      format: (row) => (
        <>
          <Moment fromNow ago>
            {row.lastLogin}
          </Moment>
        </>
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

    return (
      <>
        <Grid verticalAlign="middle" columns={2} as={Segment} color="red">
          <Grid.Row>
            <Grid.Column>
              <h1>{prop.searchValue}</h1>
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
  }, [filterText, resetPaginationToggle, data]);

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
        onClose={() => setFirstOpen(false)}
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
        size="large"
        style={{ height: "auto" }}
      >
        <AddGift selectedList={selectedList} />
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
        />
      </div>
    </>
  );
}

export default Admin;
