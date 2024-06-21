import axios from "axios";
import { Alert } from "../utils/alerts";
import { MyConfirm, MyToast, MyDeposit, MyToastDone } from "../utils/myAlert";
import { APIURL } from "../const";
import UserWebsocket from "./user.websocket";
import eventBus from "./eventBus";
export const apiPath = APIURL.onlinePath;

export function checkBlock(res) {
  var data = res.data ? res.data : res;

  var loginKey = localStorage.getItem("galaxyUserkeyToken");

  var loginToken = JSON.parse(localStorage.getItem(loginKey + "Token"));

  if (loginToken) {
    if (loginToken.username == data.username) {
      if (!data.userBlock) {
        localStorage.setItem(data.username + "Token", JSON.stringify(data));

        eventBus.dispatch("updateUser", data);

        UserWebsocket.connect(
          data.accessToken + "&user=" + data.username,
          data
        );
      } else {
        UserWebsocket.disconnect();
        window.location = "/logout";
      }
    }
  } else {
    if (!data.userBlock) {
      localStorage.setItem("galaxyUserkeyToken", data.username);
      localStorage.setItem(data.username + "Token", JSON.stringify(data));
      eventBus.dispatch("updateUser", data);
      UserWebsocket.disconnect();
      UserWebsocket.connect(data.accessToken + "&user=" + data.username, data);
    } else {
      eventBus.dispatch("updateUser", {});
      UserWebsocket.disconnect();
      UserWebsocket.connect();
      // window.location = "/";
    }
  }
}

axios.interceptors.response.use(
  (res) => {
    if (res.status == 200) {
      if (res.data?.accessToken) {
        checkBlock(res);
      } else {
        if (res.data?.message && res.data?.result == "ok") {
          MyToastDone(res.data.message, "success");
        }
      }
    }
    if (res.status != 200 && res.status != 201) {
      if (typeof res.data == "object") {
        let message = "";
        for (const key in res.data) {
          message = message + `${key} : ${res.data[key]}`;
        }
        res.data.message = message;
      }

      Alert("مشکل...!", res.data.message, "warning");
    }

    return res;
  },
  (error) => {
    if (error.response.status == 401 || error.response.status == 400) {
      //MyToast("متاسفانه مشکلی از سمت سرور رخ داده", "error");
      //window.location = "/logout";
      if (localStorage.getItem("galaxyUserkeyToken")) {
        localStorage.setItem(
          "oldgalaxyUserkey",
          localStorage.getItem("galaxyUserkeyToken")
        );
        // localStorage.removeItem("galaxyUserkeyToken");
      }

      //window.location.href = "/login";
      // eventBus.dispatch("updateUser", null);
      //UserWebsocket.connect();
    }
    if (
      error.response.status != 401 &&
      error.response.status != 400 &&
      error.response.status != 200
    ) {
      MyToast("متاسفانه مشکلی از سمت سرور رخ داده", "error");
      //   MyToast(error.response.data.message, "error");
      // Alert(error.response.status, error.response.data.message, "error");
    }
    if (error.response.status == 400) {
      //MyToast("نام کاربری یا کلمه عبور اشتباه است.", "error");
      MyToast(error.response.data.message, "error");
      // Alert(error.response.status, error.response.data.message, "error");
    }
    if (error.response.status == 401) {
      var loginKey = localStorage.getItem("galaxyUserkeyToken");

      var loginToken = JSON.parse(localStorage.getItem(loginKey + "Token"));
      if (loginToken) {
        UserWebsocket.disconnect();
        window.location = "/logout";
      } else {
        MyToast("نام کاربری یا کلمه عبور اشتباه است.", "error");
      }
    }
    MyToast(error.response.data.message, "error");

    return Promise.reject(error);
  }
);

export const httpService = (url, method, data = null) => {
  var loginKey = localStorage.getItem("galaxyUserkeyToken");

  var tokenInfo = JSON.parse(localStorage.getItem(loginKey + "Token"));
  return axios({
    url: apiPath + "/api" + url,
    method,
    data,

    timeout: 60000,

    headers: {
      Authorization: tokenInfo ? `LooLe  ${tokenInfo.accessToken}` : null,
    },
  });
};
