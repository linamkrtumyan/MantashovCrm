import { CLEAN_EVENT } from "../types";

export const cleanEvent = () => {
  console.log("ekav orgy clean ani eventy");
  return (dispatch) => {
    dispatch({
      type: CLEAN_EVENT,
    });
  };
};
