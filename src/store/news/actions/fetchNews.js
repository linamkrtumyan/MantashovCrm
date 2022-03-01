import request from "../../request";
import store from "../../../store";
import {
  FETCH_NEWS_BY_PAGE_REQUEST,
  FETCH_NEWS_BY_PAGE_SUCCESS,
  FETCH_NEWS_BY_PAGE_FAILURE,
} from "../types";

export const fetchNewsByPage = () => {
  const page = store.getState().paginationReducer.currentPage;
  // console.log(page, "uxarkvox page");
  return (dispatch) => {
    dispatch(fetchNewsByPageRequest());
    request(`/admin/news/${page}`)
      .then((data) => {
        // console.log(data, "data");
        dispatch(fetchNewsByPageSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchNewsByPageFailure(e.message));
        // console.log(e);
      });
  };
};

const fetchNewsByPageRequest = () => {
  return {
    type: FETCH_NEWS_BY_PAGE_REQUEST,
  };
};

const fetchNewsByPageSuccess = (data) => {
  const newsByPage = data ? data : [];
  return {
    type: FETCH_NEWS_BY_PAGE_SUCCESS,
    payload: {
      newsByPage,
    },
  };
};

const fetchNewsByPageFailure = (error) => {
  return {
    type: FETCH_NEWS_BY_PAGE_FAILURE,
    payload: { error },
  };
};
