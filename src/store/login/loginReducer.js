import {
  ON_LOGIN_REQUEST,
  ON_LOGIN_SUCCESS,
  ON_LOGIN_FAILURE,
  AUTHORIZE_REQUEST,
  AUTHORIZE_SUCCESS,
  AUTHORIZE_FAILURE,
} from "./types";

const initialState = {
  loading: true,
  login: false,
  error: null,
  token: "",
};

const reducer = (state = initialState, action) => {
  // console.log(action, "Action  ****");
  switch (action.type) {
    case ON_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ON_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.login.token,
        loading: false,
        login: true,
        error: null,
      };
    case ON_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
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
    default:
      return state;
  }
};

export default reducer;
