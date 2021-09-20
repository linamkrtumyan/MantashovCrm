import request from "../../request";
import { EVENT_EDIT_REQUEST, EVENT_EDIT_SUCCESS_FAILURE } from "../types";
import { toast } from "react-toastify";

export const editEvent = (event, changePath) => {
  console.log(event.event, "event for edit ........");

  return (dispatch) => {
    dispatch({
      type: EVENT_EDIT_REQUEST,
    });
    request("/admin/events/event", "PUT", event)
      .then((data) => {
        if (data.success) {
          dispatch({
            type: EVENT_EDIT_SUCCESS_FAILURE,
          });

          toast.dark("Event edited");
          changePath();
        } else {
          dispatch({
            type: EVENT_EDIT_SUCCESS_FAILURE,
          });
          toast.error("Something bad happened");
        }
      })
      .catch((e) => {
        dispatch({
          type: EVENT_EDIT_SUCCESS_FAILURE,
        });
        toast.error("Something bad happened");
      });
  };
};
