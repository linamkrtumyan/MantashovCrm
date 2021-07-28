import {
  FETCH_MEMBERS_BY_PAGE_REQUEST,
  FETCH_MEMBERS_BY_PAGE_SUCCESS,
  FETCH_MEMBERS_BY_PAGE_FAILURE,
  CHANGE_CURRENT_PAGE,
  ADD_MEMBER_REQUEST,
  ADD_MEMBER_SUCCESS,
  ADD_MEMBER_FAILURE,
  FETCH_EDUCATIONS_REQUEST,
  FETCH_EDUCATIONS_SUCCESS,
  FETCH_EDUCATIONS_FAILURE,
  FETCH_ORGANIZATIONS_REQUEST,
  FETCH_ORGANIZATIONS_SUCCESS,
  FETCH_ORGANIZATIONS_FAILURE,
  FETCH_MEMBERS_FORM_REQUEST,
  FETCH_MEMBERS_FORM_SUCCESS,
  FETCH_MEMBERS_FORM_FAILURE,
  FETCH_CONTACT_TYPES_REQUEST,
  FETCH_CONTACT_TYPES_SUCCESS,
  FETCH_CONTACT_TYPES_FAILURE,
  DELETE_MEMBER_REQUEST,
  DELETE_MEMBER_SUCCESS,
  DELETE_MEMBER_FAILURE,
  TRANSFER_MEMBER_DELETE,
} from "./types";

const initialState = {
  loading: false,
  membersByPage: [],
  error: null,
  count: 0,
  currentPage: 1,
  educations: [],
  memberForm: [],
  contactTypes: [],
  member: null,
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
    case ADD_MEMBER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case ADD_MEMBER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case FETCH_EDUCATIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_EDUCATIONS_SUCCESS:
      return {
        ...state,
        educations: action.payload.educations,
        loading: false,
        error: null,
      };
    case FETCH_EDUCATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        educations: [],
        error: action.payload.error,
      };

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

    case FETCH_MEMBERS_FORM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_MEMBERS_FORM_SUCCESS:
      return {
        ...state,
        memberForm: action.payload.memberForm,
        loading: false,
        error: null,
      };
    case FETCH_MEMBERS_FORM_FAILURE:
      return {
        ...state,
        loading: false,
        memberForm: [],
        error: action.payload.error,
      };

    case FETCH_CONTACT_TYPES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CONTACT_TYPES_SUCCESS:
      return {
        ...state,
        contactTypes: action.payload.contactTypes,
        loading: false,
        error: null,
      };
    case FETCH_CONTACT_TYPES_FAILURE:
      return {
        ...state,
        loading: false,
        contactTypes: [],
        error: action.payload.error,
      };

    case DELETE_MEMBER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
      };
    case DELETE_MEMBER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case TRANSFER_MEMBER_DELETE:
      return {
        ...state,
        member: action.payload.member,
      };

    default:
      return state;
  }
};

export default reducer;
