import { CLEAN_ORGANIZATION } from "../types";

export const cleanOrganization = () => {
  // console.log("ekav orgy clean ani");
  return (dispatch) => {
    dispatch({
      type: CLEAN_ORGANIZATION,
    });
  };
};
