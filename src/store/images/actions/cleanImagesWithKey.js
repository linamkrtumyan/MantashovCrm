import { CLEAN_IMAGES_WITH_KEY } from "../types";

export const cleanImagesWithKey = (key) => {
  return (dispatch) => {
    dispatch({
      type: CLEAN_IMAGES_WITH_KEY,
      payload: {
        key,
      },
    });
  };
};
