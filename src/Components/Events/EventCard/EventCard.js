import React, { useState, useEffect } from "react";
import "./eventCard.css";
import { useHistory } from "react-router-dom";
import ModalComponent from "../../Modal/Modal";
import { connect } from "react-redux";
import { openModal, deleteEvent, transferEventDelete } from "../../../store";
import DeleteEvent from "../DeleteEventModal/DeleteEvent";

function EventCard({
  show,
  action,
  event,
  openModal,
  deleteEvent,
  transferEventDelete,
}) {
  let history = useHistory();

  function handleClick() {
    history.push(`/event-details/${event.id}`);
  }

  if (show) {
    return <DeleteEvent show={show} />;
  }
  return (
    <div className="eventcard_container">
      <div className="evantcard_img_container">
        <img
          alt=""
          className="evantcard_img"
          onError={(e) => {
            e.preventDefault();
            e.target.onerror = null;
            e.target.src = require("../../../img/unnamed.png").default;
          }}
          src={`/images/eventsHeader/${event.id}/header.png`}
        />
        {/* <img
          alt=""
          className="evantcard_img"
          src={require("../../../img/artashes.jpg").default}
        /> */}
      </div>
      <div className="eventcard_text_container">
        <div onClick={handleClick} className="eventcard_title">
          <p>{event.eventName}</p>
        </div>
        <div className="eventcard_text">{event.location}</div>
      </div>
      <div className="eventcard_action_container">
        <div>
          <img
            alt=""
            className="newscard_icon"
            src={require("../../../img/white_edit.svg").default}
          />
        </div>
        <div>
          <img
            alt=""
            className="newscard_icon"
            src={require("../../../img/white_trash.svg").default}
            onClick={() => {
              openModal(!show);
              transferEventDelete(event.id);
              // pushId();
            }}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    // currentPage: state.paginationReducer.currentPage,
    show: state.modalReducer.show,
    action: state.modalReducer.action,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // changeCurrentPage: (currentPage) =>
    //   dispatch(changeCurrentPage(currentPage)),
    openModal: (show) => dispatch(openModal(show)),
    deleteEvent: (id) => dispatch(deleteEvent(id)),
    transferEventDelete: (id) => dispatch(transferEventDelete(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EventCard);
