import React, { useState, useEffect } from "react";
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
import SendMail from "./SendMail.jsx";
import SendNotif from "./Notification.jsx";
import $ from "jquery";
import { notification, adminGetService } from "../../services/admin";
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
var _deflevelsAmount = [2.0, 0.5, 0.5, 0.5, 0.5, 0.2, 0.2];
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
      { id: "subject", val: "" },
      { id: "title", val: "" },
      { id: "body", val: "" },

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
  const siteInfo = prop.siteInfo;
  const setUsers = (data) => {
    data.players.map((player, i) => {
      setTimeout(() => {
        var newData = {
          username: player.username,
          subject: data.subject,
          title: data.title,
          body: data.body + "<br/>" + player.link,
        };
        console.log(newData);
        addGift(newData);
      }, 3000 * i);
    });
  };
  const addGift = async (data) => {
    $("#res" + data.username).html(
      '<i aria-hidden="true" class="spinner loading icon">'
    );
    try {
      const res = await adminPostService(data, "mailService");
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
  const [tokenlist, setTokenlist] = useState([]);

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
    var _l = parseFloat((parseInt(level) - 30) / 10);
    if (level < 30) {
      amount = _deflevelsAmount[1];
      _l = parseFloat((parseInt(level) - 10) / 20);
    }

    if (level < 10) {
      amount = _deflevelsAmount[5];
      _l = parseFloat((parseInt(level) - 5) / 10);
    }
    if (level < 4) {
      amount = _deflevelsAmount[6];
      _l = parseFloat((parseInt(level) - 2) / 10);
    }

    console.log(_l);

    amount = parseFloat(amount + _l).toFixed(2) * 1000000;
    return amount;
  }
  function userAgentDetect(userAgent) {
    if (
      userAgent.match(/Mobile/i) ||
      userAgent.match(/iPhone/i) ||
      userAgent.match(/iPod/i) ||
      userAgent.match(/IEMobile/i) ||
      userAgent.match(/Windows Phone/i) ||
      userAgent.match(/Android/i) ||
      userAgent.match(/BlackBerry/i) ||
      userAgent.match(/webOS/i)
    ) {
      return "Mobile";
    }
    if (
      userAgent.match(/Tablet/i) ||
      userAgent.match(/iPad/i) ||
      userAgent.match(/Nexus 7/i) ||
      userAgent.match(/Nexus 10/i) ||
      userAgent.match(/KFAPWI/i)
    ) {
      return "Tablet";
    } else {
      return "Desktop";
    }
  }
  const getTokens = async (id, user) => {
    var old = tokenlist;
    $(".gettk" + user + "").remove();
    try {
      const res = await adminGetService("getConnectionInfoByUser?id=" + id);
      if (res.status === 200) {
        var listtojen = res.data.filter(
          (e) => e.token && e.origin.indexOf("local") == -1
        );
        listtojen.map((x, i) => {
          $("#" + user + "tokens").append(
            "<div id='tk" +
              x.id +
              "'>" +
              i +
              ": " +
              userAgentDetect(x.userAgent) +
              "</div>"
          );

          old.push({ x });

          //$("#res"+user).append("<div>"+x.token+"</div>")
        });
        console.log(listtojen);
        if (listtojen.length == 0) {
          $("#" + user + "tokens")
            .parents("form")
            .remove();
        }
        setTokenlist(old);
      }
    } catch (error) {
      //console.log(error.message);
    } finally {
      $(".gettk:first").trigger("click");
    }
  };

  const sendNot = (tit, body, image) => {
    findStateId(myState, "selectedList").map((user, i) => {
      setTimeout(() => {
        sendNotTo(user, tit, body, image);
      }, 3000 * i);
    });
  };

  const sendNotTo = async (too, tit, body, image) => {
    if (body == "") {
      return false;
    }
    var data = {
      username: too.username,
      message: body,
      title: tit,
      image: image,
    };
    $("#res" + too.username).html(
      '<i aria-hidden="true" class="spinner loading icon">'
    );
    try {
      const res = await adminPostService(data, "notification");
      $("#res" + too.username).html(
        '<i aria-hidden="true" class="checkmark green icon">'
      );
    } catch (error) {}
    return false;
    var to = too["x"];
    console.log(to);
    $("#tk" + to.id).html(
      '<i aria-hidden="true" class="spinner loading icon">'
    );
    var key =
      "AAAANfV_1y4:APA91bFHck-BWMnLILoZAEdxkgMcrMt8ejdEPds67021cn24H2t1aXuP9_FiKlY970_MbHeDCAqNWv58oFiRBa3nBkFB_SIGfmEjqjMjOOTG6k3dYyd-syETfSFBZtigxCZS4t1HrLww";
    //var to =
    //"dGcxXqSf79ngUr2-BYzX6i:APA91bEJj79IpURgSk5m7OnsNhoTn_IIYjNw8BnR2GMAC_mxxmL8YrdagiY91njhsi2EFGWLGDhuQ7wrZUYLkiRPuueSLIVWx_GDHqgIqTMgEAmEheAZ5UH1ADbVK-ijMzVqeNexrFDS";
    var notification2 = {
      title: tit,
      body: body,
      icon: image,
      dir: "rtl",
      actions: [{ action: "archive", title: "Archive" }],
    };

    fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        Authorization: "key=" + key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notification: notification2,
        to: to.token,
      }),
    })
      .then(function (response) {
        $("#tk" + to.id).html(
          '<i aria-hidden="true" class="checkmark green icon">'
        );
      })
      .catch(function (error) {
        console.error(error);
      });
    /* notification(cashUser, title, notMessage, image).then((response) => {
    if (response) {
      Swal.fire({
        title: "Success",
        text: "Saved",
        icon: "success",
        showCancelButton: false,
        confirmButtonText: `Ok`,
      }).then(() => {
        setCashLoad(false);
      });
    }
  }); */
  };
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
  if (prop.mode == "notif") {
    return (
      <>
        <Modal.Header>
          Send Notif{" "}
          <Button
            floated="right"
            onClick={() => {
              sendNot(
                findStateId(myState, "title"),
                findStateId(myState, "body"),
                findStateId(myState, "subject")
              );
            }}
          >
            Send
          </Button>
        </Modal.Header>

        <Modal.Content>
          <SendNotif onUpdateItem={onUpdateItem} {...prop} />
        </Modal.Content>
        <Modal.Content>
          <Segment inverted>
            {findStateId(myState, "selectedList").map((user, i) => {
              return (
                <Form key={i}>
                  <Form.Group inline>
                    <Form.Field width={4}>
                      <label style={{ color: "#fff" }}>
                        {user.username} ({user.level})
                      </label>
                      <span
                        id={"res" + user.username}
                        style={{ color: "#fff" }}
                      ></span>
                    </Form.Field>
                  </Form.Group>
                </Form>
              );
            })}
          </Segment>
          {/*   <Segment inverted hide>
            {findStateId(myState, "selectedList").map((user, i) => {
              return (
                <Form key={i}>
                  <Form.Group inline>
                    <Form.Field width={4}>
                      <label style={{ color: "#fff" }}>
                        {user.username} ({user.level})
                      </label>
                      <Button
                        className={"gettk gettk" + user.username}
                        onClick={() => getTokens(user.id, user.username)}
                      >
                        get
                      </Button>
                    </Form.Field>
                    <Form.Field width={6}>
                      <div id={user.username + "tokens"}></div>
                    </Form.Field>
                  </Form.Group>
                </Form>
              );
            })}
          </Segment> */}
        </Modal.Content>
      </>
    );
  }
  return (
    <>
      <Modal.Header>
        Send Mail{" "}
        <Button
          floated="right"
          onClick={() => {
            setUsers({
              subject: findStateId(myState, "subject"),
              title: findStateId(myState, "title"),
              body: findStateId(myState, "body"),

              players: findStateId(myState, "selectedList"),
            });
          }}
        >
          Send
        </Button>
      </Modal.Header>

      <Modal.Content>
        <SendMail onUpdateItem={onUpdateItem} {...prop} />
      </Modal.Content>
      <Modal.Content>
        <Segment inverted>
          {findStateId(myState, "selectedList").map((user, i) => {
            return (
              <Form key={i}>
                <Form.Group inline>
                  <Form.Field width={4}>
                    <label style={{ color: "#fff" }}>
                      {user.username} ({user.level})
                    </label>
                    <span
                      id={"res" + user.username}
                      style={{ color: "#fff" }}
                    ></span>
                  </Form.Field>
                  <Form.Field width={6}>
                    <Input type="text" value={user.link}></Input>
                  </Form.Field>
                </Form.Group>
              </Form>
            );
          })}
        </Segment>
      </Modal.Content>
    </>
  );
}

export default Admin;
