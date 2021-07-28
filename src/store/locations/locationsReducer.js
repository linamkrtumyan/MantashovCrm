import {
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAILURE,
  FETCH_STATES_REQUEST,
  FETCH_STATES_SUCCESS,
  FETCH_STATES_FAILURE,
  FETCH_CITIES_REQUEST,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_FAILURE,
} from "./types";

const initialState = {
  loading: false,
  countries: [],
  error: null,
  states: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUNTRIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        loading: false,
        countries: action.payload.countries,
        error: null,
      };
    case FETCH_COUNTRIES_FAILURE:
      return {
        ...state,
        loading: false,
        countries: [],
        error: action.payload.error,
      };

    case FETCH_STATES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_STATES_SUCCESS:
      return {
        ...state,
        loading: false,
        states: action.payload.states,
        error: null,
      };
    case FETCH_STATES_FAILURE:
      return {
        ...state,
        loading: false,
        states: [],
        error: action.payload.error,
      };

    case FETCH_CITIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        cities: action.payload.cities,
        error: null,
      };
    case FETCH_CITIES_FAILURE:
      return {
        ...state,
        loading: false,
        cities: [],
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default reducer;
