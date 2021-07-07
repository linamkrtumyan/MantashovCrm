import { CHANGE_CURRENT_PAGE } from "../types";

export const changeCurrentPage = (currentPage) => {
  return {
    type: CHANGE_CURRENT_PAGE,
    payload: {
      currentPage,
    },
  };
};
