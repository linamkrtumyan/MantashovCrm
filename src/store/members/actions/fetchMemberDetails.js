import { initForm } from "../../form/actions/initForm";
import request from "../../request";
import {
  FETCH_MEMBER_DETAILS_REQUEST,
  FETCH_MEMBER_DETAILS_SUCCESS,
  FETCH_MEMBER_DETAILS_FAILURE,
} from "../types";

export const fetchMemberDetails = (id) => {
  return (dispatch) => {
    dispatch(fetchMemberDetailsRequest());
    request(`/admin/members/member/${id}`)
      .then((data) => {
        dispatch(initForm(data));
        dispatch(fetchMemberDetailsSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchMemberDetailsFailure(e.message));
        // console.log(e);
      });
  };
};

const fetchMemberDetailsRequest = () => {
  return {
    type: FETCH_MEMBER_DETAILS_REQUEST,
  };
};

const fetchMemberDetailsSuccess = (data) => {
  const memberDetails = data ? data : [];
  return {
    type: FETCH_MEMBER_DETAILS_SUCCESS,
    payload: {
      memberDetails,
    },
  };
};

const fetchMemberDetailsFailure = (error) => {
  return {
    type: FETCH_MEMBER_DETAILS_FAILURE,
    payload: { error },
  };
};
