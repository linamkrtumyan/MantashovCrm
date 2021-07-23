import { DELETE_NEWS_IMAGE_FROM_STORE } from "../types";

export const deleteNewsImageFromStore = (id) => {
  // console.log("mtav");
  // console.log(id, "id delete image redux");
  const deleteId = id;
  return {
    type: DELETE_NEWS_IMAGE_FROM_STORE,
    payload: {
      deleteId,
    },
  };
};
