import { DELETE_IMAGE_FROM_STORE } from "../types";

export const deleteImageFromStore = (id, key) => {
  // console.log("mtav");
  const deleteId = id;
  return {
    type: DELETE_IMAGE_FROM_STORE,
    payload: {
      deleteId,
      key,
    },
  };
};
