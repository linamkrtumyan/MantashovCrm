import store, { cleanForm } from "../..";
import request from "../../request";
import { ADD_NEWS_REQUEST, ADD_NEWS_SUCCESS, ADD_NEWS_FAILURE } from "../types";
import { toast } from "react-toastify";

export const addNews = (news) => {
  const data = new FormData();

  return (dispatch) => {
    dispatch(addNewsRequest());
    request("/admin/news", "POST", news)
      .then((data) => {
        if (data.success) {
          dispatch(addNewsSuccess(data));
          toast.dark("News added");
          cleanForm();
        } else {
          cleanForm();
        }
      })
      .catch((e) => {
        dispatch(addNewsFailure(e.message));
        toast.error("Something bad happened");
      });
  };
};

const addNewsRequest = () => {
  return {
    type: ADD_NEWS_REQUEST,
  };
};

const addNewsSuccess = (data) => {
  return {
    type: ADD_NEWS_SUCCESS,
    payload: { newsId: data.id },
  };
};

const addNewsFailure = (error) => {
  return {
    type: ADD_NEWS_FAILURE,
    payload: { error },
  };
};
