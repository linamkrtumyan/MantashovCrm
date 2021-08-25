import { CLEAN_LOCATION } from "../types";

export const cleanLocation = () => {
  console.log("ekav clean ani");
  return (dispatch) => {
    dispatch({
      type: CLEAN_LOCATION,
    });
  };
};
