import request from "../../request";
import {
  DELETE_POSITION_REQUEST,
  DELETE_POSITION_SUCCESS,
  DELETE_POSITION_FAILURE,
} from "../types";
import { toast } from "react-toastify";

export const deletePosition = (id) => {
  // console.log(id, "uxarkvoxy");
  return (dispatch) => {
    dispatch(deletePositionRequest());
    request(`/admin/organizations/position/${id}`, "DELETE")
      .then((data) => {
        // console.log(data, "data");
        if (data.success) {
          dispatch(deletePositionSuccess(data));
          toast.dark("Position removed");
        } else {
          toast.error("Something bad happened");
        }
      })
      .catch((e) => {
        dispatch(deletePositionFailure(e.message));
        toast.error("Something bad happened");
        // console.log(e);
      });
  };
};

const deletePositionRequest = () => {
  return {
    type: DELETE_POSITION_REQUEST,
  };
};

const deletePositionSuccess = (data) => {
  //   const newsDetails = data ? data : [];
  return {
    type: DELETE_POSITION_SUCCESS,
    payload: {
      //   newsDetails,
    },
  };
};

const deletePositionFailure = (error) => {
  return {
    type: DELETE_POSITION_FAILURE,
    payload: { error },
  };
};
