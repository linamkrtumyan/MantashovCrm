import { FORM_ON_CHANGE } from "./types";

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FORM_ON_CHANGE:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };

    default:
      return state;
  }
};

export default reducer;
