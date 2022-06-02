import { CLEAN_LOCATION } from "../types";

export const cleanLocation = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAN_LOCATION,
    });
  };
};
