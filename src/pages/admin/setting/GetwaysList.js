import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Button,
  Dimmer,
  Loader,
  Modal,
  Form,
  Input,
  Icon,
} from "semantic-ui-react";

import CheckboxToggle from "../utils/toggle";
import {
  adminGetService,
  adminPutServiceList,
  adminPostService,
} from "../../../services/admin";
import { Alert } from "../../../utils/alerts";

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
        <img
          alt="nodata"
          style={{ height: 80 }}
          src="/assets/images/nodata.svg"
        ></img>
        <h4>Empty List.</h4>
        <h5>You currently don't have any report.</h5>
      </div>
    </Dimmer>
  </div>
);
const getGateways = JSON.parse(localStorage.getItem("getGateways"));
function Admin(prop) {
  const [firstOpen, setFirstOpen] = React.useState(false);
  const [getName, setGetName] = React.useState("");
  const [getMode, setGetMode] = React.useState("");
  const [loading, setLoading] = useState(false);
  String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, "g"), replacement);
  };

  String.prototype.toPersianCharacter = function () {
    var string = this;

    var obj = {
      "١": "۱",
      "٢": "۲",
      "٣": "۳",
      "٤": "۴",
      "٥": "۵",
      "٦": "۶",
      "٧": "۷",
      "٨": "۸",
      "٩": "۹",
      "٠": "۰",
      "۱": "1",
      "۲": "2",
      "۳": "3",
      "۴": "4",
      "۵": "5",
      "۶": "6",
      "۷": "7",
      "۸": "8",
      "۹": "9",
      "۰": "0",
    };

    Object.keys(obj).forEach(function (key) {
      string = string.replaceAll(key, obj[key]);
    });
    return string;
  };

  const handleGetGeteways = async () => {
    if (getGateways) {
      setDataTransaction(getGateways);
    } else {
      setLoading(true);
      try {
        const res = await adminGetService("getGateways");
        if (res.status === 200) {
          var sorted = res.data?.sort((a, b) => (a.id > b.id ? 1 : -1));
          localStorage.setItem("getGateways", JSON.stringify(sorted));
          setDataTransaction(sorted);
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

  const OpenChashier = (open) => {
    setFirstOpen(open);
  };
  const setGetNameVal = (e) => {
    setGetName(e.target.value);
  };
  const setGetModeVal = (e) => {
    setGetMode(e.target.value);
  };

  const [filterText, setFilterText] = React.useState("");
  const [exMode, setExMode] = React.useState("Data");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const [dataTransaction, setDataTransaction] = React.useState([]);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      format: (row) => row.id,
      sortable: true,
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      format: (row) => row.name,
      width: "250px",
      sortable: true,
    },
    {
      name: "Mode",
      selector: (row) => row.mode,
      format: (row) => row.mode,

      sortable: true,
    },
    {
      name: "Bonus",
      selector: (row) => row.bonus,
      format: (row) =>
        row.mode == "CoinPayments" ||
        row.mode == "PerfectMoney" ||
        row.mode == "BankTransfer" ||
        row.mode == "Commission" ||
        row.mode == "Rakeback" ||
        row.mode == "VisaGiftCode" ? (
          <Input
            name="bonus"
            defaultValue={row.bonus}
            id={"bonus" + row.id}
            user={row}
            onChange={updateUserObj}
            style={{ width: "100px" }}
          />
        ) : (
          row.bonus
        ),

      sortable: true,
      width: "300px",
    },
    {
      name: "Active",
      selector: (row) => row.active,
      format: (row) => (
        <CheckboxToggle
          check={row.active}
          user={row}
          onChange={updateUserObj}
        />
      ),
      sortable: true,
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
      sortable: true,
    },
  ];

  const addGetway = async (e, Data) => {
    var newData = { name: getName, mode: getMode };
    try {
      const res = await adminPostService(newData, "addGateway");
      if (res.status == 200) {
        localStorage.setItem("getGateways", JSON.stringify(newData));
      } else {
        Alert("متاسفم...!", res.data.message, "error");
      }
    } catch (error) {
      Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
    }
  };
  const subHeaderComponentMemo = React.useMemo(() => {
    return <></>;
  }, []);
  const updateUserObj = async (e, eData) => {
    var newData = dataTransaction;
    console.log(eData);
    var curU = JSON.parse(JSON.stringify(eData.user));

    curU.active = eData.checked;

    if (eData.value) {
      var _val = eData.value.toPersianCharacter();
      var val = parseInt(_val);
      if (val > 130) {
        val = 130;
      }
      if (val === null || isNaN(val)) {
        val = 0;
      }
      console.log(val);

      curU.bonus = val;
    }

    for (var i = 0; i < newData.length; i++) {
      if (newData[i].id === curU.id) {
        newData[i] = curU;
        break;
      }
    }
    try {
      document.getElementById(eData.id).value = val;
    } catch (error) {}

    try {
      const res = await adminPutServiceList(newData, "editGateways");
      if (res.status == 200) {
        localStorage.setItem("getGateways", JSON.stringify(newData));
      } else {
        Alert("متاسفم...!", res.data.message, "error");
      }
    } catch (error) {
      Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
    }
    console.log(newData);
  };
  const updateUserObjDelete = async (e, eData) => {
    var newData = dataTransaction;

    var curU = JSON.parse(JSON.stringify(eData.user));

    for (var i = 0; i < newData.length; i++) {
      if (newData[i].id === curU.id) {
        newData.splice(i, 1);
        break;
      }
    }

    try {
      const res = await adminPutServiceList(newData, "editGateways");
      if (res.status == 200) {
        localStorage.setItem("getGateways", JSON.stringify(newData));
      } else {
        Alert("متاسفم...!", res.data.message, "error");
      }
    } catch (error) {
      Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
    }
    console.log(newData);
  };
  if (loading) {
    return (
      <>
        <Dimmer active inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
      </>
    );
  }
  return (
    <>
      <Modal
        onClose={() => setFirstOpen(false)}
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
        size="mini"
        style={{ height: "auto" }}
      >
        <Modal.Header>Add New Getway</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Name</label>
              <input value={getName} onChange={setGetNameVal} />
            </Form.Field>
            <Form.Field>
              <label>Mode</label>
              <input value={getMode} onChange={setGetModeVal} />
            </Form.Field>

            <br />
            <br />
            <Button
              type="submit"
              loading={loading}
              disabled={loading}
              color="black"
              fluid
              onClick={addGetway}
            >
              Submit
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
      <div style={{ height: "calc(100vh - 150px)", overflow: "auto" }}>
        <h2>
          <Icon
            link
            name="close"
            onClick={() => {
              prop.removeTabData("Gateways");
            }}
          />{" "}
          Getways List
          <Button
            color="red"
            onClick={() => setFirstOpen(true)}
            style={{ float: "right" }}
          >
            Add Getways
          </Button>
        </h2>
        <DataTable
          data={dataTransaction}
          columns={columns}
          defaultSortFieldId={4}
          defaultSortAsc={false}
          noDataComponent={noDataComponent}
          pagination
          paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        />
      </div>
    </>
  );
}

export default Admin;
