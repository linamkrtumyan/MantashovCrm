import React from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { callAction, closeModal } from "../../store";
import Button from "../Forms/Button/Button";

import "./modal.css";

function ModalComponent({
  show,
  closeModal,
  action,
  callAction,
  handleDelete,
  id,
}) {
  const handleClose = () => {
  };
  const logsmth = () => {
  };
  return (
    <div>
      <Modal show={show} onHide={() => closeModal(!show)} animation={true}>
        <div className="modal_container">
          <div className="modal_title">Discard this item?</div>
          <div className="modal_subtitle">It will be gone forever</div>

          <div className="modal_action_container">
            <div
              // style={{ width: "100px" }}
              onClick={() => {
                closeModal(!show);
              }}
            >
              <Button title="No" className="news_btn cancel_btn" />
            </div>
            <div
              // style={{ width: "100px" }}
              onClick={() => {
                logsmth();
                closeModal(!show);
                callAction(!action);
                handleDelete(id);
              }}
            >
              <Button title="Yes" className="news_btn " />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    show: state.modalReducer.show,
    action: state.modalReducer.action,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: (show) => dispatch(closeModal(show)),
    callAction: (action) => dispatch(callAction(action)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
