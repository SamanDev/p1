import jMoment from "jalali-moment";
const moment = require("moment");
export const convertDateToJalali = (date) => {
  return (
    <div title={jMoment(date).format("jYYYY/jMM/jDD")}>
      {moment(date).format("YYYY/MM/DD")}{" "}
      <span className="time">{moment(date).format("HH:mm")}</span>
    </div>
  );
};
