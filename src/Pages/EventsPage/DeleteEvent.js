import React from "react";
import { connect } from "react-redux";
import { deleteEvent, cleanEvent } from "../../store";
import { useHistory } from "react-router-dom";

function DeleteEvent({ modalOpen, setModalOpen, id, deleteEvent, cleanEvent }) {
  // console.log(modalOpen, "modalOpen");
  console.log(id, "id");

  const history = useHistory();

  const handleDelete = () => {
    console.log({ id });
    if (id) {
    setModalOpen(false);
    const changePath = () => {
      history.push("/events");
    };
    deleteEvent(id, changePath);
    cleanEvent();
    }
  };
  return (
    <div className={"modal " + (modalOpen ? "is-active" : "")}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title has-text-centered">
            Discard this item?
          </p>
          <button
            onClick={() => setModalOpen(false)}
            className="delete"
            aria-label="close"
          ></button>
        </header>
        <section className="modal-card-body has-text-centered">
          It will be gone forever
        </section>
        <footer className="modal-card-foot is-flex is-justify-content-flex-end">
          <button onClick={() => setModalOpen(false)} className="button">
            No
          </button>
          <button onClick={handleDelete} className="button is-primary">
            Yes
          </button>
        </footer>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  //   console.log(state, "state");
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteEvent: (id, changePath) => dispatch(deleteEvent(id, changePath)),
    cleanEvent: () => dispatch(deleteEvent()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DeleteEvent);
