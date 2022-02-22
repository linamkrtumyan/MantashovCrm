import React from "react";
import { connect } from "react-redux";
import { deletePosition } from "../../../../store";

function DeleteSphere({ modalOpen, setModalOpen, id, deletePosition }) {
 

  const handleDelete = () => {
    if (id) {
      setModalOpen(false);
      deletePosition(id);
    }
  };
  const handleClose = (e) => {
    if (e.target.id === "modal") {
      setModalOpen(false);
    }
  };
  return (
    <div
      onClick={handleClose}
      className={"modal " + (modalOpen ? "is-active" : "")}
    >
      <div id="modal" className="modal-background"></div>
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletePosition: (id) => dispatch(deletePosition(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DeleteSphere);
