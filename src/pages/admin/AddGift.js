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
var _deflevels = [30, 25, 20, 15, 10, 5];
var _deflevelsAmount = [2.0, 0.5, 0.5, 0.5, 0.5, 0.2,0.2];
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
      { id: "min", val: 100000 },
      { id: "usd", val: false },
      { id: "defbol", val: false },
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
        var _amount = data.usd ? 0 : player.amount;
        if (findStateId(myState, "defbol") && !findStateId(myState, "usd")) {
          _amount = getLevelGift(player.level);
        }
        var newData = {
          username: player.username,
          startDate: data.startDate,
          amount: _amount,
          amount2: data.usd ? player.amount2 : 0,
          expireDate: data.expireDate,
          mode: data.mode,

          status: data.status,
          label: data.label,
          text: data.text,
        };
        addGift(newData);
      }, 500 * i);
    });
  };
  const addGift = async (data) => {
    $("#res" + data.username).html(
      '<i aria-hidden="true" class="spinner loading icon">'
    );
    try {
      const res = await adminPostService(data, "addGift");
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
  function getLevelGift(level) {
    var amount = _deflevelsAmount[0];
    var _l =  parseFloat((parseInt(level)-30)/10);
    if (level < 30) {
      amount = _deflevelsAmount[1];
      _l =  parseFloat((parseInt(level)-10)/20);
    }
   
    if (level < 10) {
      amount = _deflevelsAmount[5];
      _l =  parseFloat((parseInt(level)-5)/10);
    }
    if (level < 4) {
      amount = _deflevelsAmount[6];
      _l =  parseFloat((parseInt(level)-2)/10);
    }
    
   console.log(_l)
    
    amount = parseFloat((amount+_l)).toFixed(2) * 1000000;
    return amount;
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
        Add Gift{" "}
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
        <Form>
          <Form.Field width={4}>
            Dollar:
            <Radio
              toggle
              checked={findStateId(myState, "usd")}
              onChange={(e, { value }) =>
                onUpdateItem("usd", !findStateId(myState, "usd"))
              }
            />{" "}
            | DefaultGift:
            <Radio
              toggle
              checked={findStateId(myState, "defbol")}
              onChange={(e, { value }) => {
                onUpdateItem("usd", false);
                onUpdateItem("defbol", !findStateId(myState, "defbol"));
              }}
            />
          </Form.Field>
          <Form.Group inline>
            <Form.Field width={4}>
              <label>Start</label>
              <Input
                type="text"
                value={findStateId(myState, "start")}
                min={mindate}
                onChange={(e) => onUpdateItem("start", e.target.value)}
                onBlur={(e) => updateEnd()}
              />
            </Form.Field>
            <Form.Field width={4}>
              <label>Plus</label>
              <Input
                type="text"
                inputMode="number"
                value={findStateId(myState, "plus")}
                onChange={(e) => onUpdateItem("plus", e.target.value)}
                onBlur={(e) => updateEnd()}
              />
            </Form.Field>

            <Form.Field width={4}>
              <Select
                options={[
                  { key: "minutes", value: "minutes", text: "Minutes" },
                  { key: "hours", value: "hours", text: "Hours" },
                ]}
                value={findStateId(myState, "plusText").value}
                onChange={(e, { value }) =>
                  onUpdateItem("plusText", {
                    key: value.toLowerCase(),
                    value: value.toLowerCase(),
                    text: capitalizeFirstLetter(value),
                  })
                }
                onBlur={(e) => updateEnd()}
              />
            </Form.Field>

            <Form.Field width={4}>
              <label>Expired</label>
              <Input type="text" value={findStateId(myState, "expired")} />
            </Form.Field>
          </Form.Group>
          <Form.Group inline>
            {_deflevels.map((def, i) => {
              return (
                <Form.Field width={16} key={i}>
                  <label>{_deflevels[i]}</label>
                  <Input type="text" disabled={!findStateId(myState, "defbol")}>
                    <CurrencyInput
                      value={_deflevelsAmount[i] * 1000000}
                      name="min"
                      allowDecimals={false}
                      onValueChange={(value, name) => {
                        if (value < parseInt(findStateId(myState, "max"))) {
                          onUpdateItem(name, parseInt(value));
                        }
                      }}
                    />
                  </Input>
                </Form.Field>
              );
            })}
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Content>
        {findStateId(myState, "selectedList").map((user, i) => {
          return (
            <Form key={i}>
              <Form.Group inline>
                <Form.Field width={4}>
                  <label>
                    {user.username} ({user.level})
                  </label>
                  <span id={"res" + user.username}></span>
                </Form.Field>
                <Form.Field width={6}>
                  <Input
                    type="text"
                    disabled={
                      findStateId(myState, "usd") ||
                      findStateId(myState, "defbol")
                    }
                  >
                    <CurrencyInput
                      name="minuses"
                      allowDecimals={false}
                      defaultValue={user.amount}
                      onValueChange={(value, name) => {
                        if (parseInt(value) != 0) {
                          user.amount = parseInt(value);
                        }
                      }}
                    />
                  </Input>
                </Form.Field>
                <Form.Field width={6}>
                  <Input
                    type="text"
                    disabled={
                      findStateId(myState, "usd") ||
                      !findStateId(myState, "defbol")
                    }
                  >
                    <CurrencyInput
                      name="minuses"
                      allowDecimals={false}
                      defaultValue={getLevelGift(user.level)}
                    />
                  </Input>
                </Form.Field>
                <Form.Field width={6}>
                  <Input
                    type="text"
                    disabled={
                      !findStateId(myState, "usd") ||
                      findStateId(myState, "defbol")
                    }
                  >
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
