import { FORM_ON_CHANGE, INIT_FORM } from "./types";

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FORM_ON_CHANGE:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };

    case INIT_FORM:
      return {
        ...action.payload.form,
      };

    default:
      return state;
  }
};

export default reducer;
