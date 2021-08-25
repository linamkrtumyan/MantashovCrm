import { CLEAN_MEMBER } from "../types";

export const cleanMember = () => {
  console.log("ekav clean ani");
  return (dispatch) => {
    dispatch({
      type: CLEAN_MEMBER,
    });
  };
};
