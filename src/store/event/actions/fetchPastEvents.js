import request from "../../request";
import store from "../../../store";
import {
  FETCH_PAST_EVENTS_REQUEST,
  FETCH_PAST_EVENTS_SUCCESS,
  FETCH_PAST_EVENTS_FAILURE,
} from "../types";

export const fetchPastEvents = () => {
  //   const page = store.getState().paginationReducer.currentPage - 1;
  const page = 0;
  // console.log(page, "uxarkvox page");
  return (dispatch) => {
    dispatch(fetchPastEventsRequest());
    request(`/admin/events/past/${page}`)
      .then((data) => {
        console.log(data, "data");
        dispatch(fetchPastEventsSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchPastEventsFailure(e.message));
        // console.log(e);
      });
  };
};

const fetchPastEventsRequest = () => {
  return {
    type: FETCH_PAST_EVENTS_REQUEST,
  };
};

const fetchPastEventsSuccess = (data) => {
  const pastEvents = data ? data : [];
  return {
    type: FETCH_PAST_EVENTS_SUCCESS,
    payload: {
      pastEvents,
    },
  };
};

const fetchPastEventsFailure = (error) => {
  return {
    type: FETCH_PAST_EVENTS_FAILURE,
    payload: { error },
  };
};
