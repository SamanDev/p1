import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Segment,
  Button,
  Dimmer,
  Icon,
  Modal,
  Label,
  Grid,
} from "semantic-ui-react";
import { doCurrency } from "../../../const";
import { addDays } from "date-fns";
import AmountColor from "../../../utils/AmountColor";
import { adminGetService } from "../../../services/admin";
import { convertDateToJalali } from "../../../utils/convertDate";
import DateReng from "../utils/dateReng";
import FilterMode from "./FilterGift";
import FilterModeGateway from "./FilterGateway";

import Moment from "react-moment";
import CshList from "../../../utils/commitiondetail";
const moment = require("moment");
const conditionalRowStyles = [
  // You can also pass a callback to style for additional customization
  {
    when: (row) =>
      row.endBalance > row.startBalance || row.endBalance2 > row.startBalance2,
    style: {
      backgroundColor: "rgba(0,255,0,.1)",
    },
  },
  {
    when: (row) =>
      row.endBalance < row.startBalance || row.endBalance2 < row.startBalance2,
    style: {
      backgroundColor: "rgba(255,0,0,.1)",
    },
  },
  {
    when: (row) => row.status == "Canceled",
    style: {
      backgroundColor: "rgba(255,0,0,.4)",
    },
  },
  {
    when: (row) => row.status == "Pending",
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

function Admin(prop) {
  const [data, setData] = useState([]);
  const loginToken = prop.loginToken;
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [dataSortedID, setDataSortedID] = useState(11);
  const [dataSorted, setDataSorted] = useState("id");
  const [dataSortedDir, setDataSortedDir] = useState("desc");
  const [dataSearch, setDataSearch] = useState("");
  const [userSearch, setUserSearch] = useState(
    prop?.user?.username ? prop.user.username : ""
  );
  if (prop?.user?.username) {
    var defmde = [""];
  } else {
    var defmde = [""];
  }

  const [dataMode, setDataMode] = useState(defmde);
  const [getwaysList, setGetwaysData] = useState([]);

  const [startDate, setStartDate] = useState(addDays(new Date(), -1));
  const [endDate, setEndDate] = useState(addDays(new Date(), +1));
  const [loading, setLoading] = useState(false);
  const [footerTxt, setFooterTxt] = useState("");

  const [filterText, setFilterText] = React.useState("");
  const [filterOk, setFilterOk] = React.useState(false);
  const filteredItems = data.filter(
    (f) => new Date(f.startDate) > new Date(startDate)
  );
  const [firstOpen, setFirstOpen] = React.useState(false);
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  // data provides access to your row data

  const sortData = (data) => {
    return data.sort((a, b) => (a.id < b.id ? 1 : -1));
  };
  const ExpandedComponent = ({ data }) => (
    <div style={{ overflow: "auto", width: "90vw" }}>
      {data?.detail && (
        <Grid
          verticalAlign="middle"
          divided="vertically"
          inverted
          padded="vertically"
        >
          <Grid.Row>
            <Grid.Column width={16} style={{ margin: 0 }}>
              <CshList item={data.detail} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
  const fetchUsers = async (page) => {
    if (loading) return;
    setLoading(true);
    var _s = moment(startDate).format("YYYY-MM-DD");
    var _e = moment(endDate).format("YYYY-MM-DD");
    try {
      if (prop?.user?.username) {
        var res = await adminGetService(
          `getUserGifts?mode=${dataMode}&page=${page}&number=5000&username=${prop.user.username}&start=${_s}&end=${_e}&gateway=${dataSearch}`
        );
      } else {
        var res = await adminGetService(
          `getUserGifts?mode=${dataMode}&page=${page}&number=5000&username=${userSearch}&start=${_s}&end=${_e}&gateway=${dataSearch}`
        );
      }

      if (res.status === 200) {
        if (res.data?.content) {
          setData(res.data.content);
          try {
            prop.setData(res.data.content);
          } catch (error) {}
        } else {
          setData(res.data);
        }

        setFilterOk(false);
      }
    } catch (error) {
      //console.log(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    fetchUsers(page);
  };
  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
    setFilterOk(true);
  };

  const handleSort = (column, sortDirection) => {
    console.log(sortDirection);
    setDataSortedID(column.id);
    setDataSorted(column.name);
    setDataSortedDir(sortDirection);
  };
  const gettotal = (data, status, target) => {
    if (!data) return 0;
    var _data = data.filter(
      (d) => d.status.toLowerCase() === status.toLowerCase() && d.amount != 0
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
  const gettotal2 = (data, status, target) => {
    if (!data) return 0;
    var _data = data.filter(
      (d) => d.status.toLowerCase() === status.toLowerCase() && d.amount2 != 0
    );
    var _totalReward = 0;
    {
      _data.map((x, i) => {
        var _am = x.amount2;
        _totalReward = _totalReward + _am;
      });
    }
    if (target == "total") return _totalReward;
    if (target == "count") return _data.length;
  };
  const getDesc = (link, ftxt) => {
    ftxt = ftxt + "@" + link.toUpperCase() + "@";
    if (
      doCurrency(
        gettotal2(
          filteredItems.filter((f) => f.mode.toLowerCase() == link),
          "Done",
          "count"
        )
      ) > 0
    ) {
      ftxt =
        ftxt +
        "Done (" +
        doCurrency(
          gettotal2(
            filteredItems.filter((f) => f.mode.toLowerCase() == link),
            "Done",
            "count"
          )
        ) +
        "): " +
        doCurrency(
          gettotal2(
            filteredItems.filter((f) => f.mode.toLowerCase() == link),
            "Done",
            "total"
          )
        ) +
        "$  َ  َ  َ |  َ  َ  َ  ";
    }
    if (
      doCurrency(
        gettotal2(
          filteredItems.filter((f) => f.mode.toLowerCase() == link),
          "Pending",
          "count"
        )
      ) > 0
    ) {
      ftxt =
        ftxt +
        " Pending (" +
        doCurrency(
          gettotal2(
            filteredItems.filter((f) => f.mode.toLowerCase() == link),
            "Pending",
            "count"
          )
        ) +
        "): " +
        doCurrency(
          gettotal2(
            filteredItems.filter((f) => f.mode.toLowerCase() == link),
            "Pending",
            "total"
          )
        ) +
        "$  َ  َ  َ |  َ  َ  َ  ";
    }
    if (
      doCurrency(
        gettotal(
          filteredItems.filter((f) => f.mode.toLowerCase() == link),
          "Done",
          "count"
        )
      ) > 0
    ) {
      ftxt =
        ftxt +
        "Done (" +
        doCurrency(
          gettotal(
            filteredItems.filter((f) => f.mode.toLowerCase() == link),
            "Done",
            "count"
          )
        ) +
        "): " +
        doCurrency(
          gettotal(
            filteredItems.filter((f) => f.mode.toLowerCase() == link),
            "Done",
            "total"
          )
        ) +
        "  َ  َ  َ |  َ  َ  َ  ";
    }
    if (
      gettotal(
        filteredItems.filter((f) => f.mode.toLowerCase() == link),
        "Pending",
        "count"
      ) > 0
    ) {
      ftxt =
        ftxt +
        " Pending (" +
        doCurrency(
          gettotal(
            filteredItems.filter((f) => f.mode.toLowerCase() == link),
            "Pending",
            "count"
          )
        ) +
        "): " +
        doCurrency(
          gettotal(
            filteredItems.filter((f) => f.mode.toLowerCase() == link),
            "Pending",
            "total"
          )
        ) +
        "  َ  َ  َ |  َ  َ  َ  ";
    }
    ftxt = ftxt + "@";
    return ftxt;
  };
  useEffect(() => {
    var ftxt = "";
    var link = dataMode;
    if (link != "") {
      ftxt = getDesc(link.toLowerCase(), ftxt);
    }
    setFooterTxt(ftxt);
  }, [filteredItems, dataMode]);
  useEffect(() => {
    try {
      prop.setStartDate(startDate);
      prop.setEndDate(endDate);
    } catch (error) {}
  }, [startDate, endDate]);
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
          <span onClick={() => setUserSearch(row.username)}>
            {row.username}
          </span>{" "}
          -{" "}
          <span
            className="msglink fw-bold"
            onClick={() => prop.addTabData(row.username)}
          >
            Open
          </span>
        </>
      ),
      sortable: true,
      width: "180px",
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
          {row.amount2 ? (
            <>
              <AmountColor amount={row.amount2} sign={1} /> $
            </>
          ) : (
            <AmountColor amount={row.amount} sign={1} />
          )}
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
          <div className="blacktext">
            {convertDateToJalali(row.startDate, "HH:mm:ss")}
          </div>
          <Moment fromNow>{row.startDate.replace("-08:00", "")}</Moment>
        </>
      ),
      sortable: true,
    },
    {
      name: "expireDate",
      selector: (row) => row.expireDate,
      format: (row) => (
        <>
          <div className="blacktext">
            {convertDateToJalali(row.expireDate, "HH:mm:ss")}
          </div>
          <Moment fromNow>{row.expireDate.replace("-08:00", "")}</Moment>
        </>
      ),
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      format: (row) => (
        <>
          <div className="blacktext">
            {convertDateToJalali(row.date, "HH:mm:ss")}
          </div>
          <Moment fromNow>{row.date.replace("-08:00", "")}</Moment>
        </>
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
              <FilterMode
                onFilter={(e, { value }) => {
                  setDataMode(value.toString());
                }}
                value={dataMode}
              />
            </Grid.Column>
            <Grid.Column textAlign="right">
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
              {userSearch != "" ? (
                <Label
                  as="a"
                  color="orange"
                  tag
                  onClick={() => setUserSearch("")}
                >
                  {userSearch}
                </Label>
              ) : (
                <FilterModeGateway
                  onFilter={(e) => {
                    setUserSearch(e.target.value);
                  }}
                  value={userSearch}
                  placeholder={"Username"}
                />
              )}

              {dataSearch != "" ? (
                <Label as="a" color="red" tag onClick={() => setDataSearch("")}>
                  {dataSearch}
                </Label>
              ) : (
                <FilterModeGateway
                  onFilter={(e) => {
                    setDataSearch(e.target.value);
                  }}
                  value={dataSearch}
                  placeholder={"Gateway filter"}
                />
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }, [
    filterText,
    resetPaginationToggle,
    data,
    dataSearch,
    dataMode,
    startDate,
    endDate,
    userSearch,
  ]);

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

      {subHeaderComponentMemo}
      <DataTable
        columns={columns}
        data={filteredItems}
        progressPending={loading}
        defaultSortFieldId={dataSortedID}
        //onChangeRowsPerPage={handlePerRowsChange}
        paginationPerPage={perPage}
        defaultSortAsc={false}
        expandOnRowClicked={true}
        expandableRowsHideExpander={true}
        conditionalRowStyles={conditionalRowStyles}
        noDataComponent={noDataComponent}
        pagination
        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        persistTableHead
        expandableRows
        expandableRowsComponent={ExpandedComponent}
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

      <Segment inverted>
        {footerTxt.split("@").map((item, key) => {
          return (
            <div key={key}>
              {item}
              <br />
            </div>
          );
        })}
      </Segment>
      {prop.mychaty && <>{prop.mychaty}</>}
    </>
  );
}

export default Admin;
