import { DELETE_FIXED_IMAGES_FROM_STORE } from "../types";

export const deleteFixedImageFromStore = (id) => {
  const deleteId = id;
  return {
    type: DELETE_FIXED_IMAGES_FROM_STORE,
    payload: {
      deleteId,
    },
  };
};

