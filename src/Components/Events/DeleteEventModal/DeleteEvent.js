import React from "react";
import { connect } from "react-redux";
import { deleteEvent } from "../../../store";
import ModalComponent from "../../Modal/Modal";

export const DeleteEvent = ({ action, show, event, deleteEvent }) => {
  return (
    <div>
      <ModalComponent show={show} handleDelete={deleteEvent} id={event} />;
    </div>
  );
};
const mapStateToProps = (state) => {
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
