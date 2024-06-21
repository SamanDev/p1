import { USERSOCKETURL, USERSOCKETPUBLICURL } from "../const";
import eventBus from "./eventBus";

var ws = null;
var ws2;
var res = false;
var timeout = 35000;
var timerId;
var usr;
var tkn = false;
var count = 0;

class UserWebsocket {
  connect(token, user) {
    var _t = token && !user?.logout ? "/users?token=" + token : "/public";

    if (ws == null) {
      ws = new WebSocket(USERSOCKETPUBLICURL + _t);
      if (token) {
        tkn = true;
      } else {
        tkn = false;
      }
      ws.onopen = function live() {
        eventBus.dispatch("eventsConnect", "");
        if (token) {
          tkn = true;
        } else {
          tkn = false;
        }

        console.log("Socket is connected.");
      };
    } else {
      //console.log(tkn);
      //token = null;
      //tkn = false;
    }
    ws.onmessage = function (data) {
      var message = data.data;
      //  new UserWebsocket().serverMessage(data.data);
      function isJson(str) {
        // alert("str00 = "+str)
        try {
          JSON.parse(str);
        } catch (e) {
          // alert('no JSON')
          return false;
        }
        // alert('yes JSON')
        return true;
      }
      if (isJson(message)) {
        var msg = JSON.parse(message);

        //alert((msg.Command))
        if (msg.Command === "updateUser") {
          eventBus.dispatch("updateUser", msg.data);
        } else if (msg.Command === "ActiveTables") {
          eventBus.dispatch("updateActiveTables", msg.data);
        } else if (msg.Command === "pushLastRewards") {
          eventBus.dispatch("updateLastReward", msg.data);
        } else if (msg.Command === "updateSetting") {
          eventBus.dispatch("updateSiteInfo", msg.data);
        }
      } else {
        if (message === "closeConnection") {
          ws?.close();
          ws = null;
          if (tkn) {
            eventBus.dispatch("eventsDC", "");
          }
        } else if (message === "PasswordChanged") {
          eventBus.dispatch(
            "eventsDataPass",
            "Your password has been updated."
          );
        } else if (message === "AccountActivated") {
          eventBus.dispatch(
            "eventsDataActive",
            "Your account has been activated."
          );
          //eventBus.dispatch("eventsDC", '');
        } else if (message == "Pong") {
          res = true;
        }
      }
    };
    ws.onerror = function (e) {
      if (e.type === "error") {
        ws?.close();
        ws = null;
        if (tkn) {
          eventBus.dispatch("eventsDC", "");
        }
        //localStorage.setItem("user", JSON.stringify(defUser));
        //eventBus.dispatch("eventsDC", "");
        // localStorage.clear();
        //window.location.reload();
        //window.location.replace("/auth/login-page");
      }
    };
  }

  disconnect() {
    ws?.close();
    ws = null;
    if (tkn) {
      eventBus.dispatch("eventsDC", "");
    }
  }
}

export default new UserWebsocket();
