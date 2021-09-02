import request from "../../request";
import {
  DELETE_ORGANIZATION_REQUEST,
  DELETE_ORGANIZATION_SUCCESS,
  DELETE_ORGANIZATION_FAILURE,
} from "../types";
import { toast } from "react-toastify";

export const deleteOrganization = (id) => {
  // console.log(id, "uxarkvoxy");
  return (dispatch) => {
    dispatch(deleteOrganizationRequest());
    request(`/admin/organizations/organization/${id}`, "DELETE")
      .then((data) => {
        // console.log(data, "data");
        dispatch(deleteOrganizationSuccess(data));
        toast.dark("Organization removed");
      })
      .catch((e) => {
        dispatch(deleteOrganizationFailure(e.message));
        toast.error("Something bad happened");
        // console.log(e);
      });
  };
};

const deleteOrganizationRequest = () => {
  return {
    type: DELETE_ORGANIZATION_REQUEST,
  };
};

const deleteOrganizationSuccess = (data) => {
  //   const newsDetails = data ? data : [];
  return {
    type: DELETE_ORGANIZATION_SUCCESS,
    payload: {
      //   newsDetails,
    },
  };
};

const deleteOrganizationFailure = (error) => {
  return {
    type: DELETE_ORGANIZATION_FAILURE,
    payload: { error },
  };
};
