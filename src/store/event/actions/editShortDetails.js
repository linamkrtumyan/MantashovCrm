import request from "../../request";
import {
  EVENT_SHORT_DETAILS_REQUEST,
  EVENT_SHORT_DETAILS_SUCCESS,
  EVENT_SHORT_DETAILS_FAILURE,
} from "../types";
import { toast } from "react-toastify";

export const editShortDetails = (details) => {
  return (dispatch) => {
    dispatch(editShortDetailsRequest());
    request("/admin/events/eventShortDetails", "PUT", details)
      .then((data) => {
        if (data.success) {
          dispatch(editShortDetailsSuccess(data));
          toast.dark("Edited");
        //   changePath();
        }
      })
      .catch((e) => {
        dispatch(editShortDetailsFailure(e.message));
        toast.error("Something bad happened");
      });
  };
};

const editShortDetailsRequest = () => {
  return {
    type: EVENT_SHORT_DETAILS_REQUEST,
  };
};

const editShortDetailsSuccess = (data) => {
  return {
    type: EVENT_SHORT_DETAILS_SUCCESS,
    payload: {},
  };
};

const editShortDetailsFailure = (error) => {
  return {
    type: EVENT_SHORT_DETAILS_FAILURE,
    payload: { error },
  };
};
