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
  FETCH_MEMBER_DETAILS_REQUEST,
  FETCH_MEMBER_DETAILS_SUCCESS,
  FETCH_MEMBER_DETAILS_FAILURE,
  FETCH_MEMBER_FOR_EDIT_REQUEST,
  FETCH_MEMBER_FOR_EDIT_SUCCESS,
  FETCH_MEMBER_FOR_EDIT_FAILURE,
  CLEAN_MEMBER,
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
  memberDetails: {},
  memberForEdit: [],
  addedOrganizations: [],
};

const reducer = (state = initialState, action) => {
  // console.log(action, "action");
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
        addedOrganizations: [],
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
    case FETCH_MEMBER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_MEMBER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        memberDetails: action.payload.memberDetails,
      };
    case FETCH_MEMBER_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        memberDetails: [],
        error: action.payload.error,
      };

    case FETCH_MEMBER_FOR_EDIT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_MEMBER_FOR_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        memberForEdit: action.payload.memberForEdit,
      };
    case FETCH_MEMBER_FOR_EDIT_FAILURE:
      return {
        ...state,
        loading: false,
        memberForEdit: [],
        error: action.payload.error,
      };

    case TRANSFER_MEMBER_DELETE:
      return {
        ...state,
        member: action.payload.member,
      };
    case CLEAN_MEMBER:
      return {
        ...state,
        memberForEdit: [],
      };

    default:
      return state;
  }
};

export default reducer;
