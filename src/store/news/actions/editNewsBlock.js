import request from "../../request";
import {
  NEWS_EDIT_BLOCK_REQUEST,
  NEWS_EDIT_BLOCK_SUCCESS,
  NEWS_EDIT_BLOCK_FAILURE,
} from "../types";
import { toast } from "react-toastify";

export const editNewsBlock = (block, callback = () => {}) => {
  // set api for block edit
  return (dispatch) => {
    dispatch(editNewsBlockRequest());
    request("/admin/news/newsDetails", "PUT", block)
      .then((data) => {
        if (data.success) {
          dispatch(editNewsBlockSuccess(data));
          // toast.dark("Edited");
          callback();
        }
      })
      .catch((e) => {
        dispatch(editNewsBlockFailure(e.message));
        toast.error("Something bad happened");
      });
  };
};

const editNewsBlockRequest = () => {
  return {
    type: NEWS_EDIT_BLOCK_REQUEST,
  };
};

const editNewsBlockSuccess = (data) => {
  return {
    type: NEWS_EDIT_BLOCK_SUCCESS,
    payload: {},
  };
};

const editNewsBlockFailure = (error) => {
  return {
    type: NEWS_EDIT_BLOCK_FAILURE,
    payload: { error },
  };
};
