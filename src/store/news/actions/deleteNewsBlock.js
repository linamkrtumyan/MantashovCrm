import request from "../../request";
import {
  DELETE_NEWS_BLOCK_REQUEST,
  DELETE_NEWS_BLOCK_SUCCESS,
  DELETE_NEWS_BLOCK_FAILURE,
} from "../types";
import { toast } from "react-toastify";

export const deleteNewsBlock = (id) => {
  return (dispatch) => {
    dispatch(deleteNewsBlockRequest());
    request(`/admin/news/newsDetails/${id}`, "DELETE")
      .then((data) => {
        dispatch(deleteNewsBlockSuccess(data));
        toast.dark("News removed");
      })
      .catch((e) => {
        dispatch(deleteNewsBlockFailure(e.message));
        toast.error("Something bad happened");
      });
  };
};

const deleteNewsBlockRequest = () => {
  return {
    type: DELETE_NEWS_BLOCK_REQUEST,
  };
};

const deleteNewsBlockSuccess = (data) => {
  //   const newsDetails = data ? data : [];
  return {
    type: DELETE_NEWS_BLOCK_SUCCESS,
    payload: {
      //   newsDetails,
    },
  };
};

const deleteNewsBlockFailure = (error) => {
  return {
    type: DELETE_NEWS_BLOCK_FAILURE,
    payload: { error },
  };
};
