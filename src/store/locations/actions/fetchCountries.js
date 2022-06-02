import request from "../../request";
import store from "../../../store";
import {
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAILURE,
} from "../types";

export const fetchCountries = () => {

  return (dispatch) => {
    dispatch(fetchCountriesRequest());
    request("/admin/locations/countries")
      .then((data) => {
        dispatch(fetchCountriesSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchCountriesFailure(e.message));
      });
  };
};

const fetchCountriesRequest = () => {
  return {
    type: FETCH_COUNTRIES_REQUEST,
  };
};

const fetchCountriesSuccess = (data) => {
  const countries = data ? data : [];
  return {
    type: FETCH_COUNTRIES_SUCCESS,
    payload: {
      countries,
    },
  };
};

const fetchCountriesFailure = (error) => {
  return {
    type: FETCH_COUNTRIES_FAILURE,
    payload: { error },
  };
};
