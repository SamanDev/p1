import React from "react";
import AddToCalendarHOC from "react-add-to-calendar-hoc";
import $ from "jquery";
import { Button, Icon } from "semantic-ui-react";
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
  // zones = "+04:30";
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
  componentDidMount() {
    // this.clicklink();
  }
  clicklink = () => {
    $(".calbtn").trigger("click");
  };
  render() {
    var now = moment().format("YYYYMMDDTHHmmssZ");
    now = moment(now)
      .utc()
      .utcOffset(zones)
      .format("YYYYMMDDTHHmmss" + zones);

    var nowDay = moment(now).date();
    var nowMonth = moment(now).month();
    var start = parseInt(this.props.start);
    var dur = parseInt(this.props.dur);
    var dir = start - nowDay;
    var end = start + dur;
    var _next = false;
    var _start = false;
    var _finish = false;
    var __start = moment(now)
      .set({ date: start })
      .format("YYYYMMDDT" + this.props.format + "00");

    if (start <= nowDay) {
      _start = true;
    }
    if (end - nowDay < 0) {
      _finish = true;
    }
    if (dir < 0) {
      _next = true;
    }

    if (end >= 31) {
      var today = new Date();

      end = 1;
    }

    var startDatetimeOld = getchatTime(__start);
    if (_finish) {
      //now = moment(now).add(1, "months").format("YYYYMMDDTHHmmssZ");
      __start = moment(__start)
        .set({ month: nowMonth + 1 })
        .format("YYYYMMDDT" + this.props.format + "00");

      _next = false;
    }
    var __end = moment(__start)
      .set({ date: end })
      .format("YYYYMMDDT" + this.props.format + "00");
    var __endOld = moment(__end).format("YYYYMMDDT" + this.props.format + "00");
    if (_next) {
      __start = moment(__start)
        .set({ month: nowMonth + 1 })
        .format("YYYYMMDDT" + this.props.format + "00");
    }

    var __end = moment(__start)
      .set({ date: end })
      .format("YYYYMMDDT" + this.props.format + "00");

    if (__end < __start) {
      __end = moment(__start)
        .set({ date: end, month: nowMonth + 1 })
        .format("YYYYMMDDT" + this.props.format + "00");
      __endOld = moment(__end).format("YYYYMMDDT" + this.props.format + "00");
    } else {
      //_next = true;
    }

    const duration = this.props.dur;
    var startTime = getchatTime(__start);
    var endTime = getchatTime(__end);
    var endDatetimeOld = getchatTime(__endOld);

    const event = {
      duration,
      //endDatetime: endTime,
      repeat: this.props.repeat,
      timezone: "Asia/Tehran",
      startDatetime: moment.parseZone(startTime).format("YYYYMMDDTHHmmss"),
      endDatetime: moment.parseZone(endTime).format("YYYYMMDDTHHmmss"),
      title: this.props.title,
    };

    const toStart = (d) => {
      return d + " تا شروع";
    };
    const toEnd = (d) => {
      return d + " تا پایان";
    };

    const ATCDropdown = (args) => (
      <>
        {args.children.map((link, i) => (
          <Button
            key={i}
            color="red"
            icon
            labelPosition="left"
            fluid
            className="farsi add-to-container"
            style={{ margin: "10px 0" }}
            basic
          >
            <Icon
              size="large"
              color="orange"
              inverted
              name={SHARE_SITES_ICON[i].toLowerCase()}
            />
            {link}
          </Button>
        ))}
      </>
    );
    var a = moment(now).utc();
    var b = moment(endDatetimeOld).utc();
    // 86400000

    const ATCWrapper = (args) => (
      <>
        {1 == 2 && (
          <>
            {" "}
            no:
            {moment(now).format("MM DD  HH:mm")}
            <br />
            st: {moment(startTime).format("MM DD  HH:mm")}
            <br />
            en: {moment(endTime).format("MM DD  HH:mm")}
            <br />
            sO: {moment(startDatetimeOld).format("MM DD  HH:mm")}
            <br />
            eO: {moment(endDatetimeOld).format("MM DD  HH:mm")}
            <br />
            _next: {_next.toString()}
            <br />
            _start: {_start.toString()}
            <br />
            _finish: {_finish.toString()}
            <br />
          </>
        )}

        {((_next && a < b) || (_start && startTime < now)) && !_finish ? (
          <>
            <Moment
              className="farsi-inline ui label green fluid"
              to={endDatetimeOld}
              filter={toEnd}
              style={{ marginTop: 20 }}
            >
              {now}
            </Moment>
            <Button
              onClick={args.onClick}
              color="red"
              icon
              labelPosition="left"
              fluid
              className="farsi-inline calbtn hiddenmen2u"
              style={{ margin: "10px 0" }}
            >
              <Icon size="large" name="calendar plus outline" />
              به تقویم من اضافه کن
            </Button>
          </>
        ) : (
          <>
            <Moment
              className="farsi-inline ui label grey fluid"
              fromNow
              filter={toStart}
              style={{ marginTop: 20 }}
              onChange={(val) => {}}
            >
              {startTime}
            </Moment>

            <Button
              onClick={args.onClick}
              color="red"
              icon
              labelPosition="left"
              fluid
              className="farsi-inline calbtn hiddenmen2u"
              style={{ margin: "10px 0" }}
            >
              <Icon size="large" name="calendar plus outline" />
              به تقویم من اضافه کن
            </Button>
          </>
        )}
      </>
    );
    const AddToCalendarDropdown = AddToCalendarHOC(ATCWrapper, ATCDropdown);

    return (
      <AddToCalendarDropdown
        event={event}
        filename={event.title}
        items={[SHARE_SITES.ICAL, SHARE_SITES.GOOGLE]}
        linkProps={{
          className: "ui link",
        }}
      />
    );
  }
}
export default Example;
