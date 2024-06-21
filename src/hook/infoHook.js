import { useEffect, useState } from "react";
import { publicGetRules } from "../services/public";
import { adminGetService } from "../services/admin";
import { addDays } from "date-fns";
const moment = require("moment");
export const useSiteInfo = () => {
  const [siteInfo, setSiteInfo] = useState(
    localStorage.getItem("siteInfo")
      ? JSON.parse(localStorage.getItem("siteInfo"))
      : []
  );
  const [loading, setLoading] = useState(true);
  const handleCheckLogin = async () => {
    try {
      const res = await publicGetRules();
      var _data = res.data;
      _data.updateday = new Date();
      setSiteInfo(_data);
      localStorage.setItem("siteInfo", JSON.stringify(_data));
      //setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!siteInfo) {
      handleCheckLogin();
    } else {
      var form_date = new Date(siteInfo?.updateday);
      var today = new Date();
      let difference =
        form_date > today ? form_date - today : today - form_date;
      let diff_days = Math.floor(difference / (1000 * 3600 * 24));
      if (diff_days > 5) handleCheckLogin();
    }
  }, []);

  return [loading, siteInfo];
};

export const useAdminTicket = (bln) => {
  const [tickets, setTickets] = useState(0);
  const [loading, setLoading] = useState(true);
  var startDate = addDays(new Date(), -6);
  var endDate = new Date();
  var _s = moment(startDate).format("YYYY-MM-DD");
  var _e = moment(endDate).format("YYYY-MM-DD");
  const handleGetTickets = async () => {
    try {
      const res = await adminGetService(
        `getTickets?page=1&number=500&status=Open&start=${_s}&end=${_e}`
      );

      if (res.status === 200) {
        setTickets(
          res.data
            .sort((a, b) => (a.id < b.id ? 1 : -1))
            .filter(
              (item) =>
                item.ticketMessages.sort((a, b) => (a.id < b.id ? 1 : -1))[0]
                  .adminUser == item.username
            ).length
        );
      }
    } catch (error) {
      ////console.log(error.message);
      // setLastReward(_bonuses);
      //localStorage.setItem("lastReward", JSON.stringify(_bonuses));
    }
    setLoading(false);
  };

  useEffect(() => {
    if (bln) handleGetTickets();
  }, []);
  return [loading, tickets];
};
