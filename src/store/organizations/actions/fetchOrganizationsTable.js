import request from "../../request";
import store from "../../../store";
import {
  FETCH_ORGANIZATIONS_TABLE_REQUEST,
  FETCH_ORGANIZATIONS_TABLE_SUCCESS,
  FETCH_ORGANIZATIONS_TABLE_FAILURE,
} from "../types";

export const fetchOrganizationsTable = () => {
  // console.log(categoryId, "categoryId");

  return (dispatch) => {
    dispatch(fetchOrganizationsTableRequest());
    request(`/admin/organizations/forTable`)
      .then((data) => {
        // console.log(data, "data");
        dispatch(fetchOrganizationsTableSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchOrganizationsTableFailure(e.message));
        // console.log(e);
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
