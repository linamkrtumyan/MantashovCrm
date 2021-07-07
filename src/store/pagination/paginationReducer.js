import { CHANGE_CURRENT_PAGE } from "./types";

const initialState = {
  currentPage: 1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CURRENT_PAGE:
      return {
        ...state,

        currentPage: action.payload.currentPage,
      };

    default:
      return state;
  }
};

export default reducer;
