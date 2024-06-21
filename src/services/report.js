import { httpService } from "./httpService";

export const getReportService = (id = null, mode = "", gateway = "", usd) => {
  if (id) {
    return httpService(
      `/req/getReportsByUser/?id=${id}&mode=${mode}&gateway=${gateway}&usd=${usd}&page=1&number=100`,
      "get"
    );
  } else {
    return httpService(
      `/admin/getAllDepositCashout/?mode=${mode}&page=0`,
      "get"
    );
  }
};
export const getReportPenService = (mode, usd) => {
  return httpService(`/req/${mode}&usd=${usd}`, "get");
};
export const getRefferService = () => {
  return httpService(`/req/getDownLine`, "get");
};
