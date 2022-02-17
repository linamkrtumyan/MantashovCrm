import { DELETE_HEADER } from "../types";

export const deleteHeader = (id) => {
  const deletedHeaderId = id;
  return {
    type: DELETE_HEADER,
    payload: {
      deletedHeaderId,
    },
  };
};
