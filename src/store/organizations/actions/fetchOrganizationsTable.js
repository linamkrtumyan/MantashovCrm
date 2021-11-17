import request from "../../request";
import store from "../../../store";
import {
  FETCH_ORGANIZATIONS_TABLE_REQUEST,
  FETCH_ORGANIZATIONS_TABLE_SUCCESS,
  FETCH_ORGANIZATIONS_TABLE_FAILURE,
} from "../types";

export const fetchOrganizationsTable = () => {
  return (dispatch) => {
    dispatch(fetchOrganizationsTableRequest());
    request(`/admin/organizations/forTable`)
      .then((data) => {
        dispatch(fetchOrganizationsTableSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchOrganizationsTableFailure(e.message));
      });
  };
};

const fetchOrganizationsTableRequest = () => {
  return {
    type: FETCH_ORGANIZATIONS_TABLE_REQUEST,
  };
};

const fetchOrganizationsTableSuccess = (data) => {
  const organizationsTable = data ? data : [];
  return {
    type: FETCH_ORGANIZATIONS_TABLE_SUCCESS,
    payload: {
      organizationsTable,
    },
  };
};

const fetchOrganizationsTableFailure = (error) => {
  return {
    type: FETCH_ORGANIZATIONS_TABLE_FAILURE,
    payload: { error },
  };
};
