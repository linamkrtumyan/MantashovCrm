import request from "../../request";
import {
  ORGANIZATION_EDIT_REQUEST,
  ORGANIZATION_EDIT_SUCCESS_FAILURE,
} from "../types";
import { toast } from "react-toastify";

export const editOrganization = (organization) => {
  // console.log(news, "edit news send");
  return (dispatch) => {
    dispatch({
      type: ORGANIZATION_EDIT_REQUEST,
    });
    request("/admin/organizations/organization", "PUT", organization)
      .then((data) => {
        // console.log(data, "res edit");
        if (data.success) {
          dispatch({
            type: ORGANIZATION_EDIT_SUCCESS_FAILURE,
          });
          // console.log("change path");
          //   changePath();
          // console.log("toast");
          toast.dark("Organization edited");
        } else {
          dispatch({
            type: ORGANIZATION_EDIT_SUCCESS_FAILURE,
          });
          toast.error("Something bad happened");
        }
      })
      .catch((e) => {
        dispatch({
          type: ORGANIZATION_EDIT_SUCCESS_FAILURE,
        });
        toast.error("Something bad happened");
      });
  };
};
