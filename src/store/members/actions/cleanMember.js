import { CLEAN_MEMBER } from "../types";

export const cleanMember = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAN_MEMBER,
    });
  };
};
