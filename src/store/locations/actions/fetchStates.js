import request from "../../request";
import store from "../../../store";
import {
  FETCH_STATES_REQUEST,
  FETCH_STATES_SUCCESS,
  FETCH_STATES_FAILURE,
} from "../types";

export const fetchStates = (country) => {
  return (dispatch) => {
    dispatch(fetchStatesRequest());
    request(`/admin/locations/states/${country}`)
      .then((data) => {
        dispatch(fetchStatesSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchStatesFailure(e.message));
      });
  };
};

const fetchStatesRequest = () => {
  return {
    type: FETCH_STATES_REQUEST,
  };
};

const fetchStatesSuccess = (data) => {
  const states = data ? data : [];
  return {
    type: FETCH_STATES_SUCCESS,
    payload: {
      states,
    },
  };
};

const fetchStatesFailure = (error) => {
  return {
    type: FETCH_STATES_FAILURE,
    payload: { error },
  };
};
