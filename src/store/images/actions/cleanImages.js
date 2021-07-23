import { CLEAN_IMAGES } from "../types";

export const cleanImages = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAN_IMAGES,
    });
  };
};
