import request from "../../request";
import store from "../../../store";
import {
  FETCH_EVENTS_BY_PAGE_REQUEST,
  FETCH_EVENTS_BY_PAGE_SUCCESS,
  FETCH_EVENTS_BY_PAGE_FAILURE,
} from "../types";

export const fetchEventsByPage = () => {
  const page = store.getState().paginationReducer.currentPage - 1;

  return (dispatch) => {
    dispatch(fetchEventsByPageRequest());
    request(`/admin/events/${page}`)
      .then((data) => {
        dispatch(fetchEventsByPageSuccess(data));
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
