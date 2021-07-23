import { TRANSFER_NEWS_DELETE } from "../types";

export const transferNewsDelete = (news) => {
  // console.log(news, "mtav transfer");
  return (dispatch) => {
    dispatch({
      type: TRANSFER_NEWS_DELETE,
      payload: { news },
    });
  };
};
