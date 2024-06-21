import Swal from "sweetalert2";
import { doCurrency, updateBonusLabel } from "../const";
const moment = require("moment");
export const MyConfirm = (
  title,
  text,
  callBack,
  bonus,
  _bonuses,
  i,
  loginToken
) => {
  Swal.fire({
    title,
    html: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#21ba45",
    cancelButtonColor: "#db2828",
    confirmButtonText: "تایید",
    cancelButtonText: "بازگشت",
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(result.isConfirmed)
      callBack(bonus, _bonuses, i, loginToken);
    }
  });
};
export const MyDeposit = (title, text, openDeposit) => {
  Swal.fire({
    title,
    html: text,
    icon: "error",
    showCancelButton: true,
    confirmButtonColor: "#21ba45",
    cancelButtonColor: "#db2828",
    confirmButtonText: "افزایش موجودی",
    cancelButtonText: "بازگشت",
  }).then((result) => {
    if (result.isConfirmed) {
      openDeposit();
    }
  });
};
export const MyToast = (title, icon) => {
  const Toast = Swal.mixin({
    toast: true,
    background: "#000",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
      htmlContainer: "position-absolute p-2 lh-base",
      timerProgressBar: "bg-danger",
      actions: "",
      confirmButton: "ui button mini red",
    },
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon,
    title:
      "خطا:\n\n" +
      title
        .replace(
          "Error: Email is already in use!",
          "این ایمیل در گلکسی موجود است."
        )
        .replace(
          "Error: Username is already taken!",
          "این نام کاربری در گلکسی موجود است."
        ),
  });
};
export const MyToastDone = (title, icon) => {
  const Toast = Swal.mixin({
    toast: true,
    background: "#000",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
      htmlContainer: "position-absolute p-2 lh-base",
      timerProgressBar: "bg-success",
      actions: "",
      confirmButton: "ui button mini red",
    },
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon,
    title,
  });
};
export const MyToastActive = (title, handleOpenTable) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    confirmButtonText: "Open",
    padding: "1.2em",
    showCloseButton: true,
    buttonsStyling: false,
    customClass: {
      htmlContainer: "position-absolute p-2 lh-base",
      timerProgressBar: "bg-gold",
      actions: "",
      confirmButton: "ui button mini red",
    },
    background: "#000",
    timer: 3000,
    timerProgressBar: true,
  });

  Toast.fire({
    html:
      "<small class='text-gold lh-bold'>" +
      title.name +
      "</small><br/> is opened.",
  }).then((result) => {
    if (result.isConfirmed) {
      handleOpenTable(title.name);
    }
  });
};
export const MyToastReward = (bonus, getReward, loginToken, siteInfo) => {
  var newb = updateBonusLabel(bonus, loginToken, siteInfo);
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    confirmButtonText: "دریافت",
    padding: "1.2em",
    showCloseButton: true,
    buttonsStyling: false,
    customClass: {
      htmlContainer: "position-absolute p-2 ",
      timerProgressBar: "bg-success",
      actions: "",
      confirmButton: "ui button mini green",
    },
    background: "#000",
    timer: 10000,
    timerProgressBar: true,
  });

  Toast.fire({
    html:
      "<div class='text-gold  farsi fs-6'>" +
      newb.mytext +
      "</div><div class='lh-bold farsi text-secondary-emphasis'>" +
      doCurrency(bonus.amount) +
      " تومان</div>",
    iconHtml:
      "<img  src='/assets/images/" +
      bonus.mymode +
      ".webp' style='width: 40px' />",
  }).then((result) => {
    if (result.isConfirmed) {
      getReward(bonus);
    }
  });
};
function getRemaining() {
  const now = moment();
  const end = moment().format("YYYY-MM-DD 23:59:59");
  const then = moment(end);
  const diff = then.diff(now);
  const dur = moment.duration(diff);

  let parts = [];
  for (const part of ["hours", "minutes"]) {
    const d = dur[part]();
    dur.subtract(moment.duration(d, part));
    parts.push(d);
  }
  return parts;
}

function typeHour(rem) {
  var _left = "";
  if (rem[0] > 0) {
    _left = parseInt(rem[0]) + " ساعت";
  }
  if (rem[1] > 0) {
    _left = _left + " و " + parseInt(rem[1]) + " دقیقه";
  }

  return _left;
}
function getTotGpass(set, day, lvl) {
  var total = set[0].totalRewards;
  var totalget = 0;
  var totalgetCan = 0;
  var totalleft = 0;
  {
    set.map((x, i) => {
      if (x.level < lvl) {
        totalget += x.reward;
      }
      if (x.level < day) {
        totalgetCan += x.reward;
      }
    });
  }
  var _gpass = doCurrency(totalget) + " تومان دریافت کرده اید";
  if (totalgetCan - totalget > 0) {
    _gpass =
      _gpass +
      " که البته می توانستید مبلغ " +
      doCurrency(totalgetCan) +
      " تومان دریافت کرده باشید.";
  }
  return _gpass;
}

export const MyToastText = (loginToken, siteInfo, event) => {
  siteInfo?.galaxyPassSet?.sort((a, b) => (a.id > b.id ? 1 : -1));
  var gpassrules = siteInfo?.galaxyPassSet[0];
  siteInfo?.vipTables?.sort((a, b) => (a.id > b.id ? 1 : -1));
  var viprules = siteInfo?.vipTables[0];
  var levelData = siteInfo?.levelUps;
  const nowDate = new Date();
  const nowDay = nowDate.getDate();
  if (event == "GPass") {
    var passSec = gpassrules.hoursLimit * 3600 - loginToken.glevelSecond;
    var gLvlLeft = [
      new Date(passSec * 1000).toISOString().substring(11, 13),
      new Date(passSec * 1000).toISOString().substring(14, 16),
    ];

    const rem = getRemaining();
    var _left = typeHour(rem) + " مانده تا پایان روز " + nowDay + " گلکسی پس.";
    if (loginToken.glevel < nowDay) {
      _left =
        _left +
        "هم اکنون شما در مرحه " +
        loginToken.glevel +
        " هستید و تا الان مبلغ " +
        getTotGpass(siteInfo.galaxyPassSet, nowDay, loginToken.glevel);
    }
    var icon = "gpass";
    var newb =
      _left +
      "تا جایزه بعدی " +
      typeHour(gLvlLeft) +
      " بازی نیاز است. با بازی همرمان روی چند میز رودتر تمام می شود.";
  }
  const Toast = Swal.mixin({
    toast: true,
    position: "top",

    padding: "1.2em",
    buttonsStyling: false,
    showCloseButton: true,

    showConfirmButton: false,
    customClass: {
      htmlContainer: "p-2 ",
      timerProgressBar: "bg-success",
      actions: "",
      confirmButton: "ui button mini green",
    },
    background: "#000",
    timer: 100000,
    timerProgressBar: true,
  });

  Toast.fire({
    html: "<div class='farsi fs-6 pd-10'>" + newb + "</div>",
    iconHtml:
      "<img  src='/assets/images/icons/" +
      icon +
      ".webp' style='width: 40px' />",
  }).then((result) => {
    if (result.isConfirmed) {
    }
  });
};
