import { ADD_EVENT_DETAILS } from "../types";

export const addEventDetails = (details) => {
  return (dispatch) => {
    dispatch({
      type: ADD_EVENT_DETAILS,
      payload: { details },
    });
  };
};
