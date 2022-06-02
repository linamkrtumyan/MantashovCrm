import { CLEAN_ORGANIZATION } from "../types";

export const cleanOrganization = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAN_ORGANIZATION,
    });
  };
};
