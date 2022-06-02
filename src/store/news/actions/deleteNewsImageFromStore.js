import { DELETE_NEWS_IMAGE_FROM_STORE } from "../types";

export const deleteNewsImageFromStore = (id) => {
  const deleteId = id;
  return {
    type: DELETE_NEWS_IMAGE_FROM_STORE,
    payload: {
      deleteId,
    },
  };
};
