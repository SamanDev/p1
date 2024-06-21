import React from "react";
import Moment from "react-moment";
const moment = require("moment");
moment.updateLocale("en", {
  relativeTime: {
    future: "%s مانده",
    past: "%s قبل",
    s: "چند ثانیه",
    ss: "%d ثانیه",
    m: "یک دقیقه",
    mm: "%d دقیقه",
    h: "یک ساعت",
    hh: "%d ساعت",
    d: "یک روز",
    dd: "%d روز",
    w: "یک هفته",
    ww: "%d هفته",
    M: "یک ماه",
    MM: "%d ماه",
    y: "یک سال",
    yy: "%d سال",
  },
});
var SHARE_SITES = {
  ICAL: "iCal",
  GOOGLE: "Google",
};
var SHARE_SITES_ICON = ["Apple", "Google"];
var zones = "+03:30";
var nowzne = moment().format("MMDDHHmm");
var nowzne1 = "03220000";
var nowzne2 = "09220000";

if (nowzne > nowzne1 && nowzne < nowzne2) {
  zones = "+04:30";
}

function getchatTime(date) {
  var thisDate2 = date;
  var dateExpired = moment(thisDate2).format("YYYYMMDDTHHmmss" + zones);

  return dateExpired;
}

class Example extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var now = moment().format("YYYYMMDDTHHmmssZ");
    now = moment(now)
      .utc()
      .utcOffset(zones)
      .format("YYYYMMDDTHHmmss" + zones);

    var nowDay = moment(now).date();
    var nowMonth = moment(now).month();
    var start = parseInt(this.props.startDay);
    var dur = parseInt(this.props.dur);
    var dir = start - nowDay;
    var end = parseInt(this.props.endDay);
    var _next = false;
    var _start = false;
    var _finish = false;
    var __start = moment(now)
      .set({ date: start })
      .format("YYYYMMDDT" + this.props.startHour + "00");

    if (start <= nowDay) {
      _start = true;
    }
    if (end - nowDay < 0) {
      _finish = true;
    }
    if (dir < 0 && end != start) {
      _next = true;
    }

    if (end >= 31 && this.props.startHour == "0000") {
      var today = new Date();
      var lastDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      );

      end = moment(lastDayOfMonth).date();
      //end = lastDayOfMonth.toString();
    }

    var startDatetimeOld = getchatTime(__start);
    if (_finish) {
      //now = moment(now).add(1, "months").format("YYYYMMDDTHHmmssZ");
      __start = moment(__start)
        .set({ month: nowMonth + 1 })
        .format("YYYYMMDDT" + this.props.startHour + "00");

      _next = false;
    }
    var __end = moment(__start)
      .set({ date: end })
      .format("YYYYMMDDT" + this.props.endHour + "00");
    var __endOld = moment(__end).format(
      "YYYYMMDDT" + this.props.endHour + "00"
    );
    if (_next) {
      __start = moment(__start)
        .set({ month: nowMonth + 1 })
        .format("YYYYMMDDT" + this.props.startHour + "00");
    }

    var __end = moment(__start)
      .set({ date: end })
      .format("YYYYMMDDT" + this.props.endHour + "00");

    if (__end < __start) {
      __end = moment(__start)
        .set({ date: end, month: nowMonth + 1 })
        .format("YYYYMMDDT" + this.props.endHour + "00");
      __endOld = moment(__end).format("YYYYMMDDT" + this.props.endHour + "00");
    } else {
      //_next = true;
    }

    var startTime = getchatTime(__start);

    var endDatetimeOld = getchatTime(__endOld);

    const toStart = (d) => {
      return d + " تا شروع";
    };
    const toEnd = (d) => {
      return d + " تا پایان";
    };

    var a = moment(now).utc();
    var b = moment(endDatetimeOld).utc();
    // 86400000

    const ATCWrapper = (args) => (
      <>
        <div
          style={{ marginTop: -20, position: "absolute" }}
          className="text-center"
        >
          {((_next && a < b) || (_start && startTime < now)) && !_finish ? (
            <>
              <Moment
                className="farsi-inline ui green trans basic small label tada delay-1s animated"
                to={endDatetimeOld}
                filter={toEnd}
              >
                {now}
              </Moment>
            </>
          ) : (
            <>
              <Moment
                className="farsi-inline ui trans basic tiny label red opacity-75"
                fromNow
                filter={toStart}
              >
                {startTime}
              </Moment>
            </>
          )}
        </div>
      </>
    );

    return <ATCWrapper />;
  }
}
export default Example;
