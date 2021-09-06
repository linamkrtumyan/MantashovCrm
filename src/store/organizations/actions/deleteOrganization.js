import request from "../../request";
import {
  DELETE_ORGANIZATION_REQUEST,
  DELETE_ORGANIZATION_SUCCESS,
  DELETE_ORGANIZATION_FAILURE,
} from "../types";
import { toast } from "react-toastify";

export const deleteOrganization = (id) => {
  return (dispatch) => {
    dispatch(deleteOrganizationRequest());
    request(`/admin/organizations/organization/${id}`, "DELETE")
      .then((data) => {
        if (data.success) {
          dispatch(deleteOrganizationSuccess(data));
          toast.dark("Organization removed");
        } else {
          toast.error("Something bad happened");
        }
      })
      .catch((e) => {
        dispatch(deleteOrganizationFailure(e.message));
        toast.error("Something bad happened");
      });
  };
};

const deleteOrganizationRequest = () => {
  return {
    type: DELETE_ORGANIZATION_REQUEST,
  };
};

const deleteOrganizationSuccess = (data) => {
  return {
    type: DELETE_ORGANIZATION_SUCCESS,
    payload: {},
  };
};

const deleteOrganizationFailure = (error) => {
  return {
    type: DELETE_ORGANIZATION_FAILURE,
    payload: { error },
  };
};
