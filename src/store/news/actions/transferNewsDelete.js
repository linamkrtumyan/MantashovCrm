import { TRANSFER_NEWS_DELETE } from "../types";

export const transferNewsDelete = (news) => {
  return (dispatch) => {
    dispatch({
      type: TRANSFER_NEWS_DELETE,
      payload: { news },
    });
  };
};
