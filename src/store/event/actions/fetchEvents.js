import request from "../../request";
import store from "../../../store";
import {
  FETCH_EVENTS_BY_PAGE_REQUEST,
  FETCH_EVENTS_BY_PAGE_SUCCESS,
  FETCH_EVENTS_BY_PAGE_FAILURE,
} from "../types";
import { changeCurrentPage } from "../../pagination/actions";

export const fetchEventsByPage = () => {
  const page = store.getState().paginationReducer.currentPage;

  return (dispatch) => {
    dispatch(fetchEventsByPageRequest());
    request(`/admin/events/${page}`)
      .then((data) => {
        dispatch(fetchEventsByPageSuccess(data));
        if (data.count > 0 && data.events.length === 0) {
          dispatch(changeCurrentPage(page));
        }
      })
      .catch((e) => {
        dispatch(fetchEventsByPageFailure(e.message));
      });
  };
};

const fetchEventsByPageRequest = () => {
  return {
    type: FETCH_EVENTS_BY_PAGE_REQUEST,
  };
};

const fetchEventsByPageSuccess = (data) => {
  const eventsByPage = data ? data : [];
  return {
    type: FETCH_EVENTS_BY_PAGE_SUCCESS,
    payload: {
      eventsByPage,
    },
  };
};

const fetchEventsByPageFailure = (error) => {
  return {
    type: FETCH_EVENTS_BY_PAGE_FAILURE,
    payload: { error },
  };
};
