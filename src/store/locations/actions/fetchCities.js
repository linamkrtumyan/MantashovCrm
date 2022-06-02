import request from "../../request";
import store from "../../../store";
import {
  FETCH_CITIES_REQUEST,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_FAILURE,
} from "../types";

export const fetchCities = (state) => {
  return (dispatch) => {
    dispatch(fetchCitiesRequest());
    request(`/admin/locations/cities/${state}`)
      .then((data) => {
        dispatch(fetchCitiesSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchCitiesFailure(e.message));
      });
  };
};

const fetchCitiesRequest = () => {
  return {
    type: FETCH_CITIES_REQUEST,
  };
};

const fetchCitiesSuccess = (data) => {
  const cities = data ? data : [];
  return {
    type: FETCH_CITIES_SUCCESS,
    payload: {
      cities,
    },
  };
};

const fetchCitiesFailure = (error) => {
  return {
    type: FETCH_CITIES_FAILURE,
    payload: { error },
  };
};
