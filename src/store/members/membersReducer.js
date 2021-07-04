import {
  FETCH_MEMBERS_BY_PAGE_REQUEST,
  FETCH_MEMBERS_BY_PAGE_SUCCESS,
  FETCH_MEMBERS_BY_PAGE_FAILURE,
} from "./types";

const initialState = {
  loading: false,
  membersByPage: [],
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MEMBERS_BY_PAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_MEMBERS_BY_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,

        membersByPage: action.payload.membersByPage,
        // membersByPage: [],

        error: null,
      };
    case FETCH_MEMBERS_BY_PAGE_FAILURE:
      return {
        ...state,
        loading: false,

        membersByPage: [],
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default reducer;
