import request from "../../request";
import store from "../../../store";
import {
  FETCH_ORGANIZATIONS_REQUEST,
  FETCH_ORGANIZATIONS_SUCCESS,
  FETCH_ORGANIZATIONS_FAILURE,
} from "../types";

export const fetchOrganizations = () => {
  return (dispatch) => {
    dispatch(fetchOrganizationsRequest());
    request(`/admin/organizations/forDropdown`)
      // request(`/admin/organizations/?categoryId=${categoryId}`)
      .then((data) => {
        dispatch(fetchOrganizationsSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchOrganizationsFailure(e.message));
      });
  };
};

const fetchOrganizationsRequest = () => {
  return {
    type: FETCH_ORGANIZATIONS_REQUEST,
  };
};

const fetchOrganizationsSuccess = (data) => {
  const organizations = data ? data : [];
  return {
    type: FETCH_ORGANIZATIONS_SUCCESS,
    payload: {
      organizations,
    },
  };
};

const fetchOrganizationsFailure = (error) => {
  return {
    type: FETCH_ORGANIZATIONS_FAILURE,
    payload: { error },
  };
};
