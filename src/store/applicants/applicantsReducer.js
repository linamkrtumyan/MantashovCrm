import {
  FETCH_APPLICANTS_REQUEST,
  FETCH_APPLICANTS_SUCCESS,
  FETCH_APPLICANTS_FAILURE,
  APPLICANT_EDIT_REQUEST,
  APPLICANT_EDIT_SUCCESS,
  APPLICANT_EDIT_FAILURE,
} from "./types";

const initialState = {
  applicants: [],
  loading: false,
  error: null,
  fetch: false,
};

const applicantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_APPLICANTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_APPLICANTS_SUCCESS:
      return {
        ...state,
        loading: false,
        applicants: action.payload.applicants,
        error: null,
      };
    case FETCH_APPLICANTS_FAILURE:
      return {
        ...state,
        loading: false,
        applicants: [],
        error: action.payload.error,
      };

    case APPLICANT_EDIT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case APPLICANT_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        fetch: !state.fetch,
      };
    case APPLICANT_EDIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        fetch: false,
      };
    default:
      return { ...state };
  }
};

export default applicantsReducer;
