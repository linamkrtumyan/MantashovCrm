import { ADD_NEWS_DETAILS } from "../types";

export const addNewsDetails = (details) => {
  return (dispatch) => {
    dispatch({
      type: ADD_NEWS_DETAILS,
      payload: { details },
    });
  };
};
