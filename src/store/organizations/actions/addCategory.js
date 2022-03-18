import store from "../..";
import request from "../../request";
import {
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE,
} from "../types";
import { toast } from "react-toastify";

export const addCategory = (category, changePath) => {
  return (dispatch) => {
    dispatch(addCategoryRequest());
    request("/admin/organizations/category", "POST", category)
      .then((data) => {
        if (data.success) {
          dispatch(addCategorySuccess(data));
          toast.dark("Category added");
          changePath();
        }
      })
      .catch((e) => {
        dispatch(addCategoryFailure(e.message));
        toast.error("Something bad happened");
      });
  };
};

const addCategoryRequest = () => {
  return {
    type: ADD_CATEGORY_REQUEST,
  };
};

const addCategorySuccess = (data) => {
  return {
    type: ADD_CATEGORY_SUCCESS,
    payload: {},
  };
};

const addCategoryFailure = (error) => {
  return {
    type: ADD_CATEGORY_FAILURE,
    payload: { error },
  };
};
