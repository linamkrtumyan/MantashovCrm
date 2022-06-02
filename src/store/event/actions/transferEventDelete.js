import { TRANSFER_EVENT_DELETE } from "../types";

export const transferEventDelete = (event) => {
  return (dispatch) => {
    dispatch({
      type: TRANSFER_EVENT_DELETE,
      payload: { event },
    });
  };
};
