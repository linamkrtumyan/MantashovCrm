import store from "../..";
import request from "../../request";
import {
  ADD_ORGANIZATION_REQUEST,
  ADD_ORGANIZATION_SUCCESS,
  ADD_ORGANIZATION_FAILURE,
} from "../types";
import { toast } from "react-toastify";

export const addOrganization = (organization) => {
  // console.log(member, "stacav");
  return (dispatch) => {
    dispatch(addOrganizationRequest());
    request("/admin/organizations/organization", "POST", organization)
      .then((data) => {
        // console.log(data, "data");
        if (data.success) {
          // console.log(data, "news data");
          dispatch(addOrganizationSuccess(data));
          toast.dark("Organization added");
          //   changePath();
        }
      })
      .catch((e) => {
        dispatch(addOrganizationFailure(e.message));
        toast.error("Something bad happened");
        // console.log(e);
      });
  };
};

const addOrganizationRequest = () => {
  return {
    type: ADD_ORGANIZATION_REQUEST,
  };
};

const addOrganizationSuccess = (data) => {
  return {
    type: ADD_ORGANIZATION_SUCCESS,
    payload: {},
  };
};

const addOrganizationFailure = (error) => {
  return {
    type: ADD_ORGANIZATION_FAILURE,
    payload: { error },
  };
};
