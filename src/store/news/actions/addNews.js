import request from "../../request";
import { ADD_NEWS_REQUEST, ADD_NEWS_SUCCESS, ADD_NEWS_FAILURE } from "../types";

export const addNews = (news) => {
  console.log(news, "uxarkvoxy");
  const data = new FormData();
  //   const fileField = document.querySelector('input[type="file"]');

  !!news.header && data.append("header", news.header, news.header.name);
  data.append("title", news.title);
  data.append("text", news.text);

  return (dispatch) => {
    dispatch(addNewsRequest());
    fetch("/admin/news", {
      method: "POST",
      body: data,
    })
      .then((res) => res.text())
      .then((data) => {
        console.log(data, "data");
        if (data.success) {
          console.log(data, "news data");
          dispatch(addNewsSuccess(data));
        }
      })
      .catch((e) => {
        dispatch(addNewsFailure(e.message));
        console.log(e);
      });
  };
};

const addNewsRequest = () => {
  return {
    type: ADD_NEWS_REQUEST,
  };
};

const addNewsSuccess = (data) => {
  console.log(data, "news success data");
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
