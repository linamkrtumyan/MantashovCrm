import { CLEAN_FORM } from "../types";

export const cleanForm = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAN_FORM,
    });
  };
};
