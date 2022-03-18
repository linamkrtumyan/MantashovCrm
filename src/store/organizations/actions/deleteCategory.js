import request from "../../request";
import {
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
} from "../types";
import { toast } from "react-toastify";

export const deleteCategory = (id) => {
  return (dispatch) => {
    dispatch(deleteCategoryRequest());

    request(`/admin/organizations/category/${id}`, "DELETE")
      .then((data) => {
        if (data.success) {
          dispatch(deleteCategorySuccess(data));
          toast.dark("Category removed");
        } else {
          toast.error("Something bad happened");
        }
      })
      .catch((e) => {
        dispatch(deleteCategoryFailure(e.message));
        toast.error("Something bad happened");
      });
  };
};

const deleteCategoryRequest = () => {
  return {
    type: DELETE_CATEGORY_REQUEST,
  };
};

const deleteCategorySuccess = (data) => {
  sessionStorage.setItem("delete", true);

  //   const newsDetails = data ? data : [];
  return {
    type: DELETE_CATEGORY_SUCCESS,
    payload: {
      //   newsDetails,
    },
  };
};

const deleteCategoryFailure = (error) => {
  return {
    type: DELETE_CATEGORY_FAILURE,
    payload: { error },
  };
};
