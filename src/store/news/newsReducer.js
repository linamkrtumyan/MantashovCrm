import {
  FETCH_NEWS_BY_PAGE_REQUEST,
  FETCH_NEWS_BY_PAGE_SUCCESS,
  FETCH_NEWS_BY_PAGE_FAILURE,
  FETCH_NEWS_DETAILS_REQUEST,
  FETCH_NEWS_DETAILS_SUCCESS,
  FETCH_NEWS_DETAILS_FAILURE,
} from "./types";

const initialState = {
  loading: false,
  newsByPage: [],
  error: null,
  count: 0,
  currentPage: 1,
  newsDetails: [],
};

const reducer = (state = initialState, action) => {
  // console.log(action.payload, " action payload");
  switch (action.type) {
    case FETCH_NEWS_BY_PAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_NEWS_BY_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,

        newsByPage: action.payload.newsByPage.news,
        count: action.payload.newsByPage.count,
        // membersByPage: [],

        error: null,
      };
    case FETCH_NEWS_BY_PAGE_FAILURE:
      return {
        ...state,
        loading: false,

        newsByPage: [],
        error: action.payload.error,
      };

    case FETCH_NEWS_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_NEWS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        //   newsDetails: action.payload,
        error: null,
      };
    case FETCH_NEWS_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        newsDetails: [],
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default reducer;
