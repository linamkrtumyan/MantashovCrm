import request from "../../request";
import store from "../../../store";
import { initForm } from "../../form/actions/initForm";

import {
  FETCH_ORGANIZATION_DETAILS_REQUEST,
  FETCH_ORGANIZATION_DETAILS_SUCCESS,
  FETCH_ORGANIZATION_DETAILS_FAILURE,
} from "../types";

export const fetchOrganizationDetails = (id) => {
  // console.log("mtav feetch");
  // console.log(id, "/////////********");

  return (dispatch) => {
    dispatch(fetchOrganizationDetailsRequest());
    request(`/admin/organizations/organization/${id}`)
      .then((data) => {
        let categoryIds = data.categoryIds;
        data.categoryIdsNames = store
          .getState()
          .organizationsReducer.categories.filter((c) =>
            categoryIds.some((cat) => cat === c.id)
          );
        // console.log("data", data);

        dispatch(initForm(data));

        dispatch(fetchOrganizationDetailsSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchOrganizationDetailsFailure(e.message));
        // console.log(e);
      });
  };
};

const fetchOrganizationDetailsRequest = () => {
  return {
    type: FETCH_ORGANIZATION_DETAILS_REQUEST,
  };
};

const fetchOrganizationDetailsSuccess = (data) => {
  // console.log(data, "?????????????????????????????????");
  const organizationDetails = data ? data : [];
  return {
    type: FETCH_ORGANIZATION_DETAILS_SUCCESS,
    payload: {
      organizationDetails,
    },
  };
};

const fetchOrganizationDetailsFailure = (error) => {
  return {
    type: FETCH_ORGANIZATION_DETAILS_FAILURE,
    payload: { error },
  };
};
