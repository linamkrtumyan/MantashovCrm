import React from "react";
import Input from "../../../../Components/Forms/Input/Input";
import { connect } from "react-redux";
import store, {
  addCategory,
  cleanForm,
  fetchCategoriesAll,
} from "../../../../store";

function AddSphere({
  added,
  setAdded,
  setAdd,
  addCategory,

  cleanForm,
  fetchCategoriesAll,
}) {
  //   if (added) {
  //     setAdd(false);
  //   }
  const handleCreate = () => {
    let { nameArm, nameEng, nameRu } = store.getState().formReducer;

    let category = {
      nameArm,
      nameEng,
      nameRu,
    };

    const changePath = () => {
      //   history.push("/information");
    };
    console.log(category, "uxarkvox category");
    addCategory(category, changePath);
    setAdd(false);
    cleanForm();
    setAdded(added + 1);

    // fetchCategoriesAll();
  };

  return (
    <>
      <td>
        <Input id="nameEng" type="text" />
      </td>
      <td>
        <Input id="nameArm" type="text" />
      </td>
      <td>
        <Input id="nameRu" type="text" />
      </td>
      <td>
        <div style={{ cursor: "pointer" }} onClick={handleCreate}>
          <i className="fas fa-plus is-large"></i>
        </div>
      </td>
      <td>
        <div style={{ cursor: "pointer" }} onClick={() => setAdd(false)}>
          <i className="fas fa-times is-large"></i>
        </div>
      </td>
    </>
  );
}

const mapStateToProps = (state) => {
  console.log(state, "state");
  return {
    // spheres: state.organizationsReducer.categoriesAll,
    // added: state.organizationsReducer.added,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCategory: (category, changePath) =>
      dispatch(addCategory(category, changePath)),
    cleanForm: () => dispatch(cleanForm()),
    fetchCategoriesAll: () => dispatch(fetchCategoriesAll()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddSphere);
