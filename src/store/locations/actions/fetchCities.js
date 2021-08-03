import request from "../../request";
import store from "../../../store";
import {
  FETCH_CITIES_REQUEST,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_FAILURE,
} from "../types";

export const fetchCities = (state) => {
  // console.log(state);
  //   const country = store.getState().paginationReducer.currentPage - 1;
  // console.log(page, "uxarkvox page");
  return (dispatch) => {
    // console.log("mtav");
    dispatch(fetchCitiesRequest());
    request(`/admin/locations/cities/${state}`)
      .then((data) => {
        // console.log(data, "state data");
        dispatch(fetchCitiesSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchCitiesFailure(e.message));
        // console.log(e);
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
