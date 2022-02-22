import { CLEAN_FIXED_IMAGES } from "../types";

export const cleanFixedImages = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAN_FIXED_IMAGES,
    });
  };
};
