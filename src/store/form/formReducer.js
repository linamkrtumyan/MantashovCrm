import {
  FORM_ON_CHANGE,
  INIT_FORM,
  FORM_ON_CHANGE_ARRAY,
  CLEAN_FROM,
} from "./types";

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
    // case FORM_ON_CHANGE_ARRAY:
    //   return {
    //     ...state,
    //     [action.payload.firstKey]: {
    //       ...state[action.payload.firstKey],
    //       [action.payload.secondKey]: action.payload.value,
    //     },
    //   };
    case FORM_ON_CHANGE_ARRAY:
      return {
        ...state,
        [action.payload.firstKey]: {
          ...state[action.payload.firstKey],
          [action.payload.secondKey]: action.payload.value,
        },
      };
    case CLEAN_FROM:
      return {};
    default:
      return state;
  }
};

export default reducer;
