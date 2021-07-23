import store from "../..";
import request from "../../request";
import { ADD_NEWS_REQUEST, ADD_NEWS_SUCCESS, ADD_NEWS_FAILURE } from "../types";

export const addNews = (news) => {
  const data = new FormData();
  // const image = store.getState().imageReducer.image;
  //   const fileField = document.querySelector('input[type="file"]');

  // !!news.header && data.append("header", news.header, news.header.name);
  // data.append("title", news.title);
  // data.append("text", news.text);
  // data.append("header", image);

  // console.log(news, "uxarkvoxy");

  return (dispatch) => {
    dispatch(addNewsRequest());
    request("/admin/news", "POST", news)
      .then((data) => {
        // console.log(data, "data");
        if (data.success) {
          // console.log(data, "news data");
          dispatch(addNewsSuccess(data));
        }
      })
      .catch((e) => {
        dispatch(addNewsFailure(e.message));
        // console.log(e);
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
    payload: {
      //   login,
    },
  };
};

const addNewsFailure = (error) => {
  return {
    type: ADD_NEWS_FAILURE,
    payload: { error },
  };
};
