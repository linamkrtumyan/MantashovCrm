import React, { useEffect } from "react";
import { connect } from "react-redux";
import { resetPassword } from "../../../store";

function ResetPassword({ modalOpen, setModalOpen, id, resetPassword }) {

  const handleDelete = () => {
    let member = {
      id: id,
    };

    function closeModal() {
      setModalOpen(false);
    }
    resetPassword(member, closeModal);
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
          <p className="modal-card-title has-text-centered">Reset Password</p>

          <button
            onClick={() => {
              setModalOpen(false);
            }}
            className="delete"
            aria-label="close"
          ></button>
        </header>
        <section className="modal-card-body has-text-centered">
          Click on the button below to reset password
        </section>
        <footer className="modal-card-foot is-flex is-justify-content-flex-end">
          <button
            onClick={() => {
              setModalOpen(false);
            }}
            className="button"
          >
            Cancel
          </button>
          <button onClick={handleDelete} className="button is-primary">
            Reset
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
    resetPassword: (id, closeModal) => dispatch(resetPassword(id, closeModal)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
