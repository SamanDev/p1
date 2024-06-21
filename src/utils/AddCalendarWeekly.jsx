import React from "react";
import AddToCalendarHOC from "react-add-to-calendar-hoc";
import $ from "jquery";
import { Button, Icon } from "semantic-ui-react";
import Moment from "react-moment";
import { dayOfTournament } from "../const";
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
    this.clicklink();
  }
  clicklink = (args) => {
    $(".calbtn").trigger("click");
  };
  render() {
    var now = moment().format("YYYYMMDDTHHmmssZ");
    now = moment(now)
      .utc()
      .utcOffset(zones)
      .format("YYYYMMDDTHHmmss" + zones);
    const dayINeed = dayOfTournament; // for Thursday
    const today = moment().isoWeekday();

    // if we haven't yet passed the day of the week that I need:
    if (today <= dayINeed) {
      // then just give me this week's instance of that day
      var start = moment(now).isoWeekday(dayINeed);
    } else {
      // otherwise, give me *next week's* instance of that same day
      var start = moment(now).add(1, "weeks").isoWeekday(dayINeed);
    }

    var __start = moment(start).format("YYYYMMDDT" + this.props.format + "00");
    var __end = moment(__start).format("YYYYMMDDT" + this.props.end + "00");
    if (now > __end) {
      // otherwise, give me *next week's* instance of that same day
      start = moment().add(1, "weeks").isoWeekday(dayINeed);
      __start = moment(start).format("YYYYMMDDT" + this.props.format + "00");
      __end = moment(__start).format("YYYYMMDDT" + this.props.end + "00");
    }
    const duration = this.props.dur;
    var startTime = getchatTime(__start);
    var startTimes = getchatTime(__end);
    var endTime = getchatTime(__end);

    const event = {
      duration,
      //endDatetime: endTime,
      repeat: this.props.repeat,

      timezone: "Asia/Tehran",
      startDatetime: moment.parseZone(startTimes).format("YYYYMMDDTHHmmss"),
      endDatetime: moment.parseZone(startTimes).format("YYYYMMDDTHHmmss"),
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
            <Icon size="large" name={SHARE_SITES_ICON[i].toLowerCase()} />
            {link}
          </Button>
        ))}
      </>
    );

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
          </>
        )}
        {now >= startTime && now < endTime ? (
          <>
            <Button
              fluid
              style={{ margin: "10px 0" }}
              className="farsi lh-lg"
              color="red"
              icon
            >
              <Icon
                name="calendar plus outline"
                size="huge"
                color="grey"
                inverted
              />
              <div style={{ marginTop: 10 }}> ثبت نام در</div>

              <div className="h4">تورنومنت</div>
            </Button>
          </>
        ) : (
          <>
            <Button
              fluid
              style={{ margin: "10px 0" }}
              className="farsi lh-lg"
              color="grey"
              icon
              inverted
              disabled
            >
              <Icon name="clock outline" size="huge" color="grey" inverted />

              <div style={{ marginTop: 10 }}>
                <Moment fromNow>{startTime}</Moment> تا{" "}
              </div>
              <div className="h4">شروع ثبت نام</div>
            </Button>
            <Button
              onClick={args.onClick}
              color="red"
              icon
              labelPosition="left"
              fluid
              className="farsi-inline calbtn hiddenm2enu"
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
