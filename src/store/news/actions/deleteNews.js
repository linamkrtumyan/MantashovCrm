import request from "../../request";
import {
  DELETE_NEWS_REQUEST,
  DELETE_NEWS_SUCCESS,
  DELETE_NEWS_FAILURE,
} from "../types";
import { toast } from "react-toastify";

export const deleteNews = (id) => {
  return (dispatch) => {
    dispatch(deleteNewsRequest());
    request(`/admin/news/${id}`, "DELETE")
      .then((data) => {
        dispatch(deleteNewsSuccess(data));
        toast.dark("News removed");
      })
      .catch((e) => {
        dispatch(deleteNewsFailure(e.message));
        toast.error("Something bad happened");
      });
  };
};

const deleteNewsRequest = () => {
  return {
    type: DELETE_NEWS_REQUEST,
  };
};

const deleteNewsSuccess = (data) => {
  //   const newsDetails = data ? data : [];
  return {
    type: DELETE_NEWS_SUCCESS,
    payload: {
      //   newsDetails,
    },
  };
};

const deleteNewsFailure = (error) => {
  return {
    type: DELETE_NEWS_FAILURE,
    payload: { error },
  };
};
