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
import { useParams } from "react-router-dom";
const moment = require("moment");
import { adminGetService, adminPutService } from "../../services/admin";
import { Alert } from "../../utils/alerts";
import AmountColor from "../../utils/AmountColor";
import CheckboxToggle from "./utils/toggle";
import AddGift from "./AddAmjReport";
import { convertDateToJalali } from "../../utils/convertDate";
import { doCurrency, levelDataInfo } from "../../const";

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
  var values = { id: curU.id, value: data.checked };

  try {
    const res = await adminPutService(values, "editVgcReport");
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

function Admin(prop) {
  const [data, setData] = useState([]);
  const loginToken = prop.loginToken;
  const [totalRows, setTotalRows] = useState(1000);
  const [dataSortedID, setDataSortedID] = useState(1);
  const [perPage, setPerPage] = useState(100);
  const [bank, setBank] = useState();
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
var filteredItems = data.filter(
    (item) =>
      item.username &&
      item.username.toLowerCase().includes(filterText.toLowerCase())
  );
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const handleChangeSearch = (e, { value }) => {
    setDataSearch(value);
  };
  const handleChangeLogin = (e, { value }) => {
    setDataLoginDay(value);
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

  var columns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
      width: "50px",
    },

    {
      name: "Desc",
      selector: (row) => row.description,
      format: (row) => (
        <>
          {row.description.indexOf("AmjadCard") > -1 ? (
            <>{prinDesc(row.description)}</>
          ) : (
            <>{row.description}</>
          )}
        </>
      ),
      sortable: true,
      width: "600px",
    },
    {
      name: "Start",
      selector: (row) => row.startBalance,
      format: (row) => <>{doCurrency(row.startBalance)}</>,
      sortable: true,
      width: "130px",
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      format: (row) => (
        <>
          <AmountColor
            amount={row.amount}
            sign={row.endBalance - row.startBalance}
          />
        </>
      ),
      sortable: true,
      width: "200px",
    },
    {
      name: "End",
      selector: (row) => row.endBalance,

      format: (row) => <>{doCurrency(row.endBalance)}</>,
      sortable: true,
      width: "130px",
    },

    {
      name: "Status",
      selector: (row) => row.status,
      format: (row) => (
        <>
          <CheckboxToggle
            check={row.status == "Pending" && row.amount < 0 ? false : true}
            disabled={row.amount < 0 ? false : true}
            user={row}
            userkey="id"
            onChange={updateUserObj}
          />
        </>
      ),
      sortable: true,
      width: "180px",
    },
    {
      name: "date",
      selector: (row) => row.date,
      format: (row) => (
        <>
          <div className="blacktext">{convertDateToJalali(row.date)}</div>
        </>
      ),
      sortable: true,
    },
  ];
  const fetchUsers = async (page) => {
    var _name = prop.search;
    var _val = prop.searchValue;
    var _contain = true;
 
    setLoading(true);
    try {
      const res = await adminGetService(`getVgcBank`);
      if (res.status === 200) {
        setBank(res.data);
        //setTotalRows(res.data.numberOfElements);
        // setFilterOk(false);
      }
    } catch (error) {
      //console.log(error.message);
    } finally {
      //setLoading(false);
    }
    try {
      const res = await adminGetService(
        `getVgcReport?name=${_name}&value=${_val}&page=${page}&number=500&login=${dataLoginDay}&contain=${_contain}`
      );
      if (res.status === 200) {
        setData(res.data.content);
        setTotalRows(res.data.numberOfElements);
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
  
  var filteredItems = data.filter(
    (item) =>
     
      item.description.toLowerCase().includes(filterText.toLowerCase())
  );
  useEffect(() => {
    //fetchUsers(1); // fetch page 1 of users
  }, [dataSearch]);

  useEffect(() => {
    //if (filterOk) fetchUsers(1); // fetch page 1 of users
  }, [filterOk]);

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
        newUser.level = user.level;
        newUser.amount = setGiftAmount(user.level);
        newUser.amount2 = parseFloat(
          setGiftAmount(user.level) / getRate
        ).toFixed(2);

        newSelect.push(newUser);
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
              Bank: {doCurrency(bank?.amount)} | Today:{" "}
              {doCurrency(bank?.liveAmount)}
              <Button
                className="float-end"
                color="red"
                onClick={() => fetchUsers(1)}
              >
                Reload
              </Button>
              <Button
                color="blue"
                className="float-end"
                onClick={() => setFirstOpen(true)}
              >
                Cashier
              </Button>
            </Grid.Column>

            <Grid.Column style={{ textAlign: "right" }}>
              Total: {doCurrency(bank?.amount + bank?.liveAmount)}
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
  }, [filterText, resetPaginationToggle, data, selectedList]);
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
      <Modal
        onClose={() => setFirstOpen(false)}
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
        size="large"
        style={{ height: "auto" }}
      >
        <AddGift selectedList={selectedList} setFirstOpen={setFirstOpen} />
      </Modal>
      <div style={{ height: "calc(100vh - 150px)", overflow: "auto" }}>
        {prop.search == "refer" && prop.searchValue != "bots" ? (
          <>
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
