import { EDIT_IMAGES } from "../types";

export const editImages = (eventImages) => {
  return {
    type: EDIT_IMAGES,
    payload: {
      eventImages,
    },
  };
};
