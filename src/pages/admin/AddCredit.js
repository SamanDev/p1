import React, { useState } from "react";
import {
  Input,
  Segment,
  Button,
  Dimmer,
  Loader,
  Modal,
  Form,
  Select,
  Radio,
  Icon,
} from "semantic-ui-react";
import { Alert } from "../../utils/alerts";
import { levelDataInfo } from "../../const";
import CurrencyInput from "react-currency-input-field";
import { adminPostService } from "../../services/admin";
import $ from "jquery";
const moment = require("moment");
var __bnus = [
  {
    key: 1,

    value: "Gift",
    label: "هدیه",
    text: "Free Gift",
  },
];
function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}
const setGiftAmount = (level, min, max) => {
  var g = generateRandomInteger(min, max);

  if (level >= levelDataInfo[4].minLevel) {
    if (g < levelDataInfo[4].minAmount || g > levelDataInfo[4].maxAmount) {
      var g = generateRandomInteger(
        levelDataInfo[4].minAmount,
        levelDataInfo[4].maxAmount
      );
    }
  } else if (level >= levelDataInfo[5].minLevel) {
    if (g < levelDataInfo[5].minAmount || g > levelDataInfo[5].maxAmount) {
      var g = generateRandomInteger(
        levelDataInfo[5].minAmount,
        levelDataInfo[5].maxAmount
      );
    }
  } else {
    if (g < levelDataInfo[6].minAmount || g > levelDataInfo[6].maxAmount) {
      var g = generateRandomInteger(
        levelDataInfo[6].minAmount,
        levelDataInfo[6].minAmount * (level + 1)
      );
    }
  }

  g = Math.round(g / 1000) * 1000;
  return g;
};

var mindate = new Date();
var nowdate = new Date();
var expdate = new Date();
nowdate = moment(nowdate).format("YYYY-MM-DD HH:00:00");
mindate = moment(mindate).format("YYYY-MM-DD HH:00:00");
expdate = moment(expdate).add(6, "hours").format("YYYY-MM-DD HH:mm:00");
function Admin(prop) {
  const [myState, setMyState] = useState({
    list: [
      { id: "start", val: nowdate },
      { id: "plus", val: 6 },
      { id: "plusText", val: { key: "hours", value: "hours", text: "Hours" } },

      { id: "expired", val: expdate },
      { id: "usd", val: false },
      { id: "min", val: 100000 },
      { id: "max", val: 3000000 },
      { id: "mode", val: __bnus[0].value },
      { id: "text", val: __bnus[0].text },
      { id: "label", val: __bnus[0].label },
      { id: "selectedList", val: prop.selectedList },
    ],
  });

  const setUsers = (data) => {
    data.players.map((player, i) => {
      setTimeout(() => {
        addGift(player);
      }, 500 * i);
    });
  };
  const addGift = async (data) => {
    $("#res" + data.username).html(
      '<i aria-hidden="true" class="spinner loading icon">'
    );
    try {
      var _d = data;
      if (!_d.amount || _d.amount < 100000) {
        _d.amount = 1000000;
      }
      const res = await adminPostService(_d, "runnerService");
      if (res.status == 200) {
        $("#res" + data.username).html(
          '<i aria-hidden="true" class="checkmark green icon">'
        );
      } else {
        Alert("متاسفم...!", res.data.message, "error");
      }
    } catch (error) {
      Alert(player.username, "متاسفانه مشکلی از سمت سرور رخ داده", "error");
    }
  };
  const findStateId = (st, val) => {
    return st.list.filter(function (v) {
      return v.id === val;
    })[0].val;
  };
  const onUpdateItem = (key, val) => {
    if (findStateId(myState, key) != val) {
      setMyState(() => {
        const list = myState.list.map((item) => {
          if (item.id === key) {
            item.val = val;
          }
          return item;
        });

        return {
          list: list,
        };
      });
    }
  };

  const [loading, setLoading] = useState(false);

  const updateEnd = () => {
    var now = new Date(findStateId(myState, "start"));

    var end = moment(now).add(
      findStateId(myState, "plus"),
      findStateId(myState, "plusText").value
    );

    var endFormat = moment(end).format("YYYY-MM-DD HH:mm:00");
    onUpdateItem("expired", endFormat);

    // 1
  };

  function capitalizeFirstLetter(str) {
    return str[0].toUpperCase() + str.slice(1);
  }
  function updateUserSelected(i, value, name) {
    var _new = selectedList;
    _new[i].min = parseInt(value);
    console.log(_new);
    console.log(i);

    //setSelected(selectedList);
  }

  if (loading) {
    return (
      <>
        <Segment style={{ height: "calc(100vh - 150px)", overflow: "auto" }}>
          <Dimmer active inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>
        </Segment>
      </>
    );
  }
  return (
    <>
      <Modal.Header>
        Add Credit{" "}
        <Button
          floated="right"
          onClick={() => {
            setUsers({
              startDate: moment(findStateId(myState, "start")).valueOf(),
              expireDate: moment(findStateId(myState, "expired")).valueOf(),

              mode: findStateId(myState, "mode"),
              usd: findStateId(myState, "usd"),
              status: "Pending",
              label: findStateId(myState, "label"),
              text: findStateId(myState, "text"),
              players: findStateId(myState, "selectedList"),
            });
          }}
        >
          Add
        </Button>
      </Modal.Header>

      <Modal.Content>
        {findStateId(myState, "selectedList").map((user, i) => {
          return (
            <Form key={i}>
              <Form.Group inline>
                <Form.Field width={4}>
                  <label>
                    {user.username} ({user.refer} - R:{user.percent} - W:
                    {user.winPercent})
                  </label>
                  <span id={"res" + user.username}></span>
                </Form.Field>
                <Form.Field width={6}>
                  <Input type="text" disabled={findStateId(myState, "usd")}>
                    <CurrencyInput
                      name="minuses"
                      allowDecimals={false}
                      defaultValue={3000000}
                      onValueChange={(value, name) => {
                        if (parseInt(value) != 0) {
                          user.amount = parseInt(value);
                        }
                      }}
                    />
                  </Input>
                </Form.Field>
                <Form.Field width={6}>
                  <Input type="text" disabled={!findStateId(myState, "usd")}>
                    <CurrencyInput
                      name="minuses"
                      allowDecimals={false}
                      defaultValue={user.amount2}
                      onValueChange={(value, name) => {
                        if (parseInt(value) != 0) {
                          user.amount2 = parseInt(value);
                        }
                      }}
                    />
                  </Input>
                </Form.Field>
              </Form.Group>
            </Form>
          );
        })}
      </Modal.Content>
    </>
  );
}

export default Admin;
