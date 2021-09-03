import {
  FETCH_NEWS_BY_PAGE_REQUEST,
  FETCH_NEWS_BY_PAGE_SUCCESS,
  FETCH_NEWS_BY_PAGE_FAILURE,
  FETCH_NEWS_DETAILS_REQUEST,
  FETCH_NEWS_DETAILS_SUCCESS,
  FETCH_NEWS_DETAILS_FAILURE,
  ADD_NEWS_REQUEST,
  ADD_NEWS_SUCCESS,
  ADD_NEWS_FAILURE,
  DELETE_NEWS_REQUEST,
  DELETE_NEWS_SUCCESS,
  DELETE_NEWS_FAILURE,
  TRANSFER_NEWS_DELETE,
  DELETE_NEWS_IMAGE_FROM_STORE,
} from "./types";

const initialState = {
  loading: false,
  newsByPage: [],
  error: null,
  count: 0,
  currentPage: 1,
  newsDetails: [],
  success: null,
  news: {},
  detailsImages: [],
};

const reducer = (state = initialState, action) => {
  // console.log(action, " action payload");
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
        newsDetails: action.payload.newsDetails,
        detailsImages: action.payload.newsDetails.images,
        error: null,
      };
    case FETCH_NEWS_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        newsDetails: [],
        error: action.payload.error,
      };

    case ADD_NEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_NEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case ADD_NEWS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case DELETE_NEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_NEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
      };
    case DELETE_NEWS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case TRANSFER_NEWS_DELETE:
      return {
        ...state,
        news: action.payload.news,
      };

    case DELETE_NEWS_IMAGE_FROM_STORE:
      return {
        ...state,
        detailsImages: [
          ...state.detailsImages.slice(0, action.payload.deleteId),
          ...state.detailsImages.slice(action.payload.deleteId + 1),
        ],
      };

    default:
      return state;
  }
};

export default reducer;