import request from "../../request";
import { NEWS_EDIT_REQUEST, NEWS_EDIT_SUCCESS_FAILURE } from "../types";

export const editNews = (news) => {
  // console.log(news, "edit news send");
  return (dispatch) => {
    dispatch({
      type: NEWS_EDIT_REQUEST,
    });
    request("/admin/news", "PUT", news)
      .then((data) => {
        // console.log(data, "res edit");
        if (data.success) {
          dispatch({
            type: NEWS_EDIT_SUCCESS_FAILURE,
          });
        } else {
          dispatch({
            type: NEWS_EDIT_SUCCESS_FAILURE,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: NEWS_EDIT_SUCCESS_FAILURE,
        });
      });
  };
};
