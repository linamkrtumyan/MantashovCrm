import {
  FETCH_ORGANIZATIONS_REQUEST,
  FETCH_ORGANIZATIONS_SUCCESS,
  FETCH_ORGANIZATIONS_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  FETCH_POSITIONS_REQUEST,
  FETCH_POSITIONS_SUCCESS,
  FETCH_POSITIONS_FAILURE,
} from "./types";

const initialState = {
  loading: false,
  organizations: [],
  error: null,
  positions: [],
};

const reducer = (state = initialState, action) => {
  // console.log(action, "action");
  switch (action.type) {
    case FETCH_ORGANIZATIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ORGANIZATIONS_SUCCESS:
      return {
        ...state,
        organizations: action.payload.organizations,
        loading: false,
        error: null,
      };
    case FETCH_ORGANIZATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        organizations: [],
        error: action.payload.error,
      };

    case FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload.categories,
        loading: false,
        error: null,
      };
    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        categories: [],
        error: action.payload.error,
      };

    case FETCH_POSITIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_POSITIONS_SUCCESS:
      return {
        ...state,
        positions: action.payload.positions,
        loading: false,
        error: null,
      };
    case FETCH_POSITIONS_FAILURE:
      return {
        ...state,
        loading: false,
        positions: [],
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default reducer;
