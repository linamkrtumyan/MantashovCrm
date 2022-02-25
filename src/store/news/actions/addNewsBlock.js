import store, { cleanForm } from "../..";
import request from "../../request";
import {
  ADD_NEWS_DETAILS_REQUEST,
  ADD_NEWS_DETAILS_SUCCESS,
  ADD_NEWS_DETAILS_FAILURE,
} from "../types";
import { toast } from "react-toastify";

export const addNewsBlock = (block) => {
  const data = new FormData();
  const { blockImages } = store.getState().imageReducer;
  const { blockVideos } = store.getState().videoReducer;

  block.block.blockImages = blockImages ?? [];
  block.block.blockVideos = blockVideos ?? [];

  return (dispatch) => {
    dispatch(addNewsBlockRequest());
    request("/admin/news/newsDetails", "POST", block)
      .then((data) => {
        if (data.success) {
          dispatch(addNewsBlockSuccess(data));
          toast.dark("News details added");
          //   cleanForm();
        } else {
          //   cleanForm();
        }
      })
      .catch((e) => {
        dispatch(addNewsBlockFailure(e.message));
        toast.error("Something bad happened");
      });
  };
};

const addNewsBlockRequest = () => {
  return {
    type: ADD_NEWS_DETAILS_REQUEST,
  };
};

const addNewsBlockSuccess = (data) => {
  return {
    type: ADD_NEWS_DETAILS_SUCCESS,
    payload: { newsId: data.id },
  };
};

const addNewsBlockFailure = (error) => {
  return {
    type: ADD_NEWS_DETAILS_FAILURE,
    payload: { error },
  };
};
