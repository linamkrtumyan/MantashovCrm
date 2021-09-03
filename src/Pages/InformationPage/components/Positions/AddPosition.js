import React from "react";
import Input from "../../../../Components/Forms/Input/Input";
import { connect } from "react-redux";
import store, {
  addPosition,
  cleanForm,
  fetchPositionsAll,
} from "../../../../store";

function AddPosition({
  added,
  setAdded,
  setAdd,
  addPosition,
  cleanForm,
  fetchPositionsAll,
}) {
  const handleCreate = () => {
    // fetchPositionsAll();

    let { nameArm, nameEng, nameRu } = store.getState().formReducer;

    let position = {
      nameArm,
      nameEng,
      nameRu,
    };

    const changePath = () => {
      //   history.push("/information");
    };
    console.log(position, "uxarkvox position");
    addPosition(position, changePath);
    setAdded(added + 1);
    setAdd(false);
    cleanForm();

    // fetchPositionsAll();
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPosition: (category, changePath) =>
      dispatch(addPosition(category, changePath)),
    cleanForm: () => dispatch(cleanForm()),
    fetchPositionsAll: () => dispatch(fetchPositionsAll()),

    // fetchCategoriesAll: () => dispatch(fetchCategoriesAll()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddPosition);
