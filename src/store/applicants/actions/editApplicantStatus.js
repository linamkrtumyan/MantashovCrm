import request from "../../request";
import {
  APPLICANT_EDIT_REQUEST,
  APPLICANT_EDIT_SUCCESS,
  APPLICANT_EDIT_FAILURE,
} from "../types";
// import { toast } from "react-toastify";

export const editApplicantStatus = (id, statusId) => {
  return (dispatch) => {
    dispatch({
      type: APPLICANT_EDIT_REQUEST,
    });
    request("/admin/applicants/applicant-status", "PUT", { id, statusId })
      .then((data) => {
        if (data.success) {
          dispatch(editApplicantStatusSuccess());
        } else {
          dispatch(editApplicantStatusFailure(data.errorMessage));
        }
      })
      .catch((e) => {
        dispatch(editApplicantStatusFailure(e));
      });
  };
};

const editApplicantStatusSuccess = () => {
  return {
    type: APPLICANT_EDIT_SUCCESS,
  };
};

const editApplicantStatusFailure = (error) => {
  return {
    type: APPLICANT_EDIT_FAILURE,
    payload: { error },
  };
};
