import { CLEAN_EVENT } from "../types";

export const cleanEvent = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAN_EVENT,
    });
  };
};
