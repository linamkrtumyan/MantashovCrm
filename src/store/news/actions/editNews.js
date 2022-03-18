import request from "../../request";
import { NEWS_EDIT_REQUEST, NEWS_EDIT_SUCCESS_FAILURE } from "../types";
import { toast } from "react-toastify";

export const editNews = (news, changePath) => {
  return (dispatch) => {
    dispatch({
      type: NEWS_EDIT_REQUEST,
    });
    request("/admin/news", "PUT", news)
      .then((data) => {
        if (data.success) {
          dispatch({
            type: NEWS_EDIT_SUCCESS_FAILURE,
          });
          // changePath();
          toast.dark("News edited");
        } else {
          dispatch({
            type: NEWS_EDIT_SUCCESS_FAILURE,
          });
          toast.error("Something bad happened");
        }
      })
      .catch((e) => {
        dispatch({
          type: NEWS_EDIT_SUCCESS_FAILURE,
        });
        toast.error("Something bad happened");
      });
  };
};
