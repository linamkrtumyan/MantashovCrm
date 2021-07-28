import { CLEAN_FROM } from "../types";

export const cleanForm = () => {
  console.log("ekav clean ani");
  return (dispatch) => {
    dispatch({
      type: CLEAN_FROM,
    });
  };
};
