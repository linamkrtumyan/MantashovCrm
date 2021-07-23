import { OPEN_MODAL, CLOSE_MODAL, CALL_ACTION } from "./types";

const initialState = {
  show: false,
  action: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,

        show: action.payload.show,
      };
    case CLOSE_MODAL:
      return {
        ...state,

        show: action.payload.show,
        // action: false,
      };

    case CALL_ACTION:
      return {
        ...state,
        action: action.payload.action,
      };

    default:
      return state;
  }
};

export default reducer;
