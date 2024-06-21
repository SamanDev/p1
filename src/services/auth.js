import { httpService } from "./httpService";

export const loginService = (values) => {
  return httpService("/auth/signin", "post", {
    ...values,
  });
};
export const registerService = (values) => {
  return httpService("/auth/signup", "post", {
    ...values,
  });
};
export const resendActivationLink = (values) => {
  return httpService("/req/resendActivationLink  ", "post", {
    ...values,
  });
};
export const forgetPasswordService = (values) => {
  return httpService("/auth/forgetPassword", "put", {
    ...values,
  });
};
export const notification = (values) => {
  return httpService("/req/notification", "post", {
    ...values,
  });
};
export const sendPushToken = (token) => {
  return httpService("/req/sendPushToken", "post", {
    token,
  });
};
export const logoutService = () => {
  return httpService("/auth/logout", "get");
};

export const getUserService = () => {
  return httpService("/req/getUser", "get");
};
export const getPokerSession = () => {
  return httpService("/req/getPokerSession", "get");
};
