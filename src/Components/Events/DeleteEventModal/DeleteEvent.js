import React, { useEffect } from "react";
import { connect } from "react-redux";
import { deleteEvent } from "../../../store";
import ModalComponent from "../../Modal/Modal";

export const DeleteEvent = ({ action, show, event, deleteEvent }) => {
  // console.log("ekav");
  // console.log(show, "show");
  //   console.log(news, "news id");
  //   if (action) {
  //     console.log("mtav deletei if");
  //     deleteNews(news);
  //   }
  //   useEffect(() => {
  //     transferNewsDelete(news);
  //   }, []);

  return (
    <div>
      <ModalComponent show={show} handleDelete={deleteEvent} id={event} />;
    </div>
  );
};
const mapStateToProps = (state) => {
  // console.log(state, "news delete state");
  return {
    action: state.modalReducer.action,
    event: state.eventReducer.event,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteEvent: (event) => dispatch(deleteEvent(event)),
    // transferNewsDelete: (news) => dispatch(transferNewsDelete(news)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteEvent);
