import store, { cleanForm } from "../..";
import request from "../../request";
import { ADD_NEWS_REQUEST, ADD_NEWS_SUCCESS, ADD_NEWS_FAILURE } from "../types";
import { toast } from "react-toastify";


export const addNews = (news, changePath) => {
  const data = new FormData();

  return (dispatch) => {
    dispatch(addNewsRequest());
    request("/admin/news", "POST", news)
      .then((data) => {
        if (data.success) {
          dispatch(addNewsSuccess(data));
          toast.dark("News added");
          changePath();
          cleanForm()
        } else {
          cleanForm()
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
  // console.log(data, "news success data");
  //   const login = data ? data : [];
  return {
    type: ADD_NEWS_SUCCESS,
    payload: {},
  };
};

const addNewsFailure = (error) => {
  return {
    type: ADD_NEWS_FAILURE,
    payload: { error },
  };
};
