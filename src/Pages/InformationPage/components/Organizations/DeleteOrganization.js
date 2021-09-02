import React from "react";
import { connect } from "react-redux";
import { deleteOrganization, fetchOrganizationsTable } from "../../../../store";

function DeleteOrganization({
  modalOpen,
  setModalOpen,
  id,
  deleteOrganization,
  fetchOrganizationsTable,
}) {
  console.log(modalOpen, "modalOpen");
  console.log(id, "id");

  const handleDelete = () => {
    if (id) {
      setModalOpen(false);
      deleteOrganization(id);
      fetchOrganizationsTable();
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
          <button className="delete" aria-label="close"></button>
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
  console.log(state, "state");
  return {
    //   spheres: state.organizationsReducer.categoriesAll,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //   cleanForm: () => dispatch(cleanForm()),
    deleteOrganization: (id) => dispatch(deleteOrganization(id)),
    fetchOrganizationsTable: () => dispatch(fetchOrganizationsTable()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DeleteOrganization);
