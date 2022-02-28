import request from "../../request";
import store from "../../../store";
import {
  FETCH_SPEAKERS_BY_PAGE_REQUEST,
  FETCH_SPEAKERS_BY_PAGE_SUCCESS,
  FETCH_SPEAKERS_BY_PAGE_FAILURE,
} from "../types";
import { changeCurrentPage } from "../../pagination/actions";

export const fetchSpeakersByPage = () => {
  const page = store.getState().paginationReducer.currentPage;

  return (dispatch) => {
    dispatch(fetchSpeakersByPageRequest());
    request(`/admin/speakers/${page}`)
      .then((data) => {
        dispatch(fetchSpeakersByPageSuccess(data));
        if (data.count > 0 && data.speakers.length === 0) {
          dispatch(changeCurrentPage(page));
        }
      })
      .catch((e) => {
        dispatch(fetchSpeakersByPageFailure(e.message));
      });
  };
};

const fetchSpeakersByPageRequest = () => {
  return {
    type: FETCH_SPEAKERS_BY_PAGE_REQUEST,
  };
};

const fetchSpeakersByPageSuccess = (data) => {
  const speakersByPage = data ? data : [];
  return {
    type: FETCH_SPEAKERS_BY_PAGE_SUCCESS,
    payload: {
      speakersByPage,
    },
  };
};

const fetchSpeakersByPageFailure = (error) => {
  return {
    type: FETCH_SPEAKERS_BY_PAGE_FAILURE,
    payload: { error },
  };
};
