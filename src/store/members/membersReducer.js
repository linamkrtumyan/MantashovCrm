import {
  FETCH_MEMBERS_BY_PAGE_REQUEST,
  FETCH_MEMBERS_BY_PAGE_SUCCESS,
  FETCH_MEMBERS_BY_PAGE_FAILURE,
  CHANGE_CURRENT_PAGE,
} from "./types";

const initialState = {
  loading: false,
  membersByPage: [],
  error: null,
  count: 0,
  currentPage: 1,
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

        membersByPage: action.payload.membersByPage.members,
        count: action.payload.membersByPage.count,
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
