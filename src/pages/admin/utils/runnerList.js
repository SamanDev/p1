import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Input,
  Segment,
  Button,
  Dimmer,
  Loader,
  Icon,
  Modal,Image,
  Grid, StatisticValue,
  StatisticLabel,
  StatisticGroup,
  Divider,
  Statistic,
} from "semantic-ui-react";
import Moment from "react-moment";
import { addDays } from "date-fns";
const moment = require("moment");
import AmountColor from "../../../utils/AmountColor";
import { adminGetService, adminPutService,adminPostService } from "../../../services/admin";
import { Alert } from "../../../utils/alerts";
import AddCashier from "../AddRunner";
import CheckboxToggle from "./toggle";
import AddCredit from "../AddCredit";

import { haveAdmin, haveModerator, doCurrency,doCurrencyMil } from "../../../const";
const conditionalRowStyles = [
  {
    when: (row) => row.liveChip - row.baseAmount < 0,
    style: {
      backgroundColor: "rgba(255,0,0,.1)",
    },
  },
  // You can also pass a callback to style for additional customization
  {
    when: (row) => row.liveChip - row.baseAmount > 0,
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
  const [dataStat, setDataStat] = useState();
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [dataSortedID, setDataSortedID] = useState(1);

  const [dataSearch, setDataSearch] = useState("");
  const [dataLoginDay, setDataLoginDay] = useState("");
  const siteInfo = prop.siteInfo;
  const [selectedList, setSelected] = useState([]);
  const [getwaysList, setGetwaysData] = useState([]);
  const [obj, setObj] = useState({});
  const [loading, setLoading] = useState(false);
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
      const res = await adminGetService(`getRunners2`);
      if (res.status === 200) {
        setData(res.data.runnerList);
        setDataStat(res.data)
        setFilterOk(false);
      }
    } catch (error) {
      //console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchSession = async (username) => {
   
    var values = {'username':username}
    

    //setLoading(true);
    try {
      const res = await adminPostService(values,`getPokerSession`);
      if (res.status === 200) {
        window.open(siteInfo.pokerUrl+"?LoginName="+username+"&SessionKey="+res.data.SessionKey,"_blank")
        //console.log(res.data.SessionKey);
        
      }
    } catch (error) {
      //console.log(error.message);
    } finally {
     
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
    item.refer=="Admin" &&
    //item.amount != item.liveChip &&
      (item.username.toLowerCase().includes(filterText.toLowerCase())||item.refer.toLowerCase().includes(filterText.toLowerCase()))
  );
 
  const columns = [
   

    {
      name: "Username",
      selector: (row) => row.username,
      format: (row) => (
        <>
        {row.refer=="Admin" &&<Button onClick={()=>{ fetchSession(row.username)}} size="mini">login</Button> }
          <span
            className="msglink fw-bold"
            onClick={() => prop.addTabData(row.username)}
          >
            {row.username}
          </span>  {" "}
          
          
        </>
      ),
      sortable: true,
      width: "180px",
    },
   
    {
      name: "Amount",
      selector: (row) => row.liveChip-row.baseAmount,
      format: (row) => <>{doCurrencyMil(row.liveChip-row.baseAmount)}</>,
      sortable: true,
    },
    {
      name: "Rake",
      selector: (row) => row.liveRake,
      format: (row) => <>{doCurrencyMil(row.liveRake)}</>,
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
    var _data = data.filter((d) => d.liveRake != 0);
    var _totalReward = 0;
    {
      _data.map((x, i) => {
        var _am = x.liveRake;

        _totalReward = _totalReward + _am;
      });
    }
    if (target == "total") return _totalReward;
    if (target == "count") return _data.length;
  };
  const gettotal3 = (data, status, target) => {
    if (!data) return 0;
    var _data = data.filter((d) => d.win != 0);
    var _totalReward = 0;
    {
      _data.map((x, i) => {
        var _am = x.onTables;

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
        "ontable (" +
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
              <h1>{prop.searchValue}</h1>
            </Grid.Column>
            <Grid.Column>
              <Button color="red" onClick={() => fetchUsers(1)}>
                Reload
              </Button>
              <Button
                color="blue"
                className="float-end"
                onClick={() => setCashierOpen(true)}
              >
                Add
              </Button>
              {selectedList.length > 0 && (
                <Button color="red" onClick={() => setFirstOpen(true)}>
                  Credit {selectedList.length}
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
  }, [filterText, resetPaginationToggle, data, selectedList]);
  const ontable  = gettotal3(filteredItems, "Done", "total")
  const botTotalLive  = dataStat?.botTotalLive
  const tot = botTotalLive +dataStat?.runnerTotalLive +ontable
  if (loading) {
    return (
      <>
     
       <Segment basic>
      <Dimmer  active >
        <Loader size='huge'>Loading</Loader>
      </Dimmer>
      <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
      
    </Segment>
      </>
    );
  }
  if (filteredItems.length==0) {
    return (
      <>
     
       <Segment basic>
      <Button color="teal" size="huge" inverted style={{marginTop:50}} onClick={() => fetchUsers(1)}>
                  Click to Load
                </Button>
      
    </Segment>
      </>
    );
  }
  return (
    <>
     
     <Button color="teal" size="mini" onClick={() => fetchUsers(1)}  style={{position:'absolute',top:-42,right:20}}>
                  Reload
                </Button>
                <Segment attached    >
              
        <StatisticGroup  widths='four' size={'mini'}>
          <Statistic  color={botTotalLive>0?"green":"red"}>
            <StatisticValue>{botTotalLive>0?"+":""}{doCurrencyMil(botTotalLive)}</StatisticValue>
            <StatisticLabel>bots</StatisticLabel>
          </Statistic>
     
          <Statistic  color={dataStat?.runnerTotalLive>0?"green":"red"}>
            <StatisticValue>{dataStat?.runnerTotalLive>0?"+":""}{doCurrencyMil(dataStat?.runnerTotalLive)}</StatisticValue>
            <StatisticLabel>runners</StatisticLabel>
          </Statistic>
     
     
          <Statistic  color="green">
            <StatisticValue>+{doCurrencyMil(ontable)}</StatisticValue>
            <StatisticLabel>onTables</StatisticLabel>
          </Statistic>
          <Statistic  color={tot>0?"green":"red"}>
            <StatisticValue>{tot>0?"+":""}{doCurrencyMil(tot)}</StatisticValue>
            <StatisticLabel>Total</StatisticLabel>
          </Statistic>
         
        </StatisticGroup>
        
      </Segment>
      <DataTable
          columns={columns}
          data={filteredItems}
          progressPending={loading}
          onChangeRowsPerPage={handlePerRowsChange}
          paginationPerPage={perPage}
          defaultSortFieldId={2}
          defaultSortAsc={false}
          expandOnRowClicked={true}
          expandableRowsHideExpander={true}
          conditionalRowStyles={conditionalRowStyles}
          noDataComponent={noDataComponent}
         
        />
    </>
  );
}

export default Admin;
