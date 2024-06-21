import React, { useState ,useEffect} from "react";
import DataTable from "react-data-table-component";
import {
  Segment,
  Dimmer,
  Loader,
  Icon,Button,Image,Label
} from "semantic-ui-react";
import Moment from "react-moment";
const moment = require("moment");
import { adminGetService } from "../../../services/admin";


import LevelIcon from "../../../utils/svg";
import {
  doCurrency,levelClassInside,doCurrencyMil
} from "../../../const";

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


function Admin(prop) {
  const [data, setData] = useState([]);
  const loginToken = prop.loginToken;
  const [totalRows, setTotalRows] = useState(1000);
  const [perPage, setPerPage] = useState(10);
  const [dataSortedID, setDataSortedID] = useState(1);

  const [loading, setLoading] = useState(false);

  const [filterText, setFilterText] = React.useState("");
  const [filterOk, setFilterOk] = React.useState(false);

  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
 
  var columns = [
 

    {
      name: "username",
      selector: (row) => row.username,
      format: (row) => (
        <>
          <span
            className="msglink fw-bold"
            onClick={() => prop.addTabData(row.username, prop.getwaysList)}
          >
            <LevelIcon
                      level={row.level}
                      text=""
                      mode="levels"
                      classinside={levelClassInside(row.level)}
                      number=""
                      width="20px"
                    />
            {row.username}
          </span>
          
          
        </>
      ),
      sortable: true,
      grow: 2,
    },

    {
      name: "Point",
      selector: (row) => (row.dailyPoint),
      format: (row) => (
        <>
         
              {doCurrencyMil(row.dailyPoint)}
            
        </>
      ),
      sortable: true,
    },

    {
      name: "balance",
      selector: (row) => row.balance,
      format: (row) => <>{doCurrencyMil(row.balance)}</>,
      sortable: true,
    },
    {
      name: "Tot",
      selector: (row) => row.totalCashout-row.totalDeposit,
      format: (row) => <><Label size="tiny" color={row.totalCashout-row.totalDeposit>0?"green":"red"}>
      {doCurrencyMil(row.totalCashout-row.totalDeposit)}
  </Label></>,
      sortable: true,
    },
   
    {
      name: "lastLogin",
      selector: (row) => row.lastLogin,
      format: (row) => (
        <>
          <Moment fromNow ago>
            {row.lastLogin.replace("-08:00", "")}
          </Moment>
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
      const res = await adminGetService(
        `getUsersByAdmin?name=chip&value=&page=1&number=250&login=&contain=false`
      );
      if (res.status === 200) {
        setData(res.data.users);
        setTotalRows(res.data.count);
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

 
  var filteredItems = data.filter((item) => item.refer !='runner' &&item.refer !='bots' &&item.balance >=1000000 );


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
      <Button color="blue" size="huge" inverted style={{marginTop:50}} onClick={() => fetchUsers(1)}>
                  Click to Load
                </Button>
      
    </Segment>
      </>
    );
  }
  return (
    <>
     
     <Button color="blue" size="mini" onClick={() => fetchUsers(1)}  style={{position:'absolute',top:-42,right:20}}>
                  Reload
                </Button>
            <DataTable
              columns={columns}
              data={filteredItems}
              progressPending={loading}
              paginationPerPage={500}
              paginationServer
            
              onChangeRowsPerPage={handlePerRowsChange}
              defaultSortFieldId={3}
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
