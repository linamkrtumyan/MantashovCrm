import request from "../../request";
import {
  DELETE_NEWS_REQUEST,
  DELETE_NEWS_SUCCESS,
  DELETE_NEWS_FAILURE,
} from "../types";
import { toast } from "react-toastify";

export const deleteNews = (id) => {
  // console.log(id, "uxarkvoxy");
  return (dispatch) => {
    dispatch(deleteNewsRequest());
    request(`/admin/news/${id}`, "DELETE")
      .then((data) => {
        // console.log(data, "data");
        dispatch(deleteNewsSuccess(data));
        toast.dark("News removed");
      })
      .catch((e) => {
        dispatch(deleteNewsFailure(e.message));
        toast.error("Something bad happened");
        // console.log(e);
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
