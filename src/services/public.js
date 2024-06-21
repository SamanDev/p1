import { httpService } from "./httpService";

export const publicGetService = () => {
  return httpService("/req/getPublicInfo", "get");
};
export const publicUserInfo = (user) => {
  return httpService("/req/getPublicUserInfo?username=" + user, "get");
};
export const publicGetRules = () => {
  return httpService("/req/getRewardsRules", "get");
};
export const userGetRules = () => {
  return httpService("/req/getRewardsRulesUser", "get");
};
