import { apis } from "service";

const COMMON_URL = `https://api.stackexchange.com/2.3/`;

const API_URLS = {
  GET_USERS_DETAILS: `${COMMON_URL}users`,
};

export const getAnswers = (payload) =>
  apis.get(`${COMMON_URL}questions/${payload?.params?.questionID}/answers`, {
    ...payload,
    params: {
      order: "desc",
      site: "stackoverflow",
    },
  });

export const getUserAnswers = (payload) =>
  apis.get(`${API_URLS.GET_USERS_DETAILS}/${payload?.params?.userId}/answers`, {
    ...payload,
    params: {
      pagesize: "100",
      order: "desc",
      site: "stackoverflow",
    },
  });

export const getMultiplequestions = (payload) =>
  apis.get(`${COMMON_URL}questions/${payload?.params?.questionID}`, {
    ...payload,
    params: {
      pagesize: "100",
      order: "desc",
      site: "stackoverflow",
    },
  });

export const getQuestionsofUser = (payload) =>
  apis.get(
    `${API_URLS.GET_USERS_DETAILS}/${payload?.params?.userId}/questions`,
    {
      ...payload,
      params: {
        pagesize: "100",
        order: "desc",
        site: "stackoverflow",
      },
    }
  );

export const getUsersdetails = (payload) =>
  apis.get(API_URLS.GET_USERS_DETAILS, {
    ...payload,
    params: {
      order: "desc",
      site: "stackoverflow",
      ...payload?.params,
    },
  });
