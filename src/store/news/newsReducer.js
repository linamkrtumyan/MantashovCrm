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
  ADD_NEWS_DETAILS,
  ADD_NEWS_DETAILS_REQUEST,
  ADD_NEWS_DETAILS_SUCCESS,
  ADD_NEWS_DETAILS_FAILURE,
  FETCH_NEWS_BLOCK_DETAILS_REQUEST,
  FETCH_NEWS_BLOCK_DETAILS_SUCCESS,
  FETCH_NEWS_BLOCK_DETAILS_FAILURE,
  DELETE_NEWS_BLOCK_REQUEST,
  DELETE_NEWS_BLOCK_SUCCESS,
  DELETE_NEWS_BLOCK_FAILURE,
  NEWS_EDIT_BLOCK_REQUEST,
  NEWS_EDIT_BLOCK_SUCCESS,
  NEWS_EDIT_BLOCK_FAILURE,
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
  newsDetailsBlocks: [],
  newsId: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEWS_DETAILS:
      return {
        ...state,
        newsDetailsBlocks: action.payload.details,
      };
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
    case FETCH_NEWS_BLOCK_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_NEWS_BLOCK_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        newsDetails: action.payload.newsDetails,
        detailsImages: action.payload.newsDetails.images,
        error: null,
      };
    case FETCH_NEWS_BLOCK_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        newsDetails: [],
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

    case ADD_NEWS_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_NEWS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        newsId: action.payload.newsId,
      };
    case ADD_NEWS_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case NEWS_EDIT_BLOCK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEWS_EDIT_BLOCK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        newsId: action.payload.newsId,
      };
    case NEWS_EDIT_BLOCK_FAILURE:
      return {
        ...state,
        loading: false,
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
        newsId: action.payload.newsId,
      };
    case ADD_NEWS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case DELETE_NEWS_BLOCK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_NEWS_BLOCK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
      };
    case DELETE_NEWS_BLOCK_FAILURE:
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
