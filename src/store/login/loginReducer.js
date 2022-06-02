import {
  ON_LOGIN_REQUEST,
  ON_LOGIN_SUCCESS,
  ON_LOGIN_FAILURE,
  AUTHORIZE_REQUEST,
  AUTHORIZE_SUCCESS,
  AUTHORIZE_FAILURE,
  ON_LOGOUT_REQUEST,
  ON_LOGOUT_SUCCESS,
  ON_LOGOUT_FAILURE,
} from "./types";

const initialState = {
  userName: null,

  loading: true,
  login: false,
  error: null,
  authenticating: false,
  token: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_LOGIN_REQUEST:
      return {
        ...state,
        authenticating: true,
      };
    case ON_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.login.token,
        userName:
          action.payload.login.firstNameArm +
          " " +
          action.payload.login.lastNameArm,
        authenticating: false,
        login: true,
        error: null,
      };
    case ON_LOGIN_FAILURE:
      return {
        ...state,
        authenticating: false,
        login: false,
        error: action.payload.error,
      };

    case AUTHORIZE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AUTHORIZE_SUCCESS:
      return {
        ...state,
        userName:
          action.payload.auth.firstNameArm +
          " " +
          action.payload.auth.lastNameArm,
        loading: false,
        login: true,
        error: null,
      };
    case AUTHORIZE_FAILURE:
      return {
        ...state,
        loading: false,
        login: false,
      };

    case ON_LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ON_LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        login: false,
        error: null,
        token: null,
      };
    case ON_LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        login: true,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
