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
  FETCH_CATEGORIES_ALL_REQUEST,
  FETCH_CATEGORIES_ALL_SUCCESS,
  FETCH_CATEGORIES_ALL_FAILURE,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE,
  FETCH_POSITIONS_ALL_REQUEST,
  FETCH_POSITIONS_ALL_SUCCESS,
  FETCH_POSITIONS_ALL_FAILURE,
  FETCH_ORGANIZATIONS_TABLE_REQUEST,
  FETCH_ORGANIZATIONS_TABLE_SUCCESS,
  FETCH_ORGANIZATIONS_TABLE_FAILURE,
  FETCH_ORGANIZATION_DETAILS_REQUEST,
  FETCH_ORGANIZATION_DETAILS_SUCCESS,
  FETCH_ORGANIZATION_DETAILS_FAILURE,
  CLEAN_ORGANIZATION,
} from "./types";

const initialState = {
  loading: false,
  organizations: [],
  error: null,
  positions: [],
  categoriesAll: [],
  added: false,
  positionsAll: [],
  organizationsTable: [],
  organizationDetails: [],
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
    case FETCH_ORGANIZATIONS_TABLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ORGANIZATIONS_TABLE_SUCCESS:
      return {
        ...state,
        organizationsTable: action.payload.organizationsTable,
        loading: false,
        error: null,
      };
    case FETCH_ORGANIZATIONS_TABLE_FAILURE:
      return {
        ...state,
        loading: false,
        organizationsTable: [],
        error: action.payload.error,
      };

    case FETCH_ORGANIZATION_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ORGANIZATION_DETAILS_SUCCESS:
      return {
        ...state,
        organizationDetails: [action.payload.organizationDetails],
        loading: false,
        error: null,
      };
    case FETCH_ORGANIZATION_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        organizationDetails: [],
        error: action.payload.error,
      };

    case CLEAN_ORGANIZATION:
      return {
        ...state,
        organizationDetails: [],
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

    case FETCH_CATEGORIES_ALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CATEGORIES_ALL_SUCCESS:
      return {
        ...state,
        categoriesAll: action.payload.categoriesAll,
        loading: false,
        error: null,
      };
    case FETCH_CATEGORIES_ALL_FAILURE:
      return {
        ...state,
        loading: false,
        categoriesAll: [],
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

    case FETCH_POSITIONS_ALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_POSITIONS_ALL_SUCCESS:
      return {
        ...state,
        positionsAll: action.payload.positionsAll,
        loading: false,
        error: null,
      };
    case FETCH_POSITIONS_ALL_FAILURE:
      return {
        ...state,
        loading: false,
        positionsAll: [],
        error: action.payload.error,
      };

    case ADD_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        added: true,
        error: null,
      };
    case ADD_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default reducer;
