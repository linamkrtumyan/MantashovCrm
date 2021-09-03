import React from "react";
import { connect } from "react-redux";
import { deleteCategory, fetchCategoriesAll } from "../../../../store";

function DeleteSphere({
  added,
  setAdded,
  modalOpen,
  setModalOpen,
  id,
  deleteCategory,
  fetchCategoriesAll,
}) {
  console.log(modalOpen, "modalOpen");
  console.log(id, "id");

  const handleDelete = () => {
    if (id) {
      setModalOpen(false);
      deleteCategory(id);
      // fetchCategoriesAll();
      setAdded(added + 1);
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
  console.log(state, "state");
  return {
    //   spheres: state.organizationsReducer.categoriesAll,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //   cleanForm: () => dispatch(cleanForm()),
    deleteCategory: (id) => dispatch(deleteCategory(id)),
    fetchCategoriesAll: () => dispatch(fetchCategoriesAll()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DeleteSphere);
